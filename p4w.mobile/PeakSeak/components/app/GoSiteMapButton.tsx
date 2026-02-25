import { Pressable, Text } from 'react-native';
import { useRouter } from 'expo-router';

export const GoSitemapButton = () => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push('/_sitemap')}>
      <Text>Open Sitemap</Text>
    </Pressable>
  );
};