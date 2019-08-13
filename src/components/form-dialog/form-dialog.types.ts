export interface FormDialogData {
  title: string;
  content: React.ReactNode;
  isShowing: boolean;
  toggle: () => void;
}
