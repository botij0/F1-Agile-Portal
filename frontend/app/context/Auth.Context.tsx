"use client";
import React, {
    useReducer,
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import {
    loginRequest,
    registerRequest,
    verifyTokenRequest,
} from "../(utils)/api";
import toast from "react-hot-toast";
import { Usuario } from "../logic/types";
import { useRouter } from "next/navigation";

interface AuthContextType {
    signup: (user: any) => void;
    signin: (user: any) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
    user: Usuario | null;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    signup: async () => {},
    signin: async () => {},
    logout: async () => {},
    isAuthenticated: false,
    user: null,
    loading: false,
    isAdmin: false,
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<Usuario | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();

    const signup = async (user: any) => {
        try {
            const res = await registerRequest(user);
            if (!res.data.success) {
                toast.error(res.data.message);
                return;
            } else {
                toast.success(res.data.message, {
                    duration: 4000,
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    const signin = async (user: any) => {
        try {
            const res = await loginRequest(user);
            if (!res.data.success) {
                toast.error(res.data.message);
                return;
            } else {
                toast.success(res.data.message, {
                    duration: 4000,
                });
                setIsAuthenticated(true);
                setUser(res.data.usuario);

                res.data.usuario.rol === "ADMIN"
                    ? setIsAdmin(true)
                    : setIsAdmin(false);

                localStorage.setItem("token", res.data.token);
                localStorage.setItem("id", res.data.usuario.id);
                router.push("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        router.push("/Users/Login");
    };

    useEffect(() => {
        async function checkLogin() {
            const token = localStorage.getItem("token");
            if (!token) {
                setUser(null);
                setIsAuthenticated(false);
                setLoading(false);
                setIsAdmin(false);
                return;
            }
            try {
                const res = await verifyTokenRequest(
                    token,
                    localStorage.getItem("id")
                );
                if (!res.data.success) {
                    setUser(null);
                    setIsAuthenticated(false);
                    setIsAdmin(false);
                    localStorage.removeItem("token");
                    localStorage.removeItem("id");
                    setLoading(false);
                    return;
                }
                setUser(res.data.usuario);
                setIsAuthenticated(true);

                console.log(res.data.usuario.rol);

                res.data.usuario.rol === "ADMIN"
                    ? setIsAdmin(true)
                    : setIsAdmin(false);

                console.log(isAdmin);
                setLoading(false);
            } catch (err) {
                setUser(null);
                setIsAuthenticated(false);
                setIsAdmin(false);
                localStorage.removeItem("token");
                localStorage.removeItem("id");
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                loading,
                signup,
                signin,
                logout,
                isAdmin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
