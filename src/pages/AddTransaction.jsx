import { useState, useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import PageLayout from "../components/PageLayout";

function AddTransaction() {
    const { addTransaction } =
        useContext(ExpenseContext);

    const [form, setForm] = useState({
        amount: "",
        category: "",
        description: "",
        type: "expense",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.amount || !form.category) {
            alert("Please fill all fields");
            return;
        }

        addTransaction({
            id: Date.now(),
            amount: Number(form.amount),
            category: form.category,
            description: form.description,
            type: form.type,

            timestamp:
                new Date().toLocaleString(
                    "en-IN",
                    {
                        dateStyle: "medium",
                        timeStyle: "short",
                    }
                ),
        });

        setForm({
            amount: "",
            category: "",
            description: "",
            type: "expense",
        });

        alert("Transaction Added Successfully");
    };

    return (
        <PageLayout title="ADD TRANSACTION">

            {/* Header Card */}

            <div className="bg-[#003B7A] text-white rounded-3xl p-8 shadow-lg mb-8">

                <h2 className="text-3xl font-bold">
                    Quick Add Transaction
                </h2>

                <p className="text-slate-200 mt-2">
                    Track income and expenses
                    effortlessly.
                </p>

            </div>

            <div className="grid lg:grid-cols-2 gap-8">

                {/* Form Section */}

                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Amount */}

                        <div>
                            <label className="block mb-2 font-semibold text-slate-600">
                                Amount
                            </label>

                            <input
                                type="number"
                                placeholder="₹ Enter amount"
                                value={form.amount}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        amount: e.target.value,
                                    })
                                }
                                className="w-full border border-slate-200 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#003B7A]"
                            />
                        </div>

                        {/* Category */}

                        <div>
                            <label className="block mb-2 font-semibold text-slate-600">
                                Category
                            </label>

                            <input
                                type="text"
                                placeholder="Food, Travel, Salary..."
                                value={form.category}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        category:
                                            e.target.value,
                                    })
                                }
                                className="w-full border border-slate-200 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#003B7A]"
                            />
                        </div>

                        {/* Description */}

                        <div>
                            <label className="block mb-2 font-semibold text-slate-600">
                                Description
                            </label>

                            <textarea
                                rows="4"
                                placeholder="Enter transaction details"
                                value={form.description}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        description:
                                            e.target.value,
                                    })
                                }
                                className="w-full border border-slate-200 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#003B7A]"
                            />
                        </div>

                        {/* Type */}

                        <div>

                            <label className="block mb-4 font-semibold text-slate-600">
                                Transaction Type
                            </label>

                            <div className="flex gap-4">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setForm({
                                            ...form,
                                            type: "expense",
                                        })
                                    }
                                    className={`flex-1 py-3 rounded-2xl font-semibold transition ${form.type ===
                                            "expense"
                                            ? "bg-red-500 text-white"
                                            : "bg-slate-100"
                                        }`}
                                >
                                    Expense
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setForm({
                                            ...form,
                                            type: "income",
                                        })
                                    }
                                    className={`flex-1 py-3 rounded-2xl font-semibold transition ${form.type ===
                                            "income"
                                            ? "bg-green-600 text-white"
                                            : "bg-slate-100"
                                        }`}
                                >
                                    Income
                                </button>

                            </div>

                        </div>

                        {/* Save Button */}

                        <button
                            type="submit"
                            className="w-full bg-[#003B7A] hover:bg-[#002A55] text-white py-4 rounded-2xl font-semibold transition"
                        >
                            Add Transaction
                        </button>

                    </form>

                </div>

                {/* Live Preview */}

                <div className="bg-white rounded-3xl shadow-lg p-8">

                    <h2 className="text-2xl font-bold text-[#003B7A] mb-6">
                        Live Preview
                    </h2>

                    <div className="border rounded-3xl p-6 bg-slate-50">

                        <h3 className="text-xl font-bold text-[#003B7A]">
                            {form.category ||
                                "Category"}
                        </h3>

                        <p className="text-slate-500 mt-2">
                            {form.description ||
                                "Description"}
                        </p>

                        <div className="mt-6 flex justify-between">

                            <span
                                className={`font-semibold ${form.type ===
                                        "income"
                                        ? "text-green-600"
                                        : "text-red-500"
                                    }`}
                            >
                                {form.type}
                            </span>

                            <span
                                className={`text-2xl font-bold ${form.type ===
                                        "income"
                                        ? "text-green-600"
                                        : "text-red-500"
                                    }`}
                            >
                                ₹
                                {form.amount || 0}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </PageLayout>
    );
}

export default AddTransaction;