import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AuthInput } from '@/components/app/AuthInput';
import { Palette } from '@/components/app/palette';
import { PrimaryButton } from '@/components/app/PrimaryButton';
import { useAvatarPicker } from '@/hooks/useAvatarPicker';
import { DatePickerUI } from '@/components/app/DatePicker';
import { sanitizeKeyboardInput } from '@/shared/rules/inputRules';
const noSpecialCharacterRule = {
	id: 'NO_SPECIAL_CHARACTER',
	validate: (value: string) => /^[\p{L}\p{N}\s]*$/u.test(value),
	message: 'Khong duoc nhap ky tu dac biet.',
};


export const Register = () => {
	const router = useRouter();
	const [fullName, setFullName] = useState('');
	// const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [date, setDate] = useState(new Date());
	const { avatarUri, pickAvatar, removeAvatar, loading } =
		useAvatarPicker();
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" backgroundColor={Palette.bg} />
			<View style={styles.content}>
				<View style={styles.header}>
					<Text style={styles.title}>Tạo tài khoản</Text>
					{/* <Text style={styles.subtitle}>Bat dau hanh trinh tim diem ly tuong</Text> */}
				</View>
				<View style={styles.avatarSection}>
					<Pressable
						onPress={pickAvatar}
						disabled={loading}
						style={({ pressed }) => [
							styles.avatarPressable,
							pressed && !loading && { opacity: 0.85 },
						]}
					>
						<View style={styles.avatarWrap}>
							{avatarUri ? (
								<Image source={{ uri: avatarUri }} style={styles.avatarImg} />
							) : (
								<View style={styles.avatarPlaceholder}>
									<Ionicons name="cloud-upload-outline" size={26} color={Palette.subtext} />
									<Text style={styles.avatarPlaceholderText}>Tải ảnh</Text>
								</View>
							)}

							<View style={styles.avatarBadge}>
								<Ionicons name="camera" size={14} color="#fff" />
							</View>

							{/* loading overlay */}
							{loading && (
								<View style={styles.avatarLoadingOverlay}>
									<ActivityIndicator />
								</View>
							)}
						</View>
					</Pressable>

					{/* <Text style={styles.avatarHint}>Them anh dai dien giup ban de duoc nhan ra hon</Text> */}

					{avatarUri && (
						<Pressable
							onPress={removeAvatar}
							disabled={loading}
							style={({ pressed }) => [
								styles.removeBtn,
								pressed && !loading && { opacity: 0.85 },
							]}
						>
							<Ionicons name="trash-outline" size={16} color="#EF4444" />
							<Text style={styles.removeText}>Xoá ảnh</Text>
						</Pressable>
					)}
				</View>
				<View style={styles.card}>
					<AuthInput
						label="Họ và tên"
						placeholder="Nhập tên của bạn"
						value={fullName}
						onChangeText={setFullName}
						rules={[noSpecialCharacterRule]}
						sanitizeInput={sanitizeKeyboardInput}
					/>
					<DatePickerUI
						label="Ngày sinh"
						value={date}
						onConfirm={(newDate) => setDate(newDate)}
						maximumDate={new Date()}
					/>
					{/* <AuthInput
						label="Email"
						placeholder="ban@example.com"
						value={email}
						onChangeText={setEmail}
					/> */}
					<AuthInput
						label="Địa chỉ"
						placeholder="Nhập địa chỉ"
						value={address}
						onChangeText={setAddress}
					/>
					<PrimaryButton label="Đăng ký" onPress={() => router.replace('/(tabs)')} />
					<PrimaryButton
						label="Đã có tài khoản? Đăng nhập"
						variant="ghost"
						style={styles.ghostButton}
						onPress={() => router.push('/auth/login/Login')}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}
export default Register;

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
	avatarSection: {
		alignItems: 'center',
		marginBottom: 14,
	},
	avatarPressable: {
		alignItems: 'center',
	},
	avatarWrap: {
		width: 104,
		height: 104,
		borderRadius: 52,
		backgroundColor: Palette.card,
		borderWidth: 1,
		borderColor: Palette.border,
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatarImg: {
		width: '100%',
		height: '100%',
	},
	avatarPlaceholder: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: 4,
	},
	avatarPlaceholderText: {
		fontSize: 12,
		fontWeight: '700',
		color: Palette.subtext,
	},
	avatarBadge: {
		position: 'absolute',
		right: 6,
		bottom: 6,
		width: 28,
		height: 28,
		borderRadius: 14,
		backgroundColor: Palette.primary ?? '#16A34A',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: Palette.card,
	},
	avatarLoadingOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(255,255,255,0.6)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatarHint: {
		marginTop: 10,
		fontSize: 12,
		color: Palette.subtext,
	},
	removeBtn: {
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 999,
		borderWidth: 1,
		borderColor: '#FEE2E2',
		backgroundColor: '#FFF1F2',
	},
	removeText: {
		color: '#EF4444',
		fontWeight: '800',
		fontSize: 12,
	},
});



