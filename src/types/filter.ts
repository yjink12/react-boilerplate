interface FilterData {
  key: string;
  label: string;
  type: string;
}
interface DistrictFilter extends FilterData {
  value: { key: number; label: string }[];
}
interface CheckupFilter extends FilterData {
  value: number[];
}
export type FilterDataType = DistrictFilter | CheckupFilter;

/** 지역 선택 타입 가드 */
export const isDistrictFilter = (
  data: FilterDataType
): data is DistrictFilter => {
  return data.key === 'district';
};

/** 희망 검사 타입 가드 */
export const isCheckupFilter = (
  data: FilterDataType
): data is CheckupFilter => {
  return data.key === 'checkup';
};
