import {
    createContext,
    useState,
    useEffect,
} from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {

    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem("transactions");

        return saved
            ? JSON.parse(saved)
            : [];
    });

    const [accounts] = useState([
        {
            id: 1,
            name: "Wallet",
            balance: 5000,
        },
        {
            id: 2,
            name: "Bank",
            balance: 15000,
        },
    ]);

    useEffect(() => {
        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        );
    }, [transactions]);

    const addTransaction = (transaction) => {
        setTransactions((prev) => [
            ...prev,
            transaction,
        ]);
    };

    // FIXED DELETE FUNCTION
    const deleteTransaction = (id) => {
        setTransactions((prev) =>
            prev.filter(
                (transaction) =>
                    transaction.id !== id
            )
        );
    };

    return (
        <ExpenseContext.Provider
            value={{
                transactions,
                addTransaction,
                deleteTransaction,
                accounts,
            }}
        >
            {children}
        </ExpenseContext.Provider>
    );
};