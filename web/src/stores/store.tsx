

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface StoreState {
  userData: any;
  setUserData: (user: any) => void;

}

export const useGlobalStore = create<StoreState>()(
  devtools((set, get) => ({
    devtools: false,

    userData: {},
    setUserData: (user) => set({ userData: user }),
  }))
);
