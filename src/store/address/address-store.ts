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
            // address: {},
            address: {
                firstName: '',
                lastName: '',
                address: '',
                address2: '',
                postalCode: '',
                city: '',
                country: '',
                phone: '',
            },
            setAddress: (address) => {
                set({ address })
            }

        }), { name: 'address-store' }
    )
);