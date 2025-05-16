import { createContext } from "react";

export const HandlerContext = createContext({
    addNewExpense: (newExpense) => { },
    deleteHandler: (id) => { },
    editHandler: (id, expense) => { },
});