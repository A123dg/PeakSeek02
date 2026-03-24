import { App } from 'antd';
import { useLogin } from '@apps/auth/services';
import type { TLoginRequest } from '@apps/auth/services';
import tokenManager from '@utils/tokenManager';
import { handleRedirect } from "@shared/utils";

export const useHandleLogin = () => {
  const { mutate: login, isLoading } = useLogin();
  const { notification } = App.useApp();
  /** show lỗi khi đăng nhập */
  const handleShowError = (msg: string) => {
    notification.error({
      message: 'Thất bại!',
      description: msg,
    });
  }
  /** lưu token và refresh token vào local storage */
  const handleSaveToken = (accessToken: string, refreshToken: string) => {
    tokenManager.setAccessToken(accessToken);
    tokenManager.setRefreshToken(refreshToken);
  }
  
  const handleSubmit = (values:TLoginRequest) => {
    login(values, {
      onSuccess: (response) => {
        if(!response.success || response.data == null) {
          handleShowError(response.message);
          return
        }
        handleSaveToken(response?.data?.accessToken, response?.data?.refreshToken);
        handleRedirect();
      },
      onError: (error) => {
        console.log("LOGIN ERR::", error)
      }
    })
  }

  return {
    isLoading,
    handleSubmit
  }
}
export default useHandleLogin;