import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  ApiError,
  loginWithGoogleApi,
  type LoginRequest,
  type RegisterRequest,
  type UserProfile,
  getProfileApi,
  loginApi,
  refreshTokenApi,
  registerApi,
} from "@/services/api";

type Session = {
  accessToken: string;
  refreshToken: string;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  profile: UserProfile | null;
  login: (payload: LoginRequest) => Promise<void>;
  loginWithGoogle: (idToken: string) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<UserProfile | null>;
  authorizedRequest: <T>(handler: (token: string) => Promise<T>) => Promise<T>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const logout = useCallback(() => {
    setSession(null);
    setProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!session?.accessToken) {
      setProfile(null);
      return null;
    }

    const response = await getProfileApi(session.accessToken);
    setProfile(response.data);
    return response.data;
  }, [session?.accessToken]);

  const authorizedRequest = useCallback(async <T,>(handler: (token: string) => Promise<T>) => {
    if (!session?.accessToken) {
      throw new ApiError("Unauthorized", 401);
    }

    try {
      return await handler(session.accessToken);
    } catch (error) {
      if (!(error instanceof ApiError) || error.status !== 401 || !session.refreshToken) {
        throw error;
      }

      const refreshed = await refreshTokenApi(session.refreshToken);
      const nextSession = {
        accessToken: refreshed.data.accessToken,
        refreshToken: refreshed.data.refreshToken,
      };

      setSession(nextSession);
      return handler(nextSession.accessToken);
    }
  }, [session]);

  const login = useCallback(async (payload: LoginRequest) => {
    setIsLoading(true);
    try {
      const response = await loginApi(payload);
      const nextSession = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };

      setSession(nextSession);
      const profileResponse = await getProfileApi(nextSession.accessToken);
      setProfile(profileResponse.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithGoogle = useCallback(async (idToken: string) => {
    setIsLoading(true);
    try {
      const response = await loginWithGoogleApi({ idToken });
      const nextSession = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };

      setSession(nextSession);
      const profileResponse = await getProfileApi(nextSession.accessToken);
      setProfile(profileResponse.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: RegisterRequest) => {
    setIsLoading(true);
    try {
      await registerApi(payload);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!session?.accessToken) {
      setProfile(null);
    }
  }, [session]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: !!session?.accessToken,
      isLoading,
      profile,
      login,
      loginWithGoogle,
      register,
      logout,
      refreshProfile,
      authorizedRequest,
    }),
    [authorizedRequest, isLoading, login, loginWithGoogle, logout, profile, refreshProfile, register, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
