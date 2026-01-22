import { Button, Flex } from 'antd';
import type { FallbackProps } from 'react-error-boundary';
import ErrorImage from '@assets/images/error-boundary-image.png';
import { Height } from '@/shared/components/global-styled/styled';
import { SESSION_STORAGE_KEYS } from '@constants/storageKeys';
import { ssStorage } from '@utils/index';
import { ContentWrapper, Wrapper } from './styled';
import Text from '@/shared/components/text';

const ErrorFallback = ({ error }: FallbackProps) => {
  //Handle error when deploy new version
  if (error?.name === 'ChunkLoadError') {
    const hasRefresh = ssStorage.get(SESSION_STORAGE_KEYS.retryChunkError) || false;

    if (hasRefresh !== true) {
      ssStorage.set(SESSION_STORAGE_KEYS.retryChunkError, true);
      window.location.reload();
      return null;
    }
  }

  return (
    <Wrapper>
      <Flex gap="4.8rem">
        <img alt="" src={ErrorImage} />
        <ContentWrapper>
          <Text>
            Đã có lỗi xảy ra :(
            <br />
            Vui lòng thử lại sau.
          </Text>
          <Height />
          <Button type="primary" onClick={() => (window.location.href = '/')}>
            Về trang chủ
          </Button>
        </ContentWrapper>
      </Flex>
    </Wrapper>
  )
}
export default ErrorFallback;