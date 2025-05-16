import React, { useContext, useState } from "react";
import "./NewExpense.css";
import { HandlerContext } from "../contexts/handler-context";

function NewExpense(props) {
  const ctx = useContext(HandlerContext);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("cash");
  const [date, setDate] = useState("");
  const [expenseType, setExpenseType] = useState("income");

  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };

  const expenseTypeHandler = (event) => {
    setExpenseType(event.target.value);
  };

  const amountHandler = (event) => {
    setAmount(event.target.value);
  };

  const paymentTypeHandler = (event) => {
    setPaymentType(event.target.value);
  };

  const dueDateHandler = (event) => {
    setDate(event.target.value);
  };

  const clickHandler = () => {
    const newExpense = {
      category: category,
      amount: amount,
      paymentType: paymentType,
      expenseType: expenseType,
      dueDate: new Date(date),
    };

    ctx.addNewExpense(newExpense);
    props.setIsShow(false);

    setCategory("");
    setAmount("");
    setPaymentType("cash");
    setExpenseType("income");
    setDate("");
  };

  return (
    <div className="add-container">
      <div className="row-container">
        <div className="input-container">
          <div>
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={categoryHandler}
            />
            <label>Type</label>
            <select value={expenseType} onChange={expenseTypeHandler}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={amountHandler}
            />
            <label>Payment</label>
            <select value={paymentType} onChange={paymentTypeHandler}>
              <option value="cash">Cash</option>
              <option value="credit">Credit Card</option>
              <option value="debit">Debit Card</option>
            </select>
          </div>

          <div>
            <label>Due Date</label>
            <input type="date" value={date} onChange={dueDateHandler} />
          </div>
        </div>

        <div className="button-container">
          <button onClick={clickHandler}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default NewExpense;
