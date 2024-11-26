import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(false);

  return (
    <StateContext.Provider
      value={{
        isTrailerOpen,
        setIsTrailerOpen,
        isPlaying,
        setIsPlaying,
        progress,
        setProgress,
        isNavVisible,
        setIsNavVisible,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
