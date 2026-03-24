import { lcStorage } from '@utils/storage';
import { LOCAL_STORAGE_KEYS } from '@constants/storageKeys';

const tokenManager = () => { 
  let accessToken: string | undefined = lcStorage.get(LOCAL_STORAGE_KEYS.accessToken);
  let refreshToken: string | undefined = lcStorage.get(LOCAL_STORAGE_KEYS.refreshToken);

  const getAccessToken = (): string | undefined => {
    return accessToken;
  };

  const setAccessToken = (token: string): void => {
    accessToken = token;
    lcStorage.set(LOCAL_STORAGE_KEYS.accessToken, accessToken);
  };

  const removeAccessToken = (): void => {
    accessToken = undefined;
    localStorage.removeItem(LOCAL_STORAGE_KEYS.accessToken);
  };

  const getRefreshToken = () => {
    return refreshToken;
  };

  const setRefreshToken = (token: string): void => {
    refreshToken = token;
    lcStorage.set(LOCAL_STORAGE_KEYS.refreshToken, refreshToken);
  };

  const removeRefreshToken = (): void => {
    refreshToken = undefined;
    localStorage.removeItem(LOCAL_STORAGE_KEYS.refreshToken);
  };

  return {
    getAccessToken,
    setAccessToken,
    removeAccessToken,
    getRefreshToken, 
    setRefreshToken,
    removeRefreshToken
  }
}

export default tokenManager();