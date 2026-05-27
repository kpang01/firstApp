import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, ENDPOINTS } from '../config/constants';

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    token: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}   

const AUTH_TOKEN_KEY = '@auth_token';
const AUTH_USER_KEY = '@auth_user';

async function request<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: Object,
    token?: string
): Promise<T> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Request failed');
    }
    return data as T;
}

export async function loginUser(payload: LoginPayload): Promise<AuthUser> {
    const data = await request<AuthUser>(ENDPOINTS.LOGIN, 'POST', payload);
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, data.token);
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(data));
    return data;
}

export async function registerUser(payload: RegisterPayload): Promise<AuthUser> {
    const data = await request<AuthUser>(ENDPOINTS.REGISTER, 'POST', payload);
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, data.token);
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(data));
    return data;
}

export async function logoutUser(): Promise<void> {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
        try {
            await request(ENDPOINTS.LOGOUT, 'POST', undefined, token);
        } catch (err) {
            console.warn('Logout failed:', err);
        }
    }
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    await AsyncStorage.removeItem(AUTH_USER_KEY);
}

export async function getStoredUser(): Promise<AuthUser | null> {
    const raw = await AsyncStorage.getItem(AUTH_USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
}

export async function getStoredToken(): Promise<string | null> {
    return AsyncStorage.getItem(AUTH_TOKEN_KEY);
}