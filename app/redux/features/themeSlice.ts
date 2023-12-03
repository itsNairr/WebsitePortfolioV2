import { createSlice } from '@reduxjs/toolkit';


export const theme = createSlice({ 
    name: 'theme',
    initialState: { isDark: typeof window !== 'undefined' ? localStorage.getItem('isDark') === 'false' ? false : true : true},
    reducers: {
        toggleTheme: (state) => {
            const newTheme = !state.isDark;
            localStorage.setItem('isDark', String(newTheme));
            return {
                isDark: newTheme
            }
        }
    }
})

export const { toggleTheme } = theme.actions
export default theme.reducer;