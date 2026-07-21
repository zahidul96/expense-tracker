import "./ExpenseItem.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { expenseSliceActions } from "../../../store/Expenses";
import { CSVLink } from "react-csv";
const ExpenseItem = (props) => {
  const expense = useSelector((state) => state.expense.expenses);
  const dispatch = useDispatch();
  const csvData = expense.map(item => ({
  ...item,
  id: `="${item.id}"` 
}));
  const headers = [
    { label: "ID", key: "id" },
    { label: "CATEGORY", key: "category" },
    { label: "DESCRIPTION", key: "description" },
    { label: "ANOUNT", key: "amount" },
  ];
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
                <button onClick={() => props.onDeleteExpense(item.id)}>
                  Delete
                </button>
                <button
                  onClick={() =>
                    dispatch(expenseSliceActions.editExpense(item.id))
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CSVLink
        data={csvData}
        headers={headers}
        filename="userExpense.csv"
        style={{
          margin: "1rem auto",
          padding: "0.5rem 1rem",
          background: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Download the expenses file.csv
      </CSVLink>
    </>
  );
};
export default ExpenseItem;
