import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export const useImagePicker = (initialImages: string[] = [], maxImages = 5) => {
  const [images, setImages] = useState<string[]>(initialImages.slice(0, maxImages));
  const [loading, setLoading] = useState(false);

  const pickImages = async () => {
    try {
      setLoading(true);

      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Can cap quyen", "Ung dung can quyen truy cap thu vien anh cua ban.");
        return;
      }

      const remainingSlots = maxImages - images.length;
      if (remainingSlots <= 0) {
        Alert.alert("Gioi han anh", `Ban chi duoc gui toi da ${maxImages} anh.`);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: remainingSlots,
        quality: 0.8,
      });

      if (!result.canceled) {
        const nextUris = result.assets.map((asset) => asset.uri);
        setImages((prev) => {
          const merged = [...prev, ...nextUris.filter((uri) => !prev.includes(uri))].slice(0, maxImages);
          if (merged.length >= maxImages) {
            Alert.alert("Gioi han anh", `Ban chi duoc gui toi da ${maxImages} anh.`);
          }

          return merged;
        });
      }
    } catch {
      Alert.alert("Loi", "Khong the chon anh.");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (uri: string) => {
    setImages((prev) => prev.filter((item) => item !== uri));
  };

  const resetImages = () => setImages([]);

  return { images, pickImages, removeImage, resetImages, loading };
};
