import "./ExpenseItem.css";
const ExpenseItem = (props) => {
  return (
    <>
      <div className="prime-div">
        {props.expense.map((item) => (
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
                <button onClick={()=>props.onEditExpense(item.id)}>Edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default ExpenseItem;
