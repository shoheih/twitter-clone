export interface ToggleContentProps {
  toggle: (func: () => void) => JSX.Element;
  content: (func: () => void) => JSX.Element;
}
