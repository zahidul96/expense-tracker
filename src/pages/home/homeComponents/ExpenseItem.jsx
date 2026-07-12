import "./ExpenseItem.css";
const ExpenseItem = (props) => {
  console.log(props.expense);
  return (
    <>
      <div className="prime-div">
        {props.expense.map((item) => (
          <div className="expense-header">
            <div>
              <h4>Category : {item.category}</h4>
              <p className="description">description : {item.description}</p>
            </div>
            <div>
              <p>Amount :</p>
              <span>$ {item.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default ExpenseItem;
