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
        },
        {
            icon: PlusSquare,
            path: "/add",
        },
        {
            icon: BarChart3,
            path: "/analytics",
        },
        {
            icon: History,
            path: "/history",
        },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-20 bg-[#003B7A] rounded-r-3xl flex flex-col justify-between py-8 z-50">

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
    );
}

export default Navbar;