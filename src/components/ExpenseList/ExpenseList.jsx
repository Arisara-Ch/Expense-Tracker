import React from "react";
import ExpenseItem from "./ExpenseItem/ExpenseItem";
import "./ExpenseList.css";

function ExpenseList(props) {
    const expenseList = props.expenseList;
    const currentYear = props.currentYear;
    const filterExpense = expenseList.filter(
        (t) => t.dueDate.getFullYear() === Number(currentYear)
    );

    return (
        <div className="tdl-container">
            {filterExpense.map((e) => (
                <ExpenseItem
                    id={e.id}
                    key={e.id}
                    category={e.category}
                    dueDate={e.dueDate}
                    isFinished={e.isFinished}
                    expenseType={e.expenseType}
                    paymentType={e.paymentType}
                    editHandler={props.editHandler}
                    deleteHandler={props.deleteHandler}
                />
            ))}
        </div>
    );
}

export default ExpenseList;
