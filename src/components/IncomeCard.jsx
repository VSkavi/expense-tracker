function IncomeCard({ item }) {
    return (
        <div className="card">
            <h3>{item.category}</h3>
            <p>₹{item.amount}</p>
        </div>
    );
}

export default IncomeCard;