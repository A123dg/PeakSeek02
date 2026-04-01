import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Palette } from "@/components/app/palette";
import { ReportBottomSheet } from "@/components/app/ReportBottomSheet";
import { stylesUI } from "@/components/app/styles";
import { useAuth } from "@/contexts/AuthContext";
import { useImagePicker } from "@/hooks/useImagePicker";
import { useReport } from "@/hooks/useReport";
import {
  createCommentApi,
  createReportApi,
  getLocationReviewsApi,
  getReviewCommentsApi,
  type Comment,
  type Review,
  uploadImageApi,
} from "@/services/api";

const formatTimeAgo = (value: string) => {
  const date = new Date(value).getTime();
  const diffHours = Math.max(1, Math.floor((Date.now() - date) / (1000 * 60 * 60)));
  if (diffHours < 24) return `${diffHours} giờ trước`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} ngày trước`;
};

export default function LocationComment() {
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  const { reviewId, locationId, locationName } = useLocalSearchParams<{
    reviewId?: string;
    locationId?: string;
    locationName?: string;
  }>();
  const { reportModalRef, closeReportSheet } = useReport();
  const { authorizedRequest, isAuthenticated, profile } = useAuth();
  const { images, pickImages, removeImage, resetImages } = useImagePicker([], 1);

  const [review, setReview] = useState<Review | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportTarget, setReportTarget] = useState<{ targetType: "review" | "comment"; targetId: string } | null>(null);

  const loadData = useCallback(async () => {
    if (!reviewId || !locationId) {
      setIsLoading(false);
      return;
    }

    try {
      const [reviewResponse, commentResponse] = await Promise.all([
        getLocationReviewsApi(locationId, 1, 50),
        getReviewCommentsApi(reviewId, 1, 50),
      ]);

      setReview(reviewResponse.data.find((item) => item.id === reviewId) ?? null);
      setComments(commentResponse.data);
    } finally {
      setIsLoading(false);
    }
  }, [locationId, reviewId]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleReplyPress = (comment: Comment) => {
    setReplyTo({ id: comment.id, name: comment.userName });
    inputRef.current?.focus();
  };
  const handleOpenReport = useCallback(
    (targetType: "review" | "comment", targetId: string) => {
      if (!isAuthenticated) {
        Alert.alert("Cần đăng nhập", "Vui lòng đăng nhập để báo cáo vi phạm.");
        return;
      }

      setReportTarget({ targetType, targetId });
      reportModalRef.current?.present();
    },
    [isAuthenticated, reportModalRef]
  );

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      Alert.alert("Cần đăng nhập", "Vui lòng đăng nhập để bình luận.");
      return;
    }

    if (!reviewId) {
      return;
    }

    if (!content.trim()) {
      Alert.alert("Thiếu nội dung", "Vui lòng nhập nội dung bình luận.");
      return;
    }

    try {
      setIsSubmitting(true);

      const mediaLinkUrl =
        images[0]
          ? (
              await uploadImageApi({
                uri: images[0],
                name: "comment-1.jpg",
                type: "image/jpeg",
              })
            ).data
          : undefined;

      await authorizedRequest((token) =>
        createCommentApi(
          {
            reviewId,
            parentId: replyTo?.id,
            content: content.trim(),
            mediaLinkUrl,
          },
          token
        )
      );

      setContent("");
      setReplyTo(null);
      resetImages();
      await loadData();
    } catch (error) {
      Alert.alert("Thất bại", error instanceof Error ? error.message : "Không gửi được bình luận.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reviewMedia = useMemo(() => review?.mediaLinkUrls ?? [], [review?.mediaLinkUrls]);

  const renderComment = (comment: Comment, depth = 0): React.ReactNode => (
    <View key={comment.id} style={[styles.commentBlock, depth > 0 && styles.childCommentBlock]}>
      <View style={styles.commentRow}>
        {comment.avatarUrl ? (
          <Image source={{ uri: comment.avatarUrl }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{comment.userName[0]}</Text>
          </View>
        )}
        <View style={styles.commentBody}>
          <View style={styles.commentHeader}>
            <Text style={styles.commentName}>{comment.userName}</Text>
            <Text style={styles.commentTime}>{formatTimeAgo(comment.createdAt)}</Text>
          </View>
          <Text style={styles.commentText}>{comment.content}</Text>
          {comment.mediaLinkUrl ? <Image source={{ uri: comment.mediaLinkUrl }} style={styles.commentImage} /> : null}
          <View style={styles.commentActions}>
            <Pressable style={styles.replyButton} onPress={() => handleReplyPress(comment)}>
              <Text style={styles.replyText}>Tra loi</Text>
            </Pressable>
            <Pressable style={styles.reportTextButton} onPress={() => handleOpenReport("comment", comment.id)}>
              <Text style={styles.reportText}>Bao cao</Text>
            </Pressable>
          </View>
        </View>
      </View>
      {comment.children?.length ? comment.children.map((child) => renderComment(child, depth + 1)) : null}
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loaderWrap}>
        <ActivityIndicator color={Palette.primary} />
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={52}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <Pressable style={styles.headerIcon} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={22} color={Palette.primary} />
            </Pressable>
            <Text style={styles.headerTitle}>Binh luan</Text>
            <View style={styles.headerAction} />
          </View>

          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.bodyContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.locationCard}>
              <Text style={styles.locationTitle}>{locationName ?? "Chi tiết đánh giá"}</Text>
              {review ? (
                <>
                  <View style={styles.reviewMetaRow}>
                    <Text style={styles.reviewUser}>{review.userName}</Text>
                    <View style={styles.reviewMetaActions}>
                      <Text style={styles.reviewTime}>{formatTimeAgo(review.createdAt)}</Text>
                      <Pressable
                        style={styles.reviewActionButton}
                        hitSlop={10}
                        onPress={() => handleOpenReport("review", review.id)}
                      >
                        <Ionicons name="flag-outline" size={18} color={Palette.subtext} />
                      </Pressable>
                    </View>
                  </View>
                  <View style={styles.starRow}>
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <Ionicons key={index} name="star" size={12} color="#f5a146" />
                    ))}
                  </View>
                  <Text style={styles.reviewContent}>{review.content}</Text>
                  {reviewMedia.length > 0 ? (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.reviewMediaRow}>
                      {reviewMedia.map((uri) => (
                        <Image key={uri} source={{ uri }} style={styles.reviewImage} />
                      ))}
                    </ScrollView>
                  ) : null}
                </>
              ) : (
                <Text style={styles.locationMeta}>Không tìm thấy review tương ứng.</Text>
              )}
            </View>

            <View style={styles.commentList}>{comments.map((comment) => renderComment(comment))}</View>
          </ScrollView>

          <View style={{ marginLeft: 48 }}>
            {images.length > 0 ? (
              <View style={stylesUI.previewWrap}>
                {images.map((uri) => (
                  <View key={uri} style={stylesUI.previewItem}>
                    <Image source={{ uri }} style={stylesUI.previewImage} />
                    <Pressable style={stylesUI.removeBadge} onPress={() => removeImage(uri)}>
                      <Text style={stylesUI.removeText}>x</Text>
                    </Pressable>
                  </View>
                ))}
              </View>
            ) : null}
          </View>

          <View style={styles.inputBar}>
            {profile?.mediaLinkUrl ? (
              <Image source={{ uri: profile.mediaLinkUrl }} style={styles.inputAvatarImage} />
            ) : (
              <View style={styles.inputAvatar}>
                <Text style={styles.inputAvatarText}>{profile?.userName?.[0] ?? "M"}</Text>
              </View>
            )}
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={content}
              onChangeText={setContent}
              editable={!isSubmitting}
              placeholder={replyTo ? `Trả lời ${replyTo.name}...` : "Viết bình luận của bạn..."}
              placeholderTextColor={Palette.subtext}
            />
            <Pressable style={styles.imageButton} onPress={() => void pickImages()}>
              <Ionicons name="image-outline" size={16} color="#475569" />
            </Pressable>
            <Pressable style={[styles.sendButton, isSubmitting && styles.sendButtonDisabled]} onPress={() => void handleSubmit()}>
              <Ionicons name="send" size={16} color="#ffffff" />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      <ReportBottomSheet
        ref={reportModalRef}
        snapPoints={["55%"]}
        onCancelPress={closeReportSheet}
        onSubmitPress={async (payload) => {
          try {
            await authorizedRequest((token) =>
              createReportApi(
                {
                  reason: payload.note ? `${payload.reason}: ${payload.note}` : payload.reason,
                  targetType: reportTarget?.targetType ?? "comment",
                  targetId: reportTarget?.targetId ?? "",
                },
                token
              )
            );
            setReportTarget(null);
            closeReportSheet();
            Alert.alert("Thành công", "Cảm ơn bạn, báo cáo đã được gửi.");
          } catch (error) {
            Alert.alert("Thất bại", error instanceof Error ? error.message : "Không gửi được báo cáo.");
          }
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loaderWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f8",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f3f4f8",
  },
  header: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Palette.border,
    backgroundColor: "#ffffff",
  },
  headerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Palette.text,
  },
  headerAction: {
    width: 36,
  },
  bodyContent: {
    padding: 16,
    gap: 14,
  },
  locationCard: {
    borderRadius: 14,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: Palette.border,
    padding: 14,
    gap: 8,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Palette.text,
  },
  locationMeta: {
    fontSize: 12,
    color: Palette.subtext,
  },
  reviewMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  reviewMetaActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reviewUser: {
    fontSize: 13,
    fontWeight: "700",
    color: Palette.text,
  },
  reviewTime: {
    fontSize: 11,
    color: Palette.subtext,
  },
  starRow: {
    flexDirection: "row",
    gap: 2,
  },
  reviewContent: {
    fontSize: 12,
    color: "#4b5563",
    lineHeight: 18,
  },
  reviewMediaRow: {
    gap: 8,
  },
  reviewImage: {
    width: 92,
    height: 92,
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
  },
  commentList: {
    gap: 12,
  },
  commentBlock: {
    gap: 8,
  },
  childCommentBlock: {
    marginLeft: 44,
  },
  commentRow: {
    flexDirection: "row",
    gap: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  avatarImage: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginTop: 2,
    backgroundColor: "#d1d5db",
  },
  avatarText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
  },
  commentBody: {
    flex: 1,
    gap: 4,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  commentName: {
    fontSize: 13,
    fontWeight: "700",
    color: Palette.text,
  },
  commentTime: {
    fontSize: 11,
    color: Palette.subtext,
  },
  commentText: {
    fontSize: 12,
    color: "#4b5563",
    lineHeight: 17,
  },
  commentImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginTop: 4,
    backgroundColor: "#e5e7eb",
  },
  commentActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 2,
  },
  replyButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#f1f5f9",
  },
  replyText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#475569",
  },
  reportTextButton: {
    alignSelf: "flex-start",
    paddingVertical: 4,
  },
  reportText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#dc2626",
  },
  reviewActionButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: Palette.border,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Palette.border,
    backgroundColor: "#ffffff",
  },
  inputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
  },
  inputAvatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e2e8f0",
  },
  inputAvatarText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
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
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Palette.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },
});

