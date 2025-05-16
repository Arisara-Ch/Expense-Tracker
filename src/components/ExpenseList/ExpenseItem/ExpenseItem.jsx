import React, { useContext, useState } from "react";
import "./ExpenseItem.css";
import { HandlerContext } from "../../contexts/handler-context";

function ExpenseItem(props) {
    const ctx = useContext(HandlerContext);
    const [checkbox, setCheckbox] = useState(props.isFinished);
    const [isEdit, setIsEdit] = useState(false);
    const [currentCategory, setCurrentCategory] = useState("");
    const [currentDate, setCurrentDate] = useState();
    const [expenseType, setExpenseType] = useState("income");
    const [paymentType, setPaymentType] = useState("cash");

    const dueDate = props.dueDate;
    const date = dueDate.getDate();
    const month = dueDate.getMonth() + 1;
    const year = dueDate.getFullYear();

    const formatDate = (date, month, year) => {
        const formattedDate = `${String(date).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
        return formattedDate;
    };

    const resolveDueDate = (date, month, year) => {
        let convertedDate, convertedMonth

        if (String(date).length === 1) {
            convertedDate = "0" + date;
        } else {
            convertedDate = String(date);
        }

        if (String(month).length === 1) {
            convertedMonth = "0" + month;
        } else {
            convertedMonth = String(month);
        }

        return `${year}-${convertedMonth}-${convertedDate}`;
    };

    const onClickEdit = () => {
        setIsEdit(true);
        setCurrentCategory(props.category);
        setCurrentDate(resolveDueDate(date, month, year));
        setExpenseType(props.expenseType);
        setPaymentType(props.paymentType);
        //const dateToSet = resolveDueDate(date, month, year);
        //setCurrentDate(dateToSet);
    };

    const onClickDone = () => {
        const editValues = {
            id: props.id,
            category: currentCategory,
            dueDate: new Date(currentDate),
            isFinished: checkbox,
            expenseType: expenseType,
            paymentType: paymentType,
        }
        setIsEdit(false);
        console.log(props.id)
        ctx.editHandler(props.id, editValues);
    };

    if (isEdit) {
        return (
            <div className="form-control">
                <div className="cb-container">
                    <input
                        checked={checkbox}
                        onChange={(e) => setCheckbox(e.target.checked)}
                        type="checkbox"
                    />
                </div>
                <div className="tn-container">
                    <input
                        value={currentCategory}
                        onChange={(e) => setCurrentCategory(e.target.value)}
                    />
                </div>
                <div className="dd-container">
                    <input value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} type="date" />
                </div>
                <div className="et-container">
                    <select value={expenseType} onChange={(e) => setExpenseType(e.target.value)}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
                <div className="pt-container">
                    <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                        <option value="cash">Cash</option>
                        <option value="credit">Credit Card</option>
                        <option value="debit">Debit Card</option>
                    </select>
                </div>
                <div className="ed-container">
                    <button onClick={onClickDone} className="done-button">Done</button>
                </div>
                <div className="dl-container">
                    <button onClick={() => ctx.deleteHandler(props.id)} className="delete-button">Delete</button>
                </div>
            </div>
        )
    }

    return (
        <div className="form-control">
            <div className="cb-container">
                <input
                    checked={checkbox}
                    onChange={(e) => setCheckbox(e.target.checked)}
                    type="checkbox"
                />
            </div>
            <div className="tn-container">{props.category}</div>
            <div className="dd-container">
                {formatDate(date, month, year)}
            </div>
            <div className="et-container">{props.expenseType}</div>
            <div className="pt-container">{props.paymentType}</div>
            <div className="ed-container">
                <button onClick={onClickEdit} className="edit-button">Edit</button>
            </div>
            <div className="dl-container">
                <button onClick={() => ctx.deleteHandler(props.id)} className="delete-button">Delete</button>
            </div>
        </div>
    );
}

export default ExpenseItem;
