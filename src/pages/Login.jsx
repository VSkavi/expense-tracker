import {
    useState,
    useContext,
} from "react";

import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const { login } =
        useContext(AuthContext);

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        login({
            name,
            email,
            joined:
                new Date().toLocaleDateString(),
        });

        navigate("/");
    };

    const userData = {
        name,
        email,
        joined: new Date().toLocaleDateString(),
        profilePic: "",
    };

    localStorage.setItem(
        "user",
        JSON.stringify(userData)
    );

    return (
        <div className="min-h-screen bg-[#F3F4F6] flex items-center justify-center p-6">

            <div className="w-full max-w-5xl bg-white rounded-[32px] shadow-2xl overflow-hidden grid md:grid-cols-2">

                {/* LEFT PANEL */}

                <div className="bg-gradient-to-br from-[#003B7A] to-[#0A4D9B] text-white p-12 flex flex-col justify-center">

                    <h1 className="text-5xl font-bold">
                        Expense Tracker
                    </h1>

                    <p className="mt-5 text-blue-100 text-lg">
                        Track expenses, monitor income,
                        visualize spending and stay
                        financially organized.
                    </p>

                    <div className="mt-12">

                        <div className="bg-white/10 rounded-2xl p-5 mb-4">
                            📊 Analytics Dashboard
                        </div>

                        <div className="bg-white/10 rounded-2xl p-5 mb-4">
                            💰 Expense Management
                        </div>

                        <div className="bg-white/10 rounded-2xl p-5">
                            📈 Monthly Reports
                        </div>

                    </div>

                </div>

                {/* RIGHT PANEL */}

                <div className="p-12 flex flex-col justify-center">

                    <h2 className="text-4xl font-bold text-[#003B7A]">
                        Welcome Back
                    </h2>

                    <p className="text-slate-500 mt-2 mb-8">
                        Login to continue managing
                        your finances.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        <div>

                            <label className="block text-sm font-medium mb-2 text-slate-600">
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                className="w-full border border-slate-200 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-[#003B7A]"
                                required
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium mb-2 text-slate-600">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="w-full border border-slate-200 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-[#003B7A]"
                                required
                            />

                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#003B7A] hover:bg-[#0A4D9B] text-white py-4 rounded-2xl font-semibold transition-all duration-300"
                        >
                            Login
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default Login;