import BudgetCard from "../components/BudgetCard";

function Budgets() {
    const budgets = [
        {
            category: "Food",
            limit: 10000,
            spent: 6500,
        },
    ];

    return (
        <div className="container">
            <h1>Budgets</h1>

            {budgets.map((budget) => (
                <BudgetCard
                    key={budget.category}
                    budget={budget}
                />
            ))}
        </div>
    );
}

export default Budgets;