import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Auth"
import ExpenseSliceReducer from "./Expenses"
import  ThemeSliceReducer  from "./Theme";
const store = configureStore({
    reducer : {auth : AuthSliceReducer, expense : ExpenseSliceReducer, theme : ThemeSliceReducer}
})
export default store;