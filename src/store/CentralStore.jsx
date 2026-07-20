import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Auth"
import ExpenseSliceReducer from "./Expenses"
const store = configureStore({
    reducer : {auth : AuthSliceReducer, expense : ExpenseSliceReducer}
})
export default store;