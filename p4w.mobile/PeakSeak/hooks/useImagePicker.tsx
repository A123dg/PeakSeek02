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
        Alert.alert("Cần cấp quyền", "Ứng dụng cần quyền truy cập thư viện ảnh của bạn.");
        return;
      }

      const remainingSlots = maxImages - images.length;
      if (remainingSlots <= 0) {
        Alert.alert("Giới hạn ảnh", `Bạn chỉ được gửi tối đa ${maxImages} ảnh.`);
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
            Alert.alert("Giới hạn ảnh", `Bạn chỉ được gửi tối đa ${maxImages} ảnh.`);
          }

          return merged;
        });
      }
    } catch {
      Alert.alert("Lỗi", "Không thể chọn ảnh.");
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

