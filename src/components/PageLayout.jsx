import Navbar from "./Navbar";

function PageLayout({ title, children }) {
    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <Navbar />

            {/* No left margin on mobile (sidebar is hidden there,
                bottom nav is used instead). md+ gets the ml-28
                offset for the fixed sidebar. Bottom padding on
                mobile keeps content clear of the bottom tab bar. */}

            <div className="md:ml-28 px-4 py-6 pb-28 md:p-8 md:pb-8">

                <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#003B7A] mb-5 md:mb-8">
                    {title}
                </h1>

                {children}

            </div>
        </div>
    );
}

export default PageLayout;
