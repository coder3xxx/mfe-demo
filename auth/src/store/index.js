import { create } from 'zustand';

const useLogin = (set) => ({
  userInfo: {},
  setUserInfo: data => set({ userInfo: data }),
});

export const useStore = create(
  (set, get) => ({
    ...useLogin(set, get),
  }),
);