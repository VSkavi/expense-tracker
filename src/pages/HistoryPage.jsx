import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import PageLayout from "../components/PageLayout";
import { Trash2, Search, Download } from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function HistoryPage() {
    const { transactions, deleteTransaction } =
        useContext(ExpenseContext);

    const [filter, setFilter] = useState("all");
    const [searchCategory, setSearchCategory] =
        useState("");

    const [searchMonth, setSearchMonth] =
        useState("");

    const [startDate, setStartDate] =
        useState("");

    const [endDate, setEndDate] =
        useState("");

    const sortedTransactions = [...transactions].sort(
        (a, b) => b.id - a.id
    );

    const filteredTransactions =
        sortedTransactions.filter((transaction) => {

            const transactionDate =
                new Date(transaction.id);

            const typeMatch =
                filter === "all"
                    ? true
                    : transaction.type === filter;

            const categoryMatch =
                searchCategory === ""
                    ? true
                    : transaction.category
                        .toLowerCase()
                        .includes(
                            searchCategory.toLowerCase()
                        );

            const monthMatch =
                searchMonth === ""
                    ? true
                    : transactionDate.getMonth() + 1 ===
                    Number(searchMonth);

            const startMatch =
                !startDate
                    ? true
                    : transactionDate >=
                    new Date(startDate);

            const endMatch =
                !endDate
                    ? true
                    : transactionDate <=
                    new Date(endDate);

            return (
                typeMatch &&
                categoryMatch &&
                monthMatch &&
                startMatch &&
                endMatch
            );
        });

    const exportCSV = () => {

        const headers =
            "Category,Type,Amount,Description,Date\n";

        const rows =
            filteredTransactions
                .map(
                    (transaction) =>
                        `${transaction.category},
${transaction.type},
${transaction.amount},
${transaction.description || ""},
${transaction.timestamp}`
                )
                .join("\n");

        const csvContent =
            headers + rows;

        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;",
            }
        );

        const link =
            document.createElement("a");

        link.href =
            URL.createObjectURL(blob);

        link.download =
            "transactions.csv";

        link.click();
    };

    const exportPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);

        doc.text(
            "Transaction Report",
            14,
            20
        );

        autoTable(doc, {
            startY: 30,

            head: [[
                "Category",
                "Type",
                "Amount",
                "Description",
                "Date",
            ]],

            body:
                filteredTransactions.map(
                    (transaction) => [
                        transaction.category,
                        transaction.type,
                        `₹${transaction.amount}`,
                        transaction.description || "-",
                        transaction.timestamp,
                    ]
                ),
        });

        doc.save(
            "transaction-report.pdf"
        );
    };

    return (
        <PageLayout title="TRANSACTION HISTORY">

            {/* FILTER BUTTONS */}

            <div className="flex gap-3 mb-6">

                <button
                    onClick={() =>
                        setFilter("all")
                    }
                    className={`px-5 py-2 rounded-xl font-medium transition ${filter === "all"
                            ? "bg-[#003B7A] text-white"
                            : "bg-white text-[#003B7A]"
                        }`}
                >
                    All
                </button>

                <button
                    onClick={() =>
                        setFilter("income")
                    }
                    className={`px-5 py-2 rounded-xl font-medium transition ${filter === "income"
                            ? "bg-green-600 text-white"
                            : "bg-white text-green-600"
                        }`}
                >
                    Income
                </button>

                <button
                    onClick={() =>
                        setFilter("expense")
                    }
                    className={`px-5 py-2 rounded-xl font-medium transition ${filter === "expense"
                            ? "bg-red-500 text-white"
                            : "bg-white text-red-500"
                        }`}
                >
                    Expense
                </button>

            </div>

            {/* SEARCH + EXPORT */}

            <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">

                <div className="flex flex-wrap gap-4 items-center">

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-3 top-3 text-slate-400"
                        />

                        <input
                            type="text"
                            placeholder="Search Category"
                            value={searchCategory}
                            onChange={(e) =>
                                setSearchCategory(
                                    e.target.value
                                )
                            }
                            className="pl-10 pr-4 py-2 border rounded-xl outline-none"
                        />

                    </div>

                    <select
                        value={searchMonth}
                        onChange={(e) =>
                            setSearchMonth(
                                e.target.value
                            )
                        }
                        className="px-4 py-2 border rounded-xl outline-none"
                    >

                        <option value="">
                            All Months
                        </option>

                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>

                    </select>

                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                            setStartDate(
                                e.target.value
                            )
                        }
                        className="px-4 py-2 border rounded-xl"
                    />

                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) =>
                            setEndDate(
                                e.target.value
                            )
                        }
                        className="px-4 py-2 border rounded-xl"
                    />

                    <button
                        onClick={exportPDF}
                        className="flex items-center gap-2 bg-[#003B7A] text-white px-4 py-2 rounded-xl"
                    >
                        <Download size={18} />
                        PDF
                    </button>

                    <button
                        onClick={exportCSV}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl"
                    >
                        <Download size={18} />
                        CSV
                    </button>

                </div>

            </div>

            {/* TRANSACTIONS */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

                {filteredTransactions.length === 0 ? (

                    <div className="text-center py-20">

                        <h2 className="text-2xl font-bold text-[#003B7A]">
                            No Transactions Found
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Try changing filters.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-2">

                        {filteredTransactions.map(
                            (transaction) => (

                                <div
                                    key={transaction.id}
                                    className="flex justify-between items-center border-b border-slate-200 py-5"
                                >

                                    <div>

                                        <h3 className="font-semibold text-xl text-[#003B7A]">
                                            {transaction.category}
                                        </h3>

                                        {transaction.description && (

                                            <p className="text-slate-600 mt-1">
                                                {
                                                    transaction.description
                                                }
                                            </p>

                                        )}

                                        <p className="text-slate-500 capitalize">
                                            {
                                                transaction.type
                                            }
                                        </p>

                                        <p className="text-sm text-slate-400 mt-1">

                                            {
                                                transaction.timestamp ||
                                                new Date(
                                                    transaction.id
                                                ).toLocaleString(
                                                    "en-IN"
                                                )
                                            }

                                        </p>

                                    </div>

                                    <div className="flex items-center gap-5">

                                        <span
                                            className={`text-2xl font-bold ${transaction.type ===
                                                    "income"
                                                    ? "text-green-600"
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

                                        <button
                                            onClick={() => {

                                                if (
                                                    window.confirm(
                                                        "Delete this transaction?"
                                                    )
                                                ) {
                                                    deleteTransaction(
                                                        transaction.id
                                                    );
                                                }
                                            }}
                                            className="text-red-500 hover:text-red-700 transition"
                                        >
                                            <Trash2
                                                size={22}
                                            />
                                        </button>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </PageLayout>
    );
}

export default HistoryPage;