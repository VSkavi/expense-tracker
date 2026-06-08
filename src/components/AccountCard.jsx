function AccountCard({ account }) {
    return (
        <div className="card">
            <h2>{account.name}</h2>
            <p>Balance : ₹{account.balance}</p>
        </div>
    );
}

export default AccountCard;