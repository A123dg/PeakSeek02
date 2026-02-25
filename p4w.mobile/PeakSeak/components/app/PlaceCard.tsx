import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Palette } from '@/components/app/palette';
import { TagPill } from '@/components/app/TagPill';

type PlaceCardProps = {
  title: string;
  area: string;
  price: string;
  rating: number;
  imageUrl: string;
  tags: string[];
  layout?: 'vertical' | 'horizontal';
  onPressCard?: () => void;
};

export function PlaceCard({
  title,
  area,
  price,
  rating,
  imageUrl,
  tags,
  layout = 'vertical',
  onPressCard,
}: PlaceCardProps) {
  const isHorizontal = layout === 'horizontal';

  return (
    <Pressable style={[styles.card, isHorizontal && styles.horizontalCard]} onPress={onPressCard}>
      <Image source={{ uri: imageUrl }} style={[styles.image, isHorizontal && styles.imageSmall]} />
      <View style={styles.content}>
        <View style={styles.rowBetween}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>{area}</Text>
        <Text style={styles.price}>{price}</Text>
        <View style={styles.tagRow}>
          {tags.map((tag) => (
            <TagPill key={tag} label={tag} />
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 18,
    backgroundColor: Palette.card,
    borderWidth: 1,
    borderColor: Palette.border,
    overflow: 'hidden',
  },
  horizontalCard: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  image: {
    width: '100%',
    height: 140,
  },
  imageSmall: {
    width: 110,
    height: '100%',
  },
  content: {
    padding: 14,
    flex: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Palette.text,
    flex: 1,
    marginRight: 8,
  },
  ratingBadge: {
    backgroundColor: Palette.chip,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  ratingText: {
    color: Palette.chipText,
    fontWeight: '700',
    fontSize: 12,
  },
  subtitle: {
    fontSize: 12,
    color: Palette.subtext,
    marginTop: 4,
  },
  price: {
    fontSize: 13,
    color: Palette.primaryDark,
    fontWeight: '600',
    marginTop: 6,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
    flexWrap: 'wrap',
  },
});
