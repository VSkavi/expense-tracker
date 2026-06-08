function ExpenseCard({ item }) {
    return (
        <div className="flex justify-between items-center border-b py-4">

            <div>
                <h3 className="font-semibold text-[#003B7A]">
                    {item.category}
                </h3>

                <p className="text-slate-400">
                    {item.type}
                </p>
            </div>

            <h3
                className={`font-bold ${item.type === "income"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
            >
                ₹{item.amount}
            </h3>

        </div>
    );
}

export default ExpenseCard;