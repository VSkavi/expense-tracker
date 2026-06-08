import { useContext } from "react";
import { FiSettings } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { ExpenseContext } from "../context/ExpenseContext";

import PageLayout from "../components/PageLayout";
import { useState, useEffect } from "react";

import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

import { useRef } from "react";


function Profile() {
    const navigate = useNavigate();

    const { user, logout } =
        useContext(AuthContext);

    const { transactions } =
        useContext(ExpenseContext);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance =
        totalIncome - totalExpense;
    

    const [userData, setUserData] = useState(
        JSON.parse(localStorage.getItem("user")) || {}
    );

    const [profilePic, setProfilePic] = useState(
        userData.profilePic || ""
    );

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            const updatedUser = {
                ...userData,
                profilePic: reader.result,
            };

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            setUserData(updatedUser);
            setProfilePic(reader.result);
        };

        reader.readAsDataURL(file);
        setShowPhotoMenu(false);
    };

    const [showPhotoMenu, setShowPhotoMenu] =
        useState(false);
    
    const removeProfilePicture = () => {

        if (!profilePic) return;

        const updatedUser = {
            ...userData,
            profilePic: "",
        };

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        setUserData(updatedUser);
        setProfilePic("");
    };

    const fileInputRef = useRef(null);

    const [showSettings, setShowSettings] =
        useState(false);
    
    const [showThemeMenu, setShowThemeMenu] =
        useState(false);

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {

        document.documentElement.classList.remove(
            "light",
            "dark"
        );

        document.documentElement.classList.add(
            theme
        );

        localStorage.setItem(
            "theme",
            theme
        );

    }, [theme]);

    const changeTheme = (selectedTheme) => {

        setTheme(selectedTheme);

        setShowThemeMenu(false);

        setShowSettings(false);
    };

    return (
        <PageLayout title="PROFILE">

            <div className="max-w-5xl mx-auto">

                {/* PROFILE HEADER */}

                <div className="relative bg-gradient-to-r from-[#003B7A] to-[#0A4D9B] rounded-[32px] p-10 text-white shadow-xl min-h-[330px]">

                    <div className="flex flex-col items-center">

                       

                        <div className="relative group">

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleImageUpload}
                            />

                            {profilePic ? (

                                <div className="relative">

                                    <img
                                        src={profilePic}
                                        alt="Profile"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                                    />

                                    {/* Delete Icon on Hover */}

                                    <button
                                        onClick={() => {

                                            if (!profilePic) return;

                                            if (
                                                window.confirm(
                                                    "Remove profile picture?"
                                                )
                                            ) {
                                                removeProfilePicture();
                                            }

                                        }}
                                        className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition duration-300"
                                    >

                                        <FaTrash
                                            className="text-white"
                                            size={26}
                                        />

                                    </button>

                                </div>

                            ) : (

                                <div className="relative">

                                    <div className="w-32 h-32 rounded-full bg-white text-[#003B7A] flex items-center justify-center text-5xl font-bold shadow-lg">
                                        {userData?.name?.charAt(0)}
                                    </div>

                                    {/* Edit Icon */}

                                    <button
                                        onClick={() =>
                                            fileInputRef.current.click()
                                        }
                                        className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-[#003B7A] text-white shadow-lg flex items-center justify-center hover:scale-110 transition"
                                    >

                                        <FaEdit />

                                    </button>

                                </div>

                            )}

                        </div>

                        <h1 className="text-4xl font-bold mt-5">
                            {userData?.name}
                        </h1>

                        <p className="text-blue-100 text-lg mt-2">
                            {userData?.email}
                        </p>

                        <div className="mt-5 px-5 py-2 bg-white/20 rounded-[10px] text-sm font-medium">
                            {/* LOGOUT */}

                            <button onClick={handleLogout}>
                                Logout
                            </button>
                        </div>

                    </div>

                </div>

                {/* FINANCIAL SUMMARY */}

                <div className="grid md:grid-cols-3 gap-5 mt-8">

                    <div className="bg-white rounded-3xl p-6 shadow">

                        <p className="text-slate-500">
                            Current Balance
                        </p>

                        <h2 className="text-3xl font-bold text-[#003B7A] mt-2">
                            ₹{balance}
                        </h2>

                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow">

                        <p className="text-slate-500">
                            Total Income
                        </p>

                        <h2 className="text-3xl font-bold text-green-600 mt-2">
                            ₹{totalIncome}
                        </h2>

                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow">

                        <p className="text-slate-500">
                            Total Expense
                        </p>

                        <h2 className="text-3xl font-bold text-red-500 mt-2">
                            ₹{totalExpense}
                        </h2>

                    </div>

                </div>


                {/* ACCOUNT INFO */}

                <div className="bg-white rounded-3xl shadow p-6 mt-8">

                    <h3 className="text-xl font-bold text-[#003B7A] mb-5">
                        Account Information
                    </h3>

                    <div className="space-y-4">

                        <div className="flex justify-between border-b-2 border-slate-200 pb-3">

                            <span className="text-slate-500">
                                Full Name
                            </span>

                            <span className="font-semibold text-[#003B7A]">
                                {userData?.name}
                            </span>

                        </div>

                        <div className="flex justify-between border-b-2 border-slate-200 pb-3">

                            <span className="text-slate-500">
                                Email
                            </span>

                            <span className="font-semibold">
                                {userData?.email}
                            </span>

                        </div>

                        <div className="flex justify-between border-b-2 border-slate-200 pb-3">

                            <span className="text-slate-500">
                                Member Since
                            </span>

                            <span className="font-semibold">
                                {userData?.joined}
                            </span>

                        </div>

                        <div className="flex justify-between border-b-2 border-slate-200 pb-3">

                            <span className="text-slate-500">
                                Total Transactions
                            </span>

                            <span className="font-semibold">
                                {transactions.length}
                            </span>

                        </div>

                        <div className="flex justify-between border-b-2 border-slate-200 pb-3">

                            <span className="text-slate-500">
                                Status
                            </span>

                            <span className="font-semibold text-green-600">
                                Active
                            </span>

                        </div>

                    </div>

                </div>

               

            </div>

        </PageLayout>
    );
}

export default Profile;