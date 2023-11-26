import { createSlice } from '@reduxjs/toolkit';

export const theme = createSlice({ 
    name: 'theme',
    initialState: { isDark: true },
    reducers: {
        toggleTheme: (state) => {
            return {
                isDark: !state.isDark
            }
        }
    }
})

export const { toggleTheme } = theme.actions
export default theme.reducer;