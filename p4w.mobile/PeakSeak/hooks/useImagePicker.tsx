import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export const useImagePicker = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pickImages = async () => {
    try {
      setLoading(true);

      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Ứng dụng cần quyền truy cập ảnh của bạn');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true, 
        quality: 0.8,
      });

      if (!result.canceled) {
        const uris = result.assets.map(a => a.uri);
        setImages(prev => [...prev, ...uris]);
      }
    } catch  {
      Alert.alert('Lỗi', 'Không thể chọn ảnh.');
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (uri: string) => {
    setImages(prev => prev.filter(i => i !== uri));
  };

  const resetImages = () => setImages([]);

  return { images, pickImages, removeImage, resetImages, loading };
};