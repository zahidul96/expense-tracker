import React, { useState } from "react";
import Welcome from "./homeComponents/Welcome";
import UpdateDetails from "./homeComponents/UpdateDetails";
import AddExpenses from "./homeComponents/AddExpenses";
import ExpenseItem from "./homeComponents/ExpenseItem"; 
const HomePage = () => {
  const [completeProfile, setCompleteProfile] = useState(false);
  const [expenses, setExpenses] = useState([])
  const profileChangeHandler = () => {
    setCompleteProfile(true);
  };
  const expenseAddHandler = (expense)=>{
        setExpenses((prev)=>{
           return [...prev, expense]
        })
  }
  return (
    <>
      {completeProfile ? (
        <UpdateDetails />
      ) : (
        <>
          <Welcome onChangeProfile={profileChangeHandler} />
          <AddExpenses onSaveExpense={expenseAddHandler}/>
          <ExpenseItem expense={expenses}/>
        </>
      )}
    </>
  );
};

export default HomePage;
