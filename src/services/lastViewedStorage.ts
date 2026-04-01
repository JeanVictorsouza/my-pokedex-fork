import AsyncStorage from '@react-native-async-storage/async-storage';

const LAST_VIEWED_KEY = '@pokedex:lastViewed';

export async function setLastViewedId(id: number): Promise<void> {
  try {
    await AsyncStorage.setItem(LAST_VIEWED_KEY, String(id));
  } catch {
  }
}

export async function getLastViewedId(): Promise<number | null> {
  try {
    const v = await AsyncStorage.getItem(LAST_VIEWED_KEY);
    return v ? Number(v) : null;
  } catch {
    return null;
  }
}