import React, { createContext, useContext } from 'react';

interface IModalContext {
  onClose(): void;
}

const ModalContext = createContext({} as IModalContext);

interface ModalProviderProps {
  onClose(): void;
}

export const ModalProvider: React.FC<React.PropsWithChildren<ModalProviderProps>> = ({ children, onClose }) => {
  return <ModalContext.Provider value={{ onClose }}>{children}</ModalContext.Provider>;
};

export default function useModal(): IModalContext {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error('Modal context must be used within a provider');
  }

  return modalContext;
}
