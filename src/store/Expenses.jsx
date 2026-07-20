import { createSlice } from "@reduxjs/toolkit";
const initialExpensesState = { expenses: [], editData: null };
const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpensesState,
  reducers: {
    addExpense(state, action) {
      const existingIndex = state.expenses.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (existingIndex !== -1) {
        state.expenses[existingIndex] = action.payload;
      } else {
        state.expenses.push(action.payload);
      }
    },
    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(
        (item) => item.id !== action.payload,
      );
      console.log(state.expenses);
    },
    editExpense(state, action) {
      state.editData = state.expenses.find((item) => item.id == action.payload);
      console.log(state.editData);
    },
  },
});
export const expenseSliceActions = expenseSlice.actions;
export default expenseSlice.reducer;
