import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createStyles } from './styles';
import { useTheme } from '../../global/themes';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import PokemonDetailScreen from '../PokemonDetail';
import { fetchPokemonListPage, type PokemonListItemUI } from '../../services/pokeapi';
import { fetchPokemonList, type PokemonListResponse } from '../../services/pokeapi';
import { colorTags, typeIcons } from '../../global/themes';

const PAGE_SIZE = 10;

export default function PokemonListScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'PokemonList'>>();

  const [items, setItems] = useState<PokemonListItemUI[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [error, setError] = useState<string | null>(null);

 async function loadInitial() {
    try {
      setError(null);
      setIsInitialLoading(true);
      const page = await fetchPokemonListPage(PAGE_SIZE, 0);
      setItems(page.items);
      setOffset(PAGE_SIZE);
      setHasNextPage(Boolean(page.next));
    } catch {
      setError('Falha ao carregar a lista de Pokémon.');
    } finally {
      setIsInitialLoading(false);
    }
  }

async function loadMore() {
    if (isLoadingMore || isInitialLoading || isRefreshing || !hasNextPage) return;
    try {
      setIsLoadingMore(true);
      const page = await fetchPokemonListPage(PAGE_SIZE, offset);
      setItems((prev) => [...prev, ...page.items]);
      setOffset((prev) => prev + PAGE_SIZE);
      setHasNextPage(Boolean(page.next));
    } catch {
      setError('Falha ao carregar mais Pokémon.');
    } finally {
      setIsLoadingMore(false);
    }
  }


  async function refreshList() {
    try {
      setError(null);
      setIsRefreshing(true);
      const page = await fetchPokemonListPage(PAGE_SIZE, 0);
      setItems(page.items);
      setOffset(PAGE_SIZE);
      setHasNextPage(Boolean(page.next));
    } catch {
      setError('Falha ao atualizar a lista.');
    } finally {
      setIsRefreshing(false);
    }
  }


const handleLogout = () => {
    // Navegar de volta para a tela de login
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  useLayoutEffect(() => {
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity style={ styles.logoutButton } onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    ),
  });
}, [navigation]);

  useEffect(() => {
    loadInitial();
  }, []);


  
  return (
    <View style={styles.container}>
      {/* <View style={styles.logoutButtonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View> */}
      <Text style={styles.headerTitle}>Pokédex</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }: { item: PokemonListItemUI; }) => (
          <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate('PokemonDetail', { id: item.id })}>
            <View style={styles.cardLeft}>
              <Text style={styles.cardName}>{item.name}</Text>
<View style={styles.typeContainer}>
  {item.types?.map((type) => {
    const color = colorTags[type as keyof typeof colorTags] || '#777';
    return (
      <View
        key={type}
        style={[
          styles.typeBadge,
          { backgroundColor: color }
        ]}
      >
        <Text style={styles.typeText}>
                {typeIcons[type] ? typeIcons[type] + ' ' : ''}{type.toUpperCase()}
              </Text>
            </View>
    );
  })}
</View>
            </View>

            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        onRefresh={refreshList}
        refreshing={isRefreshing}
        ListFooterComponent={
          isLoadingMore ? (
            <View style={{paddingVertical: 16}}>
              <ActivityIndicator color={theme.colors.primary} />
            </View>
          ) : null
        }
      />
    </View>
  );
};

