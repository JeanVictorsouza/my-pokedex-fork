import { useColorScheme } from 'react-native';

const colorTags = { 
normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
}

export const typeIcons: Record<string, string> = {
  normal: '⚪',
  fire: '🔥',
  water: '💧',
  electric: '⚡',
  grass: ' 🍃 ',
  ice: '❄️',
  fighting: '🥊',
  poison: '☠️',
  ground: '🌍',
  flying: '🕊️',
  psychic: '🔮',
  bug: '🐛',
  rock: '🪨',
  ghost: '👻',
  dragon: '🐉',
  dark: '🌑',
  steel: '⚙️',
  fairy: '🦋',
};

const lightTheme = {
  colors: {
    // Paleta inspirada na Pokédex
    primary: '#E3350D', // vermelho Pokédex
    primaryDark: '#B8200A',
    accent: '#FFCB05', // amarelo Pokédex
    accentDark: '#D4A108',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    surfaceAlt: '#F3F4F6',
    text: '#111827',
    textSecondary: '#4B5563',
    muted: '#9CA3AF',
    border: '#E5E7EB',
    inputBackground: '#E5E7EB',
    shadow: '#00000040',
  },
};

const darkTheme = {
  colors: {
    primary: '#FF5540',
    primaryDark: '#E3350D',
    accent: '#FFCB05',
    accentDark: '#D4A108',
    background: '#020617',
    surface: '#0F172A',
    surfaceAlt: '#020617',
    text: '#F9FAFB',
    textSecondary: '#CBD5F5',
    muted: '#6B7280',
    border: '#1F2937',
    inputBackground: '#111827',
    shadow: '#00000080',
  },
};

export { colorTags };

export type Theme = typeof lightTheme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export function useTheme(): Theme {
  const scheme = useColorScheme();
  return scheme === 'dark' ? themes.dark : themes.light;
}
