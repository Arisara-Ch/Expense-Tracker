import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import NewExpense from "./components/NewExpense/NewExpense";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import { HandlerContext } from "./components/contexts/handler-context";

let count = 4;

function uniqueId() {
  count = count + 1;
  return count;
}
const INITIAL_EXPENSE = [
  {
    id: 1,
    category: "...",
    dueDate: new Date("2023-02-28"),
    isFinished: false,
    expenseType: "income",
    paymentType: "cash",
  },
  {
    id: 2,
    category: "...",
    dueDate: new Date("2024-06-14"),
    isFinished: true,
    expenseType: "income",
    paymentType: "cash",
  },
  {
    id: 3,
    category: "...",
    dueDate: new Date("2023-05-20"),
    isFinished: true,
    expenseType: "income",
    paymentType: "cash",
  },
  {
    id: 4,
    category: "...",
    dueDate: new Date("2024-07-26"),
    isFinished: true,
    expenseType: "income",
    paymentType: "cash",
  },
];

function reducer(expenseList, action) {
  switch (action.type) {
    case "add_expense":
      return [...expenseList, action.newItem];
    case "delete_expense":
      return expenseList.filter((e) => e.id !== action.deleteId);
    case "edit_expense":
      const newExpenseList = [...expenseList];

      const index = expenseList.findIndex((e) => e.id === action.editId);
      newExpenseList[index] = { ...action.expense };

      return newExpenseList;
    default:
  }
}

function App() {
  const [expenseList, dispatch] = useReducer(reducer, {}, () => {
    const localExpense = localStorage.getItem("expenses");
    if (localExpense === null) {
      return INITIAL_EXPENSE;
    }

    return JSON.parse(localExpense).map((e) => {
      return {
        ...e,
        dueDate: new Date(e.dueDate),
      };
    });
  });

  const [currentYear, setCurrentYear] = useState("2023");
  const [isShow, setIsShow] = useState(false);

  // const showNewExpenseForm = () => {
  //   setIsShow(true);
  // };

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenseList));
  }, [expenseList]);

  const addNewExpense = (newExpense) => {
    const newExpenseItem = {
      ...newExpense,
      id: uniqueId(),
    };

    dispatch({
      type: "add_expense",
      newItem: newExpenseItem,
    });

    setIsShow(false);
  };

  const deleteHandler = (id) => {
    dispatch({
      type: "delete_expense",
      deleteId: id,
    });
  };

  const editHandler = (id, expense) => {
    dispatch({
      type: "edit_expense",
      editId: id,
      expense: expense,
    });
  };

  return (
    <HandlerContext.Provider value={{
      addNewExpense: addNewExpense,
      editHandler: editHandler,
      deleteHandler: deleteHandler,
    }}>
      <div className="App">
        <Header value={currentYear} onChange={(e) => setCurrentYear(e.target.value)} />
        {isShow ? (
          <NewExpense setIsShow={setIsShow} />
        ) : (
          //<div style={{ marginTop: "10px" }}>
          //  <button onClick={showNewExpenseForm}>Add new Expense</button>
          //</div>
          <div style={{ marginTop: "10px" }}>
            <button onClick={() => setIsShow(true)}>Add new Expense</button>
          </div>
        )}
        <ExpenseList
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          currentYear={currentYear}
          expenseList={expenseList}
        />
      </div>
    </HandlerContext.Provider>
  );
}

export default App;
