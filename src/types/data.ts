export interface ListItem {
  key: number;
  value: string;
}

export interface CheckboxItem extends ListItem {
  checked?: boolean; // 체크 여부
  disabled?: boolean; // 비활성화 여부
  required?: boolean; // 필수 여부
}
