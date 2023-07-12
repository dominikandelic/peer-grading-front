import { StateCreator, create } from "zustand";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";
import { UserResponse } from "../api/generated";

interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: UserResponse | null;
  set: (auth: any) => void;
}

type AuthPersist = (
  config: StateCreator<AuthState>,
  options: PersistOptions<AuthState>
) => StateCreator<AuthState>;

export const useAuthStore = create<AuthState>(
  (persist as AuthPersist)(
    (set) => ({
      accessToken: "",
      refreshToken: "",
      user: null,
      set: (auth) =>
        set((state) => ({
          ...state,
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
          user: auth.user,
        })),
    }),
    { name: "auth-store" }
  )
);
