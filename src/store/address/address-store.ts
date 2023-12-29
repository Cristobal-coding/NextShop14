import { IAddress } from "@/interfaces";
import { create } from "zustand"
import { persist } from "zustand/middleware";

interface AddressState {
    address: IAddress,
    setAddress: (address: AddressState['address']) => void,
}

export const useAddressStore = create<AddressState>()(
    persist(

        (set, get) => ({
            address: {},
            // address: {
            //     firstName: undefined,
            //     lastName: undefined,
            //     address: undefined,
            //     address2: undefined,
            //     postalCode: undefined,
            //     city: undefined,
            //     country: undefined,
            //     phone: undefined,
            // },
            setAddress: (address) => {
                set({ address })
            }

        }), { name: 'address-store' }
    )
);