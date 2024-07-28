import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create()(
  persist(
    (set) => ({
      wallet_id: "",
      set_wallet_id: (id) => {
        set({ wallet_id: id });
      },
      wallet_address: "",
      set_wallet_address: (address) => {
        set({ wallet_address: address });
      },
      blockchain: "",
      set_blockchain: (bc) => {
        set({ blockchain: bc });
      },
    }),
    {
      name: "wallet",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
