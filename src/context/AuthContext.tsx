import React, {
    createContext, useState, useContext, ReactNode, useEffect
} from 'react';
import {
    AuthUser,
    LoginPayload,
    RegisterPayload,
    loginUser,
    registerUser,
    logoutUser,
    getStoredUser,
} from '../services/authService';

interface AuthContextType {
    user: AuthUser | null;
    isloading: boolean;
    login: (payload: LoginPayload) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isloading, setIsLoading] = useState(false);

    // Restore session on app start
    useEffect(() => {
        getStoredUser()
            .then(stored => setUser(stored))
            .finally(() => setIsLoading(false));
    }, []);

    const login = async (payload: LoginPayload) => {
        const data = await loginUser(payload);
        setUser(data);
    };

    const register = async (payload: RegisterPayload) => {
        const data = await registerUser(payload)
        setUser(data);
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{ user, isloading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if(!ctx) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return ctx;
}