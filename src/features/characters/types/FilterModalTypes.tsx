export interface Section {
  title: string;
  content: React.ReactNode;
}

export interface FilterModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  onReset: () => void;
  onApply: () => void;
  sections: Section[];
}
