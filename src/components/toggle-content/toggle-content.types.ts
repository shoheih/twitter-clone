export interface ToggleContentProps {
  toggle: (showFunc: () => void, hideFunc: () => void) => JSX.Element;
  content: (func: () => void) => JSX.Element;
}
