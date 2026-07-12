import "./AddExpenses.css";
import React, { useRef } from "react";
const AddExpenses = (props) => {
  const descriptionInputRef = useRef();
  const amountInputRef = useRef();
  const categoryInputRef = useRef();
  const addExpenseSubmitHandler = (event) => {
    event.preventDefault();
    const enteredDescription = descriptionInputRef.current.value;
    const enteredAmount = amountInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;
    props.onSaveExpense({
      description: enteredDescription,
      amount: enteredAmount,
      category: enteredCategory,
    });
    descriptionInputRef.current.value = "";
    amountInputRef.current.value = "";
  };
  return (
    <>
      <div className="main-div">
        <form className="expense-form" onSubmit={addExpenseSubmitHandler}>
          <h3>Add your expenses</h3>
          <div className="select">
            <p>Choose expense category :</p>
            <select ref={categoryInputRef}>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
              <option value="Education">Education</option>
            </select>
          </div>
          <div className="description">
            <label htmlFor="description">Description</label>
            <input type="text" id="description" ref={descriptionInputRef} />
          </div>
          <div className="amount">
            <label htmlFor="amount">Amount</label>
            <input type="number" ref={amountInputRef} />
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
