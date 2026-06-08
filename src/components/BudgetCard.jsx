function BudgetCard({ budget }) {
    return (
        <div className="card">
            <h3>{budget.category}</h3>

            <progress
                value={budget.spent}
                max={budget.limit}
            />

            <p>
                ₹{budget.spent} / ₹{budget.limit}
            </p>
        </div>
    );
}

export default BudgetCard;