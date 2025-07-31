import React, { createContext, useState, useEffect, useContext } from "react";

type DestinationContextType = {
  destination: string | null | undefined;
  setDestination: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  initializeDestination: () => Promise<void>;
};

export const DestinationContext = createContext<
  DestinationContextType | undefined
>(undefined);

export const DestinationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [destination, setDestination] = useState<string | null | undefined>(
    null
  );

  const initializeDestination = async () => {
    setDestination(null);
  };

  useEffect(() => {
    initializeDestination();
  }, []);

  return (
    <DestinationContext.Provider
      value={{
        destination,
        setDestination,
        initializeDestination,
      }}
    >
      {children}
    </DestinationContext.Provider>
  );
};

export const useDestination = () => {
  const context = useContext(DestinationContext);
  if (!context)
    throw new Error("useDestination must be used within DestinationProvider");
  return context;
};
