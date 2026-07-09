import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import PageLayout from "../components/PageLayout";

function Accounts() {
    const { accounts } =
        useContext(ExpenseContext);

    return (
        <PageLayout title="ACCOUNTS">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                {accounts.map((account) => (

                    <div
                        key={account.id}
                        className="bg-white rounded-3xl shadow p-6"
                    >
                        <h2 className="text-xl font-bold text-[#003B7A]">
                            {account.name}
                        </h2>

                        <p className="text-4xl mt-4 font-bold">
                            ₹{account.balance}
                        </p>
                    </div>

                ))}

            </div>

        </PageLayout>
    );
}

export default Accounts;