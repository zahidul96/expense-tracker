import React, { useEffect, useState } from "react";
import Welcome from "./homeComponents/Welcome";
import UpdateDetails from "./homeComponents/UpdateDetails";
import AddExpenses from "./homeComponents/AddExpenses";
import ExpenseItem from "./homeComponents/ExpenseItem";
const HomePage = () => {
  const [completeProfile, setCompleteProfile] = useState(false);
  const inititalExpenses = async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-142c9-default-rtdb.firebaseio.com/expenseData.json",
        {
          method: "GET",
        },
      );
      if (!response.ok) {
        throw new Error("no data found");
      }
      const data = await response.json();
      const loadedExpenses = [];
      for (const key in data) {
        loadedExpenses.push({
          id: key,
          description: data[key].description,
          amount: data[key].amount,
          category: data[key].category,
        });
      }
      setExpenses(loadedExpenses);
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    inititalExpenses();
  }, []);
  const [expenses, setExpenses] = useState([]);
  const profileChangeHandler = () => {
    setCompleteProfile(true);
  };
  const expenseAddHandler = (expense) => {
    setExpenses((prev) => {
      return [...prev, expense];
    });
  };
  return (
    <>
      {completeProfile ? (
        <UpdateDetails />
      ) : (
        <>
          <Welcome onChangeProfile={profileChangeHandler} />
          <AddExpenses onSaveExpense={expenseAddHandler} />
          <ExpenseItem expense={expenses} />
        </>
      )}
    </>
  );
};

export default HomePage;
