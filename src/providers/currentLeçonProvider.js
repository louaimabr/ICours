import React, {createContext, useState} from 'react';
export const CurrentLeconContext = createContext();

const CurrentLeçonProvider = ({children}) => {
    const [currentLeçon, setCurrentLeçon] = useState({})
    return (
        <CurrentLeconContext.Provider value={{currentLeçon, setCurrentLeçon}}>{children}</CurrentLeconContext.Provider>
    );
};

export default CurrentLeçonProvider;