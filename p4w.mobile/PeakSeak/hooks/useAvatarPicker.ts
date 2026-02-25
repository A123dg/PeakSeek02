import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const useAvatarPicker = () => {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickAvatar = async () => {
    try {
      setLoading(true);

      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          
          'Ứng dụng cần quyền truy cập ảnh của bạn'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Pick avatar error:', error);
      Alert.alert('Lỗi', 'Không thể chọn ảnh.');
    } finally {
      setLoading(false);
    }
  };

  const removeAvatar = () => {
    setAvatarUri(null);
  };

  return {
    avatarUri,
    pickAvatar,
    removeAvatar,
    loading,
  };
}