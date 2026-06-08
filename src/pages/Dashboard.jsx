import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import PageLayout from "../components/PageLayout";
import { Link } from "react-router-dom";

function Dashboard() {
    const { transactions } =
        useContext(ExpenseContext);

    const income = transactions
        .filter((t) => t.type === "income")
        .reduce(
            (sum, t) => sum + t.amount,
            0
        );

    const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce(
            (sum, t) => sum + t.amount,
            0
        );

    const balance = income - expense;

    const currentMonth =
        new Date().getMonth();

    const monthlyTransactions =
        transactions.filter((t) => {
            const date = new Date(t.id);
            return (
                date.getMonth() ===
                currentMonth
            );
        });

    const monthlyIncome =
        monthlyTransactions
            .filter(
                (t) => t.type === "income"
            )
            .reduce(
                (sum, t) =>
                    sum + t.amount,
                0
            );

    const monthlyExpense =
        monthlyTransactions
            .filter(
                (t) => t.type === "expense"
            )
            .reduce(
                (sum, t) =>
                    sum + t.amount,
                0
            );

    const recentTransactions =
        [...transactions]
            .sort((a, b) => b.id - a.id)
            .slice(0, 5);

    const highestExpense =
        transactions
            .filter(
                (t) => t.type === "expense"
            )
            .sort(
                (a, b) =>
                    b.amount - a.amount
            )[0];

    const budget = 40000;

    const percent =
        Math.min(
            Math.round(
                (monthlyExpense / budget) * 100
            ),
            100
        );

    const monthlyExpenseData = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ].map((month, index) => {

        const totalExpense = transactions
            .filter((transaction) => {

                if (transaction.type !== "expense")
                    return false;

                const date = new Date(
                    transaction.id
                );

                return (
                    date.getMonth() === index
                );
            })
            .reduce(
                (sum, transaction) =>
                    sum + transaction.amount,
                0
            );

        return {
            month,
            expense: totalExpense,
        };
    });

    const maxExpense = Math.max(
        ...monthlyExpenseData.map(
            (item) => item.expense
        ),
        1
    );
    return (
        <PageLayout title="DASHBOARD">

            <div className="bg-gradient-to-r from-[#003B7A] to-[#0A4D9B] rounded-[32px] p-8 text-white shadow-xl">

                <div className="flex justify-between items-start">

                    <div>

                        <p className="text-blue-100">
                            Welcome back,
                        </p>

                        <h2 className="text-3xl font-bold mt-1">
                            {JSON.parse(localStorage.getItem("user"))?.name || "User"} 👋
                        </h2>

                    </div>

                    <Link
                        to="/profile"
                        className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold hover:bg-white/30 transition"
                    >
                        {JSON.parse(localStorage.getItem("user"))?.name?.charAt(0) || "U"}
                    </Link>


                </div>

                <div className="mt-8 bg-white/10 rounded-3xl p-6">

                    <p className="text-blue-100">
                        Total Balance
                    </p>

                    <h1 className="text-5xl font-bold mt-2">
                        ₹{balance}
                    </h1>

                    <div className="grid grid-cols-2 gap-6 mt-6">

                        <div>
                            <p className="text-blue-100">
                                Income
                            </p>

                            <h3 className="text-2xl font-bold">
                                ₹{income}
                            </h3>
                        </div>

                        <div>
                            <p className="text-blue-100">
                                Expenses
                            </p>

                            <h3 className="text-2xl font-bold">
                                ₹{expense}
                            </h3>
                        </div>

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-3xl p-6 shadow mt-6">

                <div className="flex justify-between mb-4">

                    <h3 className="font-bold text-xl text-[#003B7A]">
                        Monthly Budget
                    </h3>

                    <span className="font-semibold text-[#003B7A]">
                        {percent}% used
                    </span>

                </div>

                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">

                    <div
                        className="h-full bg-[#003B7A]"
                        style={{
                            width: `${percent}%`,
                        }}
                    />

                </div>

                <div className="flex justify-between mt-3 text-sm text-slate-500">

                    <span>
                        ₹{monthlyExpense} spent
                    </span>

                    <span>
                        ₹{budget} limit
                    </span>

                </div>

            </div> <br />

            <div className="bg-white rounded-3xl p-6 shadow">

                <h3 className="font-bold text-xl text-[#003B7A] mb-6">
                    Spending Trend
                </h3>

                <div className="flex items-end justify-between h-64">

                    {monthlyExpenseData.map((item) => (

                        <div
                            key={item.month}
                            className="flex flex-col items-center"
                        >

                            {/* EXACT EXPENSE AMOUNT */}

                            <span className="text-xs font-bold text-[#003B7A] mb-2">
                                ₹{item.expense}
                            </span>

                            {/* BAR */}

                            <div
                                className="w-12 bg-[#003B7A] rounded-t-xl transition-all duration-500 hover:bg-[#0A4D9B]"
                                style={{
                                    height: `${(item.expense / maxExpense) *
                                        180
                                        }px`,
                                    minHeight: item.expense > 0
                                        ? "10px"
                                        : "0px",
                                }}
                            />

                            {/* MONTH */}

                            <span className="text-sm mt-2 text-slate-500">
                                {item.month}
                            </span>

                        </div>

                    ))}

                </div>

            </div>
            <br />

            <div className="bg-white rounded-3xl p-6 shadow">

                <h3 className="font-bold text-xl text-[#003B7A] mb-6">
                    Top Spending
                </h3>

                {transactions
                    .filter(
                        (t) => t.type === "expense"
                    )
                    .sort(
                        (a, b) =>
                            b.amount - a.amount
                    )
                    .slice(0, 5)
                    .map((item) => (

                        <div
                            key={item.id}
                            className="mb-5"
                        >

                            <div className="flex justify-between mb-2">

                                <span>
                                    {item.category}
                                </span>

                                <span className="font-semibold">
                                    ₹{item.amount}
                                </span>

                            </div>

                            <div className="h-2 bg-slate-200 rounded-full">

                                <div
                                    className="h-full bg-[#003B7A] rounded-full"
                                    style={{
                                        width: `${Math.min(
                                            (item.amount /
                                                highestExpense.amount) *
                                            100,
                                            100
                                        )}%`,
                                    }}
                                />

                            </div>

                        </div>

                    ))}

            </div>
            <br />
            <div className="bg-white rounded-3xl p-6 shadow">

                <div className="flex justify-between mb-6">

                    <h3 className="font-bold text-xl text-[#003B7A]">
                        Recent Transactions
                    </h3>

                </div>

                {recentTransactions.map(
                    (transaction) => (

                        <div
                            key={transaction.id}
                            className="flex items-center justify-between py-4 border-b-1 border-slate-200"
                        >

                            <div>

                                <h4 className="font-semibold text-[#003B7A]">
                                    {transaction.category}
                                </h4>

                                <p className="text-sm text-slate-400">
                                    {
                                        transaction.timestamp
                                    }
                                </p>

                            </div>

                            <span
                                className={`font-bold ${transaction.type ===
                                    "income"
                                    ? "text-green-500"
                                    : "text-red-500"
                                    }`}
                            >
                                {transaction.type ===
                                    "income"
                                    ? "+"
                                    : "-"}
                                ₹
                                {
                                    transaction.amount
                                }
                            </span>

                        </div>

                    )
                )}

            </div>
        </PageLayout>
    );
}

export default Dashboard;