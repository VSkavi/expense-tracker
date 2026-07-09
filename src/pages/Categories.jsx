import PageLayout from "../components/PageLayout";

function Categories() {

    const categories = [
        "Food",
        "Travel",
        "Shopping",
        "Salary",
        "Bills",
    ];

    return (
        <PageLayout title="CATEGORIES">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">

                {categories.map((cat) => (

                    <div
                        key={cat}
                        className="bg-white rounded-3xl shadow p-6"
                    >
                        <h3 className="font-bold text-[#003B7A]">
                            {cat}
                        </h3>
                    </div>

                ))}

            </div>

        </PageLayout>
    );
}

export default Categories;