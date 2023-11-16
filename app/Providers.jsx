"use client";

import React, { useState } from 'react';
import { createContext } from "react";

export const ThemeContext = createContext(null);
function Providers( {children}) {
    const [isDark, setIsDark] = useState(true);
    return (
        <div className={isDark ? 'dark' : ""}>
            <ThemeContext.Provider value={{ isDark , setIsDark }}>{children}</ThemeContext.Provider>
        </div>
    );
}

export default Providers;