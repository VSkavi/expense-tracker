import {
    LayoutDashboard,
    PlusSquare,
    BarChart3,
    History,
    UserCircle,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Navbar() {
    const menus = [
        {
            icon: LayoutDashboard,
            path: "/",
            label: "Home",
        },
        {
            icon: PlusSquare,
            path: "/add",
            label: "Add",
        },
        {
            icon: BarChart3,
            path: "/analytics",
            label: "Stats",
        },
        {
            icon: History,
            path: "/history",
            label: "History",
        },
    ];

    return (
        <>
            {/* ---------------------------------------------
                DESKTOP / TABLET SIDEBAR (md and up)
            ---------------------------------------------- */}

            <aside className="hidden md:flex fixed left-0 top-0 h-screen w-20 bg-[#003B7A] rounded-r-3xl flex-col justify-between py-8 z-50">

                {/* Top Menu Icons */}

                <div className="flex flex-col items-center gap-6">

                    {menus.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={index}
                                to={item.path}
                            >
                                {({ isActive }) => (
                                    <div
                                        className={`p-3 rounded-xl transition-all duration-300 ${isActive
                                                ? "bg-[#FFF4D6]"
                                                : "hover:bg-[#0B4E9B]"
                                            }`}
                                    >
                                        <Icon
                                            size={28}
                                            className={
                                                isActive
                                                    ? "text-[#003B7A]"
                                                    : "text-[#FFF4D6]"
                                            }
                                        />
                                    </div>
                                )}
                            </NavLink>
                        );
                    })}

                </div>

                {/* Bottom Profile Icon */}

                <div className="flex justify-center">

                    <NavLink to="/profile">
                        {({ isActive }) => (
                            <div
                                className={`p-3 rounded-xl transition-all duration-300 ${isActive
                                        ? "bg-[#FFF4D6]"
                                        : "hover:bg-[#0B4E9B]"
                                    }`}
                            >
                                <UserCircle
                                    size={34}
                                    className={
                                        isActive
                                            ? "text-[#003B7A]"
                                            : "text-[#FFF4D6]"
                                    }
                                />
                            </div>
                        )}
                    </NavLink>

                </div>

            </aside>

            {/* ---------------------------------------------
                MOBILE BOTTOM TAB BAR (below md)
            ---------------------------------------------- */}

            <nav className="mobile-nav-safe-area md:hidden fixed bottom-0 left-0 right-0 bg-[#003B7A] rounded-t-3xl flex items-center justify-around px-2 pt-2 pb-2 z-50 shadow-[0_-4px_16px_rgba(0,0,0,0.15)]">

                {menus.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={index}
                            to={item.path}
                            className="flex-1"
                        >
                            {({ isActive }) => (
                                <div
                                    className={`flex flex-col items-center gap-1 py-1.5 rounded-xl transition-all duration-300 ${isActive
                                            ? "bg-[#FFF4D6]"
                                            : ""
                                        }`}
                                >
                                    <Icon
                                        size={22}
                                        className={
                                            isActive
                                                ? "text-[#003B7A]"
                                                : "text-[#FFF4D6]"
                                        }
                                    />

                                    <span
                                        className={`text-[10px] font-medium ${isActive
                                                ? "text-[#003B7A]"
                                                : "text-[#FFF4D6]"
                                            }`}
                                    >
                                        {item.label}
                                    </span>
                                </div>
                            )}
                        </NavLink>
                    );
                })}

                <NavLink to="/profile" className="flex-1">
                    {({ isActive }) => (
                        <div
                            className={`flex flex-col items-center gap-1 py-1.5 rounded-xl transition-all duration-300 ${isActive
                                    ? "bg-[#FFF4D6]"
                                    : ""
                                }`}
                        >
                            <UserCircle
                                size={22}
                                className={
                                    isActive
                                        ? "text-[#003B7A]"
                                        : "text-[#FFF4D6]"
                                }
                            />

                            <span
                                className={`text-[10px] font-medium ${isActive
                                        ? "text-[#003B7A]"
                                        : "text-[#FFF4D6]"
                                    }`}
                            >
                                Profile
                            </span>
                        </div>
                    )}
                </NavLink>

            </nav>
        </>
    );
}

export default Navbar;
