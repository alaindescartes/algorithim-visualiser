import React, { createContext, JSX, useState } from "react";

export const ArrayContext = createContext<{
  array: number[];
  setNewArray: React.Dispatch<React.SetStateAction<number[]>>;
}>({
  array: [],
  setNewArray: () => {},
});

function ArrayContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [array, setNewArray] = useState<number[]>([]);

  return (
    <ArrayContext.Provider value={{ array, setNewArray }}>
      {children}
    </ArrayContext.Provider>
  );
}

export default ArrayContextProvider;
