'use client';
import { createContext, useContext, useState } from 'react';

const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const variableContext = 'hola soy la variable';

  return (
    <AccountContext.Provider
      value={{
        selectedAccount,
        setSelectedAccount,
        variableContext,
        currentAccount,
        setCurrentAccount
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount debe ser usado dentro de un AccountProvider');
  }
  return context;
}
