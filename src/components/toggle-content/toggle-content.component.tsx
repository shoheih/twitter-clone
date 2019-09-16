import React, { useState } from 'react';
import { ToggleContentProps } from './toggle-content.types';

const ToggleContent = ({ toggle, content }: ToggleContentProps) => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);

  return (
    <>
      {toggle(show)}
      {isShown && content(hide)}
    </>
  );
};

export default ToggleContent;
