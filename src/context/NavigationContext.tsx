import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext<{ routeName: string; setRouteName: (name: string) => void } | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [routeName, setRouteName] = useState('Home'); // Default route

  return (
      <NavigationContext.Provider value={{ routeName, setRouteName }}>
        {children}
      </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationContext must be used within a NavigationProvider');
  }
  return context;
};
