import React, { useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Image,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { Palette } from '@/components/app/palette';
import { useImagePicker } from '@/hooks/useImagePicker';
import { stylesUI } from '@/components/app/styles';

const comments = [
    {
        id: '1',
        name: 'Lan Anh',
        time: '2 ngày trước',
        content: 'Mình đi cuối tuần thấy hơi đông, nhưng không gian vẫn ổn.',
    },
    {
        id: '2',
        name: 'Hải Nam',
        time: '1 tuần trước',
        content: 'Wifi mạnh, ổ cắm nhiều. Phù hợp làm việc nhóm.',
    },
    {
        id: '3',
        name: 'Thảo Vy',
        time: '3 giờ trước',
        content: 'Không gian yên tĩnh, nhân viên thân thiện.',
    },
];

export const LocationComment = () => {
    const router = useRouter();
    const inputRef = useRef<TextInput>(null);
    const [replyTo, setReplyTo] = useState<string | null>(null);
    const { images, pickImages, removeImage, resetImages, loading } = useImagePicker();
    const handleReplyPress = (name: string) => {
        setReplyTo(name);
        inputRef.current?.focus();
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={52}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <Pressable style={styles.headerIcon} onPress={() => router.back()}>
                            <Ionicons name="chevron-back" size={22} color={Palette.primary} />
                        </Pressable>
                        <Text style={styles.headerTitle}>Bình luận</Text>
                        <Pressable style={styles.headerAction}>
                            {/* <Text style={styles.headerActionText}>Gửi</Text> */}
                        </Pressable>
                    </View>

                    <ScrollView
                        style={{ flex: 1 }}
                        contentContainerStyle={styles.bodyContent}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.locationReviewCard}>
                            <View style={styles.locationAvatar}>
                                <Text style={styles.locationAvatarText}>W</Text>
                            </View>

                            <View style={{ flex: 1, gap: 4 }}>
                                <View style={styles.locationTopRow}>
                                    <Text style={styles.locationName}>WorkHub District 1</Text>
                                    <View style={styles.locationBadge}>
                                        <Text style={styles.locationBadgeText}>Coworking</Text>
                                    </View>
                                </View>

                                <View style={styles.locationMetaRow}>
                                    <View style={styles.locationStarRow}>
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Ionicons key={i} name="star" size={12} color="#f5a146" />
                                        ))}
                                        <Text style={styles.locationRatingText}>4.8</Text>
                                    </View>

                                    <Text style={styles.locationDot}>•</Text>
                                    <Text style={styles.locationSubText}>Quận 1</Text>
                                    <Text style={styles.locationDot}>•</Text>
                                    <Text style={styles.locationSubText}>Mở 08:00 - 22:00</Text>
                                </View>

                                <Text style={styles.locationAddress} numberOfLines={1}>
                                    12 Lê Lợi, Q1, TP.HCM
                                </Text>
                            </View>
                        </View>

                        <View style={styles.commentList}>
                            {comments.map((comment) => (
                                <View key={comment.id} style={styles.commentRow}>
                                    <View style={styles.avatar}>
                                        <Text style={styles.avatarText}>{comment.name[0]}</Text>
                                    </View>
                                    <View style={styles.commentBody}>
                                        <View style={styles.commentHeader}>
                                            <Text style={styles.commentName}>{comment.name}</Text>
                                            <Text style={styles.commentTime}>{comment.time}</Text>
                                        </View>
                                        <Text style={styles.commentText}>{comment.content}</Text>
                                        <Pressable style={styles.replyButton} onPress={() => handleReplyPress(comment.name)}>
                                            <Text style={styles.replyText}>Trả lời</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                    <View style={{ marginLeft: 48 }}>
                        {images.length > 0 ? (
                            <View style={stylesUI.previewWrap}>
                                {images.map((uri) => (
                                    <View key={uri} style={stylesUI.previewItem}>
                                        <Image source={{ uri }} style={stylesUI.previewImage} />
                                        <Pressable style={stylesUI.removeBadge} onPress={() => removeImage(uri)}>
                                            <Text style={stylesUI.removeText}>×</Text>
                                        </Pressable>
                                    </View>
                                ))}
                            </View>
                        ) : null}
                    </View>
                    <View style={styles.inputBar}>
                        <View style={styles.inputAvatar}>
                            <Text style={styles.inputAvatarText}>M</Text>
                        </View>
                        <TextInput
                            ref={inputRef}
                            style={styles.input}
                            placeholder={replyTo ? `Trả lời ${replyTo}...` : 'Minh Trí · Viết bình luận của bạn...'}
                            placeholderTextColor={Palette.subtext}
                        />

                        <Pressable style={styles.imageButton} onPress={pickImages}>
                            <Ionicons name="image-outline" size={16} color="#475569" />
                        </Pressable>
                        <Pressable style={styles.sendButton}>
                            <Ionicons name="send" size={16} color="#ffffff" />
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

export default LocationComment;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f3f4f8',
    },
    header: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: Palette.border,
        backgroundColor: '#ffffff',
    },
    headerIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Palette.text,
    },
    headerAction: {
        width: 36,
        alignItems: 'flex-end',
    },
    headerActionText: {
        fontSize: 12,
        fontWeight: '700',
        color: Palette.primary,
    },
    bodyContent: {
        padding: 16,
        gap: 14,
    },
    locationCard: {
        borderRadius: 12,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: Palette.border,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    locationTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: Palette.text,
    },
    locationMeta: {
        marginTop: 2,
        fontSize: 12,
        color: Palette.subtext,
    },
    locationReviewCard: {
        flexDirection: 'row',
        gap: 10,
        padding: 12,
        borderRadius: 14,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: Palette.border,
    },
    locationAvatar: {
        width: 38,
        height: 38,
        borderRadius: 12,
        backgroundColor: '#eef2ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    locationAvatarText: {
        fontSize: 14,
        fontWeight: '800',
        color: '#3730a3',
    },
    locationTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    locationName: {
        flex: 1,
        fontSize: 13,
        fontWeight: '800',
        color: Palette.text,
    },
    locationBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: '#e0e7ff',
    },
    locationBadgeText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#1d4ed8',
    },
    locationMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationStarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        marginRight: 6,
    },
    locationRatingText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#111827',
        marginLeft: 4,
    },
    locationDot: {
        marginHorizontal: 6,
        color: '#94a3b8',
        fontSize: 11,
    },
    locationSubText: {
        fontSize: 11,
        color: '#64748b',
        fontWeight: '600',
    },
    locationAddress: {
        fontSize: 11,
        color: '#475569',
    },
    commentList: {
        gap: 12,
    },
    commentRow: {
        flexDirection: 'row',
        gap: 10,
    },
    avatar: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#d1d5db',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
    },
    avatarText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#374151',
    },
    commentBody: {
        flex: 1,
        gap: 4,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    commentName: {
        fontSize: 13,
        fontWeight: '700',
        color: Palette.text,
    },
    commentTime: {
        fontSize: 11,
        color: Palette.subtext,
    },
    commentText: {
        fontSize: 12,
        color: '#4b5563',
        lineHeight: 17,
    },
    replyButton: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: '#f1f5f9',
    },
    replyText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#475569',
    },
    inputBar: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: Palette.border,
        backgroundColor: '#ffffff',
    },
    inputAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#e2e8f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputAvatarText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#475569',
    },
    input: {
        flex: 1,
        fontSize: 12,
        color: Palette.text,
    },
    imageButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Palette.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
