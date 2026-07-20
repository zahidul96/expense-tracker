import "./AddExpenses.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { expenseSliceActions } from "../../../store/Expenses";
import { useSelector } from "react-redux";
const AddExpenses = (props) => {
  const [description, setDescription]= useState("")
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const editData = useSelector((state)=>state.expense.editData)
  useEffect(()=>{
    if(editData)
    {
      setDescription(editData.description || "")
      setAmount(editData.amount || 0)
      setCategory(editData.category || "")
    }
  }, [editData])
  const expenseStoreHandler = async (data) => {
    try {
      const response = await fetch(
        "https://expense-tracker-142c9-default-rtdb.firebaseio.com/expenseData.json",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
          }
        },
      );
      if(!response.ok){
        throw new Error("failed to expense data")
      }
      const res = await response.json()
      const id = res.name
      dispatch(expenseSliceActions.addExpense({...data, id: id}))
    } catch (err) {
        console.log(err.message)
    }
  };
  
  const addExpenseSubmitHandler = (event) => {
    event.preventDefault();
    const enteredDescription = description
    const enteredAmount = amount
    const enteredCategory = category
    let userData = {
        description : enteredDescription,
        amount : enteredAmount,
        category : enteredCategory
    }
    
    if(editData)
    {
      console.log("props.edit called")
      props.onEditExpense(editData.id,userData)
    }
    else{
      expenseStoreHandler(userData)
    }
    setDescription("")
    setAmount(0)
  };
  return (
    <>
      <div className="main-div">
        <form className="expense-form" onSubmit={addExpenseSubmitHandler}>
          <h3>Add your expenses</h3>
          <div className="select">
            <p>Choose expense category :</p>
            <select onChange={(e)=>setCategory(e.target.value)}>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
              <option value="Education">Education</option>
            </select>
          </div>
          <div className="description">
            <label htmlFor="description">Description</label>
            <input type="text" id="description" onChange={(e)=>setDescription(e.target.value)} value={description} />
          </div>
          <div className="amount">
            <label htmlFor="amount">Amount</label>
            <input type="number" onChange={(e)=>setAmount(e.target.value)} value={amount}/>
          </div>
          <div className="button">
            <button type="submit">Add Expenses</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddExpenses;