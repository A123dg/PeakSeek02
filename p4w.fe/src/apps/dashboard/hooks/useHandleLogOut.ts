import tokenManager from '@utils/tokenManager';
import { useRouter } from '@tanstack/react-router';
import { LOGIN_ROUTE } from '@/constants'

export const useHandleLogOut = () => {
  const router = useRouter();
  const location = useRouter().state.location;
  // const 
  const handleLogOut = () => {
    tokenManager.removeAccessToken();
    tokenManager.removeRefreshToken();
    router.navigate({
      to: LOGIN_ROUTE + `?redirect=${encodeURIComponent(location.href)}`,
    });
  }
  return { handleLogOut }
}
export default useHandleLogOut;