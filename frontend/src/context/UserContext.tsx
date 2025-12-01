// src/context/UserContext.tsx
import { createContext, useState, useEffect, useContext } from 'react';

interface UserData {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

interface UserContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  login: (userData: UserData, token: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const BASE_URL = 'https://once11.onrender.com';

  const normalizeProfilePicture = (userData: any) => {
    if (!userData) return userData;
    const pd = { ...userData };
    if (pd.profilePicture && typeof pd.profilePicture === 'string') {
      const val = pd.profilePicture;
      if (!/^https?:\/\//i.test(val)) {
        pd.profilePicture = `${BASE_URL}/${val.replace(/^\/+/, '')}`;
      }
    }
    return pd;
  };

  // Função para buscar dados do usuário usando o token
  const fetchUserData = async (token: string) => {
    try {
      const res = await fetch('https://once11.onrender.com/api/auth/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        const userData = await res.json();
        setUser(normalizeProfilePicture(userData));
        setIsAuthenticated(true);
      } else {
        // Token inválido
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  };

  const login = (userData: UserData, token: string) => {
    setUser(normalizeProfilePicture(userData));
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  // Verificação inicial de autenticação
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, isAuthenticated, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};