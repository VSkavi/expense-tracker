import Navbar from "./Navbar";

function PageLayout({ title, children }) {
    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <Navbar />

            <div className="ml-28 p-8">

                <h1 className="text-5xl font-extrabold text-[#003B7A] mb-8">
                    {title}
                </h1>

                {children}

            </div>
        </div>
    );
}

export default PageLayout;