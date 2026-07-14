import React, { useEffect, useState } from "react";
import Welcome from "./homeComponents/Welcome";
import UpdateDetails from "./homeComponents/UpdateDetails";
import AddExpenses from "./homeComponents/AddExpenses";
import ExpenseItem from "./homeComponents/ExpenseItem";
const HomePage = () => {
  const [completeProfile, setCompleteProfile] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [editedItems, setEditedItems] = useState(null);
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
  const profileChangeHandler = () => {
    setCompleteProfile(true);
  };
  const expenseAddHandler = (id, expense) => {
    setExpenses((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === id);
      const existingItem = prev[existingIndex];
      if (existingItem) {
        const updatedItems = [...prev];
        updatedItems[existingIndex] = expense;
        console.log("edited items edited")
        return updatedItems;
      } else {
        return [...prev, expense];
      }
    });
  };
  const deleteFromStoreHandler = async (id) => {
    try {
      const deleteResponse = await fetch(
        `https://expense-tracker-142c9-default-rtdb.firebaseio.com/expenseData/${id}.json`,
        {
          method: "DELETE",
        },
      );
      if (!deleteResponse.ok) {
        throw new Error("Delete failed");
      }
      console.log("delete data successfully");
    } catch (err) {
      console.log(err.message);
    }
  };
  const expenseDeleteHandler = (id) => {
    const expenseToDelete = expenses.filter((item) => item.id !== id);
    setExpenses(expenseToDelete);
    deleteFromStoreHandler(id);
  };
  const editFromStoreHandler = async (id, data) => {
    try {
      const editResponse = await fetch(
        `https://expense-tracker-142c9-default-rtdb.firebaseio.com/expenseData/${id}.json`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!editResponse.ok) {
        throw new Error("failed to edit");
      }
      console.log("successfully edited");
      expenseAddHandler(id, data);
    } catch (err) {
      console.log(err.message);
    }
  };
  const expenseEditHandler = (id) => {
    const editData = expenses.find((item) => item.id == id);
    setEditedItems(editData);
  };
  return (
    <>
      {completeProfile ? (
        <UpdateDetails />
      ) : (
        <>
          <Welcome onChangeProfile={profileChangeHandler} />
          <AddExpenses
            onSaveExpense={expenseAddHandler}
            edit={editedItems}
            onEditExpense={editFromStoreHandler}
          />
          <ExpenseItem
            expense={expenses}
            onDeleteExpense={expenseDeleteHandler}
            onEditExpense={expenseEditHandler}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
