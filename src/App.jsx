import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import AddTransaction from "./pages/AddTransaction";
import HistoryPage from "./pages/HistoryPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* Public Route */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Protected Routes */}

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <>
                                <Navbar />
                                <Dashboard />
                            </>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/analytics"
                    element={
                        <ProtectedRoute>
                            <>
                                <Navbar />
                                <Analytics />
                            </>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/add"
                    element={
                        <ProtectedRoute>
                            <>
                                <Navbar />
                                <AddTransaction />
                            </>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/history"
                    element={
                        <ProtectedRoute>
                            <>
                                <Navbar />
                                <HistoryPage />
                            </>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <>
                                <Navbar />
                                <Profile />
                            </>
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;