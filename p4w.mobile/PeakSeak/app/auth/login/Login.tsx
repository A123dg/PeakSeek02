import { useRouter } from "expo-router";
import React from "react";
import { Alert, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import { Palette } from "@/components/app/palette";
import { PrimaryButton } from "@/components/app/PrimaryButton";
import { SocialButton } from "@/components/app/SocialButton";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL, type LoginResponse } from "@/services/api";
import { resolveServerMessage } from "@/services/serverMessage";

WebBrowser.maybeCompleteAuthSession();

const backendGoogleLoginUrl = `${API_BASE_URL}/Auth/google-login`;
const mobileRedirectUri = Linking.createURL("/auth/login");

const getGoogleConfigError = () => {
  if (!API_BASE_URL) {
    return "Thiếu EXPO_PUBLIC_API_URL.";
  }
  return null;
};

type GoogleLoginButtonProps = {
  isLoading: boolean;
  onGoogleLoginRedirect: (redirectUrl: string) => Promise<void>;
};

const GoogleLoginButton = ({ isLoading, onGoogleLoginRedirect }: GoogleLoginButtonProps) => {
  const googleConfigError = getGoogleConfigError();

  const handleGoogleLogin = async () => {
    try {
      if (googleConfigError) {
        Alert.alert("Cấu hình Google chưa hợp lệ", googleConfigError);
        return;
      }

      const authUrl = `${backendGoogleLoginUrl}?redirectUri=${encodeURIComponent(mobileRedirectUri)}`;
      const result = await WebBrowser.openAuthSessionAsync(authUrl, mobileRedirectUri);

      if (result.type === "success" && result.url) {
        await onGoogleLoginRedirect(result.url);
        return;
      }

      if (result.type === "cancel") {
        return;
      }

      Alert.alert("Đăng nhập Google thất bại", "Không nhận được phản hồi redirect từ backend.");
    } catch (error) {
      Alert.alert(
        "Đăng nhập Google thất bại",
        error instanceof Error ? error.message : "Có lỗi xảy ra"
      );
    }
  };

  return (
    <SocialButton
      label={isLoading ? "Đang xử lý..." : "Đăng nhập với Google"}
      icon={require("../../../assets/google/google_icon.png")}
      onPress={
        googleConfigError
          ? () => Alert.alert("Cấu hình Google chưa hợp lệ", googleConfigError)
          : handleGoogleLogin
      }
    />
  );
};

export const Login = () => {
  const router = useRouter();
  const { applyLoginResponse, isLoading } = useAuth();
  const incomingUrl = Linking.useURL();
  const lastProcessedUrlRef = React.useRef<string | null>(null);

  const handleGoogleLoginRedirect = React.useCallback(async (redirectUrl: string) => {
    const { queryParams } = Linking.parse(redirectUrl);
    const success = `${queryParams?.success ?? ""}`.toLowerCase() === "true";
    const message =
      typeof queryParams?.message === "string"
        ? resolveServerMessage(queryParams.message)
        : "Có lỗi xảy ra";

    if (!success) {
      throw new Error(message);
    }

    const accessToken =
      typeof queryParams?.accessToken === "string" ? queryParams.accessToken : undefined;
    const refreshToken =
      typeof queryParams?.refreshToken === "string" ? queryParams.refreshToken : undefined;

    if (!accessToken || !refreshToken) {
      throw new Error("Backend redirect không trả về đủ access token và refresh token.");
    }

    await applyLoginResponse({
      accessToken,
      refreshToken,
      expiresAt:
        typeof queryParams?.expiresAt === "string" ? queryParams.expiresAt : undefined,
      refreshTokenExpiryTime:
        typeof queryParams?.refreshTokenExpiryTime === "string"
          ? queryParams.refreshTokenExpiryTime
          : undefined,
    } satisfies LoginResponse);

    router.replace("/(tabs)");
  }, [applyLoginResponse, router]);

  React.useEffect(() => {
    if (!incomingUrl || incomingUrl === lastProcessedUrlRef.current) {
      return;
    }

    const { path, queryParams } = Linking.parse(incomingUrl);
    const hasGoogleLoginPayload =
      typeof queryParams?.accessToken === "string" ||
      typeof queryParams?.refreshToken === "string" ||
      typeof queryParams?.success === "string";

    if (path !== "auth/login" || !hasGoogleLoginPayload) {
      return;
    }

    lastProcessedUrlRef.current = incomingUrl;

    void handleGoogleLoginRedirect(incomingUrl).catch((error) => {
      Alert.alert(
        "Đăng nhập Google thất bại",
        error instanceof Error ? error.message : "Có lỗi xảy ra"
      );
    });
  }, [handleGoogleLoginRedirect, incomingUrl]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Palette.bg} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.brand}>PeakSeek</Text>
          <Text style={styles.tagline}>Tìm địa điểm học tập và làm việc lý tưởng</Text>
        </View>

        <View style={styles.buttonContainer}>
          <GoogleLoginButton isLoading={isLoading} onGoogleLoginRedirect={handleGoogleLoginRedirect} />
          <PrimaryButton
            label="Đăng nhập với tư cách khách"
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

