import { create } from "zustand";

type TestStoreState = {
    isOpenDrawer: boolean;
    drawerType: string;
    filterData: { key: string, label: string, value: number[], type: string }[];
}

type TestStoreActions = {
    setIsOpenDrawer: (isOpen: boolean) => void;
    setDrawerType: (type: string) => void;
    setFilterData: (data: { key: string, label: string, value: number[], type: string }[]) => void;
    resetFilterData: () => void;
}

type TestStore = TestStoreState & TestStoreActions;

// 초기값
const initialState: TestStoreState = {
    // drawer 노출 여부
    isOpenDrawer: false,
    // drawer type
    drawerType: "default",
    // filter data
    filterData: [
        {
            key: "location",
            label: '지역선택',
            value: [],
            type: 'button'
        }, 
        {
            key: "checkup",
            label: '희망검사',
            value: [],
            type: 'checkbox'
        }
    ],
} 

export const useTestStore = create<TestStore>((set) => ({
    ...initialState,
    setIsOpenDrawer: (isOpen: boolean) => set({ isOpenDrawer: isOpen }),
    setDrawerType: (type: string) => set({ drawerType: type }),
    setFilterData: (data: { key: string, label: string, value: number[], type: string}[]) => set({ filterData: data }),
    // 필터 데이터 초기화
    resetFilterData: () => set({ filterData: initialState.filterData})
}));