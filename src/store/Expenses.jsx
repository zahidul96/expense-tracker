import { createSlice } from "@reduxjs/toolkit";
const initialExpensesState = { expenses: [], editData: null, totalExpenses: 0 };
const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpensesState,
  reducers: {
    addExpense(state, action) {
      const existingIndex = state.expenses.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (existingIndex !== -1) {
        const existingItem = state.expenses[existingIndex];
        state.expenses[existingIndex] = action.payload;
        state.totalExpenses =
          state.totalExpenses -
          Number(existingItem.amount) +
          Number(action.payload.amount);
      } else {
        state.expenses.push(action.payload);
        state.totalExpenses =
          state.totalExpenses + Number(action.payload.amount);
      }
    },
    deleteExpense(state, action) {
      const itemToDelete = state.expenses.find(
        (item) => item.id == action.payload,
      );
      if (itemToDelete) {
        state.totalExpenses = state.totalExpenses - Number(itemToDelete.amount);
      }
      state.expenses = state.expenses.filter(
        (item) => item.id !== action.payload,
      );
      console.log(state.expenses);
    },
    editExpense(state, action) {
      state.editData = state.expenses.find((item) => item.id == action.payload);
      console.log(state.editData);
    },
    setExpenses(state, action) {
      const loadedExpenses = action.payload || [];
      state.expenses = loadedExpenses;

      state.totalExpenses = loadedExpenses.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0,
      );
    }
  },
});
export const expenseSliceActions = expenseSlice.actions;
export default expenseSlice.reducer;
