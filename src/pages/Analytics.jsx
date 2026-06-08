import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import PageLayout from "../components/PageLayout";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from "recharts";

const COLORS = [
    "#003B7A",
    "#4F7FD8",
    "#F0C75E",
    "#9A86FD",
    "#FF8A65",
    "#26A69A",
    "#66BB6A",
];

function Analytics() {
    const { transactions } = useContext(ExpenseContext);

    const income = transactions
        .filter((item) => item.type === "income")
        .reduce((sum, item) => sum + item.amount, 0);

    const expense = transactions
        .filter((item) => item.type === "expense")
        .reduce((sum, item) => sum + item.amount, 0);

    const balance = income - expense;

    /* --------------------------
       CATEGORY DATA
    --------------------------- */

    const expenseTransactions = transactions.filter(
        (item) => item.type === "expense"
    );

    const categoryTotals = {};

    expenseTransactions.forEach((item) => {
        categoryTotals[item.category] =
            (categoryTotals[item.category] || 0) +
            item.amount;
    });

    const categoryData = Object.keys(categoryTotals).map(
        (category) => ({
            name: category,
            value: categoryTotals[category],
        })
    );

    /* --------------------------
       MONTHLY DATA
    --------------------------- */

    const monthlyData = [
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
        const monthTransactions =
            transactions.filter((transaction) => {
                const date = new Date(transaction.id);
                return date.getMonth() === index;
            });

        const monthlyIncome =
            monthTransactions
                .filter((t) => t.type === "income")
                .reduce((sum, t) => sum + t.amount, 0);

        const monthlyExpense =
            monthTransactions
                .filter((t) => t.type === "expense")
                .reduce((sum, t) => sum + t.amount, 0);

        return {
            month,
            income: monthlyIncome,
            expense: monthlyExpense,
        };
    });

    const bestIncomeMonth = Math.max(
        ...monthlyData.map((m) => m.income)
    );

    const highestExpenseMonth = Math.max(
        ...monthlyData.map((m) => m.expense)
    );

    return (
        <PageLayout title="ANALYTICS">

            {/* SUMMARY CARDS */}

            <div className="grid md:grid-cols-3 gap-6 mb-8">

                <div className="bg-white rounded-3xl shadow p-6">
                    <p className="text-slate-500">
                        Total Income
                    </p>

                    <h2 className="text-4xl font-bold text-green-600 mt-2">
                        ₹{income}
                    </h2>
                </div>

                <div className="bg-white rounded-3xl shadow p-6">
                    <p className="text-slate-500">
                        Total Expense
                    </p>

                    <h2 className="text-4xl font-bold text-red-500 mt-2">
                        ₹{expense}
                    </h2>
                </div>

                <div className="bg-white rounded-3xl shadow p-6">
                    <p className="text-slate-500">
                        Balance
                    </p>

                    <h2 className="text-4xl font-bold text-[#003B7A] mt-2">
                        ₹{balance}
                    </h2>
                </div>

            </div>

            {/* EXPENSE BREAKDOWN */}

            <div className="bg-white rounded-3xl shadow p-10">

                <h2 className="text-3xl font-bold text-[#003B7A] mb-10">
                    Expense Breakdown
                </h2>

                {categoryData.length === 0 ? (

                    <div className="h-[400px] flex items-center justify-center text-slate-500">
                        No Expense Data Available
                    </div>

                ) : (

                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* LEFT SIDE */}

                        <div className="h-[350px]">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <PieChart>

                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={90}
                                        outerRadius={130}
                                        paddingAngle={4}
                                        dataKey="value"
                                    >

                                        {categoryData.map(
                                            (entry, index) => (

                                                <Cell
                                                    key={index}
                                                    fill={
                                                        COLORS[
                                                        index %
                                                        COLORS.length
                                                        ]
                                                    }
                                                />

                                            )
                                        )}

                                    </Pie>

                                    <Tooltip />

                                    <text
                                        x="50%"
                                        y="48%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        style={{
                                            fontSize: "30px",
                                            fontWeight: "700",
                                            fill: "red",
                                        }}
                                    >
                                        ₹{expense}
                                    </text>

                                    <text
                                        x="50%"
                                        y="60%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        style={{
                                            fontSize: "15px",
                                            fill: "#64748b",
                                        }}
                                    >
                                        Total Expense
                                    </text>

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                        {/* RIGHT SIDE */}

                        <div>

                            <h3 className="text-2xl font-bold text-[#003B7A] mb-8">
                                Expense Categories
                            </h3>

                            <div className="space-y-5">

                                {categoryData.map(
                                    (item, index) => (

                                        <div
                                            key={item.name}
                                            className="flex items-center justify-between border-b border-slate-200 pb-5"
                                        >

                                            <div className="flex items-center gap-4">

                                                <div
                                                    className="w-4 h-4 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            COLORS[
                                                            index %
                                                            COLORS.length
                                                            ],
                                                    }}
                                                />

                                                <span className="text-xl font-semibold text-[#003B7A]">
                                                    {item.name}
                                                </span>

                                            </div>

                                            <span className="text-xl font-bold text-slate-700">
                                                ₹{item.value}
                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                        </div>

                    </div>

                )}

            </div>

            {/* MONTHLY SUMMARY */}

            <div className="grid md:grid-cols-3 gap-6 mt-8">

                <div className="bg-white rounded-3xl shadow p-6">
                    <p className="text-slate-500">
                        Best Income Month
                    </p>

                    <h2 className="text-3xl font-bold text-green-600">
                        ₹{bestIncomeMonth}
                    </h2>
                </div>

                <div className="bg-white rounded-3xl shadow p-6">
                    <p className="text-slate-500">
                        Highest Expense Month
                    </p>

                    <h2 className="text-3xl font-bold text-red-500">
                        ₹{highestExpenseMonth}
                    </h2>
                </div>

                <div className="bg-white rounded-3xl shadow p-6">
                    <p className="text-slate-500">
                        Annual Balance
                    </p>

               
                    <h2 className="text-3xl font-bold text-[#003B7A]">
                        ₹{balance}
                    </h2>
                </div>

            </div>

            {/* MONTHLY REPORT */}

            <div className="bg-white rounded-3xl shadow p-8 mt-8">

                <h2 className="text-2xl font-bold text-[#003B7A] mb-6">
                    Monthly Report
                </h2>

                <div className="h-[450px]">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <BarChart data={monthlyData}>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="month" />

                            <YAxis />

                            <Tooltip />

                            <Legend />

                            <Bar
                                dataKey="income"
                                fill="green"
                                radius={[8, 8, 0, 0]}
                            />

                            <Bar
                                dataKey="expense"
                                fill="red"
                                radius={[8, 8, 0, 0]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </PageLayout>
    );
}

export default Analytics;