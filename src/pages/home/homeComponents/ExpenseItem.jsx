import "./ExpenseItem.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { expenseSliceActions } from "../../../store/Expenses";
const ExpenseItem = (props) => {
  const expense = useSelector((state)=>state.expense.expenses);
  const dispatch = useDispatch()
  return (
    <>
      <div className="prime-div">
        {expense.map((item) => (
          <div key={item.id} className="expense-header">
            <div>
              <h4>Category : {item.category}</h4>
              <p className="description">description : {item.description}</p>
            </div>
            <div>
              <p>Amount :</p>
              <span>$ {item.amount}</span>
              <div className="delete-edit">
                <button onClick={()=>props.onDeleteExpense(item.id)}>Delete</button>
                <button onClick={()=>dispatch(expenseSliceActions.editExpense(item.id))}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default ExpenseItem;
