import { createSlice } from "@reduxjs/toolkit";
const themeSlice = createSlice({
    name : 'theme',
    initialState : {isDarkMode : false},
    reducers : {
        setTheme(state){
            console.log(state.isDarkMode)
          state.isDarkMode = !state.isDarkMode
        }
    }
})
export const themeSliceActions = themeSlice.actions;
export default themeSlice.reducer;