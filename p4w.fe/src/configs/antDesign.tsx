import { Empty, notification } from 'antd';
import locale from 'antd/es/locale/vi_VN';
import type { ConfigProviderProps } from 'antd/lib/config-provider';

const antdDefaultConfig: ConfigProviderProps = {
  locale: locale,
  componentSize: 'large',
  form: { colon: false },
  space: { size: 12 },
  renderEmpty: () => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Không có dữ liệu" />,
  theme: {
    token: {
      fontSize: 16,
      fontSizeLG: 16,
      fontFamily: 'Roboto, sans-serif',
      colorPrimary: '#178FE2',
      colorHighlight: '#178FE2',
      colorBorder: '#bcbebe',
      colorText: '#202426',
      colorBgContainerDisabled: '#E7E7E7',
      borderRadius: 4,
    },
    components: {
      Input: {
        colorTextDisabled: '#636767',
        colorBgContainerDisabled: '#e7e7e7',
      },
      InputNumber: {
        colorTextDisabled: '#636767',
        colorBgContainerDisabled: '#e7e7e7',
      },
      Table: {
        rowExpandedBg: 'transparent',
        headerColor: '#636767',
        headerBg: '#E7E7E7',
        borderColor: '#bcbebe',
        rowHoverBg: '#e2f2fd',
      },
      Badge: {
        colorError: '#178FE2',
      },
      Tooltip: {
        colorBgSpotlight: '#178FE2',
      },
      Collapse: {
        headerBg: '#fff',
        contentBg: '#fff',
      },
    },
  },
};

notification.config({
  maxCount: 5,
  placement: 'topRight',
});

export default antdDefaultConfig;
