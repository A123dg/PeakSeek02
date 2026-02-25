import { useCallback, useRef } from 'react';
import type { ReportBottomSheetRef } from '@/components/app/ReportBottomSheet';

export const useReport = () => {
  const reportModalRef = useRef<ReportBottomSheetRef>(null);

  const openReportSheet = useCallback(() => {
    console.log('ref', reportModalRef.current);
    reportModalRef.current?.present();
  }, []);

  const closeReportSheet = useCallback(() => {
    reportModalRef.current?.dismiss();
  }, []);

  return { reportModalRef, openReportSheet, closeReportSheet };
};
