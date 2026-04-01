// import React from 'react';
// import { SafeAreaView, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// const reviews = [
//   {
//     id: '1',
//     title: 'Lan Anh 2 - truyen trade',
//     stars: 5,
//     time: '1 giờ trước',
//     text: 'Không gian yên tĩnh, wifi ổn định, vệ sinh tốt.',
//   },
//   {
//     id: '2',
//     title: 'Minh Tri 1 tieu thuoc',
//     stars: 4,
//     time: '3 ngày trước',
//     text: 'Vi tri de tim, cho ngoi thoai mai, phuc vu nhanh.',
//   },
//   {
//     id: '3',
//     title: 'Ngoc Vy 6 - truyen thuoc',
//     stars: 3,
//     time: '5 ngày trước',
//     text: 'Không gian ổn, giờ cao điểm hơi đông một chút.',
//   },
// ];

// const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

// export const LocationInfo = () => {
//   const { width } = useWindowDimensions();

//   const contentWidth = Math.min(width - 24, 460);
//   const imageHeight = clamp(contentWidth * 0.58, 170, 260);
//   const titleSize = clamp(contentWidth * 0.072, 20, 28);
//   const textSize = clamp(contentWidth * 0.038, 13, 16);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <ScrollView
//         style={styles.screen}
//         contentContainerStyle={[styles.container, { paddingHorizontal: clamp((width - contentWidth) / 2, 12, 20) }]}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={[styles.mapBlock, { height: imageHeight }]}>
//           <View style={styles.mapOverlay} />
//           <View style={styles.topIconRow}>
//             <View style={styles.iconButton}>
//               <Ionicons name="chevron-back" size={20} color="#ffffff" />
//             </View>
//             <View style={styles.iconButton}>
//               <Ionicons name="heart-outline" size={18} color="#ffffff" />
//             </View>
//           </View>
//         </View>

//         <View style={styles.titleRow}>
//           <Text style={[styles.title, { fontSize: titleSize }]}>WorkHub District 1</Text>
//           <View style={styles.hoursBadge}>
//             <Text style={styles.hoursText}>Mo 08:00 - Dong 22:00</Text>
//           </View>
//         </View>
//         <Text style={[styles.category, { fontSize: textSize - 1 }]}>Coworking</Text>

//         <Text style={[styles.meta, { fontSize: textSize - 1 }]}>12 Le Lỗi, Q1, TP.HCM</Text>
//         <Text style={[styles.desc, { fontSize: textSize, lineHeight: textSize * 1.45 }]}>
//           Khong gian yen tinh, internet on dinh, nhieu o cam, ban ghe thoai mai cho hoc tap va lam viec nhom.
//         </Text>

//         <View style={styles.ratingCard}>
//           <Text style={styles.ratingValue}>4.8</Text>
//           <View style={styles.ratingRight}>
//             <View style={styles.starRow}>
//               {Array.from({ length: 5 }).map((_, idx) => (
//                 <MaterialIcons key={idx} name="star" size={16} color="#f5a146" />
//               ))}
//             </View>
//             <Text style={styles.ratingMeta}>320 danh gia - cap nhat lan cuoi 18:00 - 22:00</Text>
//           </View>
//         </View>

//         <View style={styles.reviewHeader}>
//           <Text style={styles.reviewTitle}>Danh gia</Text>
//           <Text style={styles.verify}>Da xac minh</Text>
//         </View>

//         <View style={styles.reviewList}>
//           {reviews.map((review) => (
//             <View key={review.id} style={styles.reviewCard}>
//               <View style={styles.avatar}>
//                 <Text style={styles.avatarText}>{review.title[0]}</Text>
//               </View>

//               <View style={styles.reviewBody}>
//                 <Text style={styles.name}>{review.title}</Text>
//                 <View style={styles.metaLine}>
//                   <View style={styles.smallStarRow}>
//                     {Array.from({ length: review.stars }).map((_, i) => (
//                       <MaterialIcons key={i} name="star" size={12} color="#f5a146" />
//                     ))}
//                   </View>
//                   <Text style={styles.time}>{review.time}</Text>
//                 </View>
//                 <Text style={styles.reviewText}>{review.text}</Text>
//               </View>
//             </View>
//           ))}
//         </View>

//         <Text style={styles.footer}>Trang thai: Dang mo cua</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default LocationInfo;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#f2f4f8',
//   },
//   screen: {
//     flex: 1,
//     backgroundColor: '#f2f4f8',
//   },
//   container: {
//     paddingTop: 12,
//     paddingBottom: 28,
//     gap: 10,
//   },
//   mapBlock: {
//     borderRadius: 18,
//     backgroundColor: '#b9b4ad',
//     overflow: 'hidden',
//   },
//   mapOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.08)',
//   },
//   topIconRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     paddingTop: 12,
//   },
//   iconButton: {
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.24)',
//   },
//   titleRow: {
//     marginTop: 4,
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   title: {
//     flex: 1,
//     fontWeight: '700',
//     color: '#111827',
//   },
//   hoursBadge: {
//     borderRadius: 999,
//     backgroundColor: '#dcfce7',
//     borderWidth: 1,
//     borderColor: '#86efac',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//   },
//   hoursText: {
//     fontSize: 11,
//     color: '#166534',
//     fontWeight: '700',
//   },
//   category: {
//     color: '#4b5563',
//     marginTop: -2,
//   },
//   meta: {
//     color: '#374151',
//     fontWeight: '500',
//     marginTop: 6,
//   },
//   desc: {
//     color: '#4b5563',
//     marginTop: 2,
//   },
//   ratingCard: {
//     marginTop: 6,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     borderRadius: 14,
//     backgroundColor: '#ffffff',
//     paddingHorizontal: 12,
//     paddingVertical: 12,
//     gap: 10,
//     shadowColor: '#000000',
//     shadowOpacity: 0.05,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 4 },
//     elevation: 2,
//   },
//   ratingValue: {
//     fontSize: 34,
//     fontWeight: '700',
//     color: '#111827',
//     lineHeight: 38,
//   },
//   ratingRight: {
//     flex: 1,
//     gap: 4,
//   },
//   starRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 2,
//   },
//   ratingMeta: {
//     fontSize: 12,
//     color: '#6b7280',
//   },
//   reviewHeader: {
//     marginTop: 6,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   reviewTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#111827',
//   },
//   verify: {
//     fontSize: 12,
//     color: '#1d4ed8',
//     backgroundColor: '#e0e7ff',
//     borderRadius: 999,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     overflow: 'hidden',
//     fontWeight: '600',
//   },
//   reviewList: {
//     gap: 10,
//   },
//   reviewCard: {
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     backgroundColor: '#ffffff',
//     padding: 12,
//     flexDirection: 'row',
//     gap: 10,
//   },
//   avatar: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: '#dbe3ee',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 2,
//   },
//   avatarText: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#334155',
//   },
//   reviewBody: {
//     flex: 1,
//     gap: 3,
//   },
//   name: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   metaLine: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   smallStarRow: {
//     flexDirection: 'row',
//     gap: 1,
//   },
//   time: {
//     fontSize: 11,
//     color: '#6b7280',
//   },
//   reviewText: {
//     fontSize: 12,
//     color: '#4b5563',
//     lineHeight: 17,
//   },
//   footer: {
//     fontSize: 11,
//     color: '#6b7280',
//     marginTop: 2,
//   },
// });

