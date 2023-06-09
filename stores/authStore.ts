import { StateCreator, create } from "zustand";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";

interface AuthState {
  accessToken: string;
  refreshToken: string;
  username: string;
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
      username: "",
      set: (auth) =>
        set({
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
          username: auth.username,
        }),
    }),
    { name: "auth-store" }
  )
);
