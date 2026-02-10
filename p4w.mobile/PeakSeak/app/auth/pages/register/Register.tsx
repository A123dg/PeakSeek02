import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { AuthInput } from '@/components/app/AuthInput';
import { Palette } from '@/components/app/palette';
import { PrimaryButton } from '@/components/app/PrimaryButton';

export default function Register() {
	const router = useRouter();
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor={Palette.bg} />
			<View style={styles.content}>
				<View style={styles.header}>
					<Text style={styles.title}>Tao tai khoan</Text>
					<Text style={styles.subtitle}>Bat dau hanh trinh tim diem ly tuong</Text>
				</View>

				<View style={styles.card}>
					<AuthInput
						label="Ho va ten"
						placeholder="Nguyen Van A"
						value={fullName}
						onChangeText={setFullName}
					/>
					<AuthInput
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
						secureTextEntry
					/>
					<PrimaryButton label="Dang ky" onPress={() => router.replace('/(tabs)')} />
					<PrimaryButton
						label="Da co tai khoan? Dang nhap"
						variant="ghost"
						style={styles.ghostButton}
						onPress={() => router.back()}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}

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
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: '800',
		color: Palette.text,
	},
	subtitle: {
		marginTop: 6,
		color: Palette.subtext,
	},
	card: {
		backgroundColor: Palette.card,
		borderRadius: 20,
		padding: 18,
		borderWidth: 1,
		borderColor: Palette.border,
	},
	ghostButton: {
		marginTop: 12,
	},
});
