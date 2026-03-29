import { useRouter } from "expo-router";
import React from "react";
import { Alert, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";

import { Palette } from "@/components/app/palette";
import { PrimaryButton } from "@/components/app/PrimaryButton";
import { SocialButton } from "@/components/app/SocialButton";
import { useAuth } from "@/contexts/AuthContext";

WebBrowser.maybeCompleteAuthSession();

const googleClientIds = {
  web: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID?.trim() || process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID?.trim(),
};

const expoProxyRedirectUri = "https://auth.expo.io/@na01041612/PeakSeak";

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
};

const getGoogleConfigError = () => {
  if (!googleClientIds.web) {
    return "Thieu EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID hoac EXPO_PUBLIC_GOOGLE_CLIENT_ID.";
  }
  return null;
};

type GoogleLoginButtonProps = {
  isLoading: boolean;
  onGoogleToken: (idToken: string) => Promise<void>;
};

const GoogleLoginButton = ({ isLoading, onGoogleToken }: GoogleLoginButtonProps) => {
  const router = useRouter();
  const googleConfigError = getGoogleConfigError();

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: googleClientIds.web!,
      redirectUri: expoProxyRedirectUri,
      responseType: "id_token",
      scopes: ["openid", "email", "profile"],
      extraParams: {
        nonce: "nonce123",
      },
    },
    discovery
  );

  React.useEffect(() => {
    console.log("redirectUri:", expoProxyRedirectUri);
  }, []);

  React.useEffect(() => {
    const handleGoogleResponse = async () => {
      if (response?.type !== "success") {
        if (response?.type === "error") {
          console.log("Google error:", JSON.stringify(response.error));
        }
        return;
      }

      console.log("response params:", JSON.stringify(response.params, null, 2));

      const idToken = response.params?.id_token;
      if (!idToken) {
        Alert.alert("Dang nhap Google that bai", "Khong lay duoc idToken tu Google.");
        return;
      }

      try {
        await onGoogleToken(idToken);
        router.replace("/(tabs)");
      } catch (error) {
        Alert.alert(
          "Dang nhap Google that bai",
          error instanceof Error ? error.message : "Co loi xay ra"
        );
      }
    };

    void handleGoogleResponse();
  }, [onGoogleToken, response, router]);

  const handleGoogleLogin = async () => {
    try {
      if (googleConfigError) {
        Alert.alert("Cau hinh Google chua hop le", googleConfigError);
        return;
      }

      if (!request) {
        Alert.alert(
          "Dang nhap Google chua san sang",
          "Khong tao duoc OAuth request. Kiem tra lai Google client ID va redirect URI."
        );
        return;
      }

      await promptAsync();
    } catch (error) {
      Alert.alert(
        "Dang nhap Google that bai",
        error instanceof Error ? error.message : "Co loi xay ra"
      );
    }
  };

  return (
    <SocialButton
      label={isLoading ? "Dang xu ly..." : "Dang nhap voi Google"}
      icon={require("../../../assets/google/google_icon.png")}
      onPress={
        googleConfigError
          ? () => Alert.alert("Cau hinh Google chua hop le", googleConfigError)
          : handleGoogleLogin
      }
    />
  );
};

export const Login = () => {
  const router = useRouter();
  const { loginWithGoogle, isLoading } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Palette.bg} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.brand}>PeakSeek</Text>
          <Text style={styles.tagline}>Tim dia diem hoc tap va lam viec ly tuong</Text>
        </View>

        <View style={styles.buttonContainer}>
          <GoogleLoginButton isLoading={isLoading} onGoogleToken={loginWithGoogle} />
          <PrimaryButton
            label="Dang nhap voi tu cach khach"
            variant="ghost"
            onPress={() => router.push("/(tabs)")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.bg,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 40,
  },
  brand: {
    fontSize: 28,
    fontWeight: "800",
    color: Palette.text,
  },
  tagline: {
    marginTop: 6,
    fontSize: 14,
    color: Palette.subtext,
    textAlign: "center",
  },
  card: {
    backgroundColor: Palette.card,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Palette.text,
    marginBottom: 12,
  },
  ghostButton: {
    marginTop: 12,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 32,
    gap: 16,
  },
});