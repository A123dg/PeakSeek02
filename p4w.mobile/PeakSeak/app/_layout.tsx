import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>

        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                          <BottomSheetModalProvider>

          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="auth/login/Login"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth/register/Register"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="location/location-info"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="location/location-info/comment"
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
              name="modal"
              options={{ presentation: 'modal', title: 'Modal' }}
            /> */}
          </Stack>
          <StatusBar style="auto" />
          </BottomSheetModalProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
