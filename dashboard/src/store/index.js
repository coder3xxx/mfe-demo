import { create } from 'zustand';

const useLogin = (set) => ({
  userInfo: {},
  isAuth: true,
  setUserInfo: data => set({ userInfo: data }),
  setIsAuth: data => set({ isAuth: data }),
});

export const useStore = create(
  (set, get) => ({
    ...useLogin(set, get),
  }),
);