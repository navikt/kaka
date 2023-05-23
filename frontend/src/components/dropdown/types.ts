export interface Option {
  label: string;
  value: string;
}

interface SectionHeader {
  id: string;
  name?: string;
}

export interface OptionGroup {
  sectionHeader: SectionHeader;
  sectionOptions: Option[];
}

export interface CommonGroupedDropdownProps {
  options: OptionGroup[];
  open: boolean;
  close: () => void;
  testId: string;
  maxHeight?: string;
  width?: string;
  anchorEl: HTMLButtonElement | null;
}
