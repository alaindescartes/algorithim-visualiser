import { createContext, useState, JSX } from "react";

interface controllerType {
  size: number;
  url: string;
  isSorting: boolean;
  currentSelection: string;
  setController: React.Dispatch<React.SetStateAction<controllerType>>;
}
export const ControllerContext = createContext<controllerType>({
  size: 0,
  url: "",
  currentSelection: "",
  isSorting: false,
  setController: () => {},
});

function ControllerContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [controller, setController] = useState<controllerType>({
    size: 20,
    url: "",
    currentSelection: "",
    isSorting: false,
    setController: () => {},
  });
  console.log("controller", controller);
  return (
    <ControllerContext.Provider value={{ ...controller, setController }}>
      {children}
    </ControllerContext.Provider>
  );
}

export default ControllerContextProvider;
