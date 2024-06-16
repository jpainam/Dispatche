import { atom, useAtomValue, useSetAtom } from "jotai";

type BottomSheetTypes = {
    component: React.ReactNode;
    isOpen: boolean;
    snapPoints: string[];
}

const bottomSheetAtom = atom<BottomSheetTypes>({
    isOpen: false,
    component: null,
    snapPoints: ["40%"],
} );

export function useBottomSheet(){
    const state = useAtomValue(bottomSheetAtom);
    const setState = useSetAtom(bottomSheetAtom);

    const openBottomSheet = ({component, snapPoints}: {component: React.ReactNode, snapPoints: string[]}) => {
        setState({ ...state, component, isOpen: true, snapPoints });
    }

    const closeBottomSheet = () => {
        setState({ ...state, isOpen: false, snapPoints: ["40%"] });
    }

    return {
        ...state,
        openBottomSheet,
        closeBottomSheet,
    }
}