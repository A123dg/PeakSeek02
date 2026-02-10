// app/login.tsx

  import { useRouter } from 'expo-router';
  import React from 'react';
  import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

  // import { AuthInput } from '@/components/app/AuthInput';
  import { Palette } from '@/components/app/palette';
  // import { PrimaryButton } from '@/components/app/PrimaryButton';
  import { SocialButton } from '@/components/app/SocialButton';

  export default function Login() {
    const router = useRouter();
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={Palette.bg} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.brand}>PeakSeek</Text>
            <Text style={styles.tagline}>Tìm địa điểm học tập và làm việc lý tưởng</Text>
          </View>

          {/* <View style={styles.card}> */}
            {/* <Text style={styles.title}>Dang nhap</Text> */}
            {/* <AuthInput
              label="Email"
              placeholder="ban@example.com"
              value={email}
              onChangeText={setEmail}
            />
            <AuthInput
              label="Mat khau"
              placeholder="Nhap mat khau"
              value={password}
              onChangeText={setPassword}
              secureTextEntry */}
            {/* /> */}
            {/* <PrimaryButton label="Dang nhap" onPress={() => router.replace('/(tabs)')} /> */}

            {/* <Text style={styles.orText}>Hoac</Text> */}
            <View style={{ marginTop: 220}}>
            <SocialButton
              label="Đăng nhập với Google"
              icon={require('../../../../assets/google/google_icon.png')}
              onPress={() => router.replace('/(tabs)')}
            />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
            <Text style={styles.footerText}>
              Chưa có tài khoản?{' '}
                </Text>

              <Text style={styles.link} onPress={() => router.push('/auth/pages/register/Register')}>
                Đăng ký
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 100,
      backgroundColor: Palette.bg,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 28,
    },
    header: {
      marginBottom: 24,
    },
    brand: {
      justifyContent: 'center',
      display: 'flex',
      fontSize: 28,
      fontWeight: '800',
      color: Palette.text,
    },
    tagline: {
       justifyContent: 'center',
      display: 'flex',
      marginTop: 6,
      fontSize: 14,
      color: Palette.subtext,
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
      fontWeight: '700',
      color: Palette.text,
      marginBottom: 12,
    },
    orText: {
      textAlign: 'center',
      color: Palette.subtext,
      marginVertical: 14,
    },
    footerText: {
      textDecorationLine: 'underline',
      textAlign: 'center',
      // marginTop: 10,
      color: Palette.subtext,
    },
    link: {
      color: Palette.primary,
      fontWeight: '600',
    },
  });

