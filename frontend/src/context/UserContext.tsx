// src/context/UserContext.tsx
import { createContext, useState, useEffect, useContext } from 'react';

interface UserData {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  photo?: string;
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
    
    // Mapear 'photo' para 'profilePicture' se existir
    if (pd.photo && !pd.profilePicture) {
      pd.profilePicture = pd.photo;
    }
    
    if (pd.profilePicture && typeof pd.profilePicture === 'string') {
      let val = pd.profilePicture;
      
      // Limpar duplicações de /uploads - remover todos os /uploads extras
      while (val.includes('/uploads/uploads/')) {
        val = val.replace('/uploads/uploads/', '/uploads/');
      }
      
      if (!/^https?:\/\//i.test(val)) {
        pd.profilePicture = `${BASE_URL}${val}`;
      } else {
        pd.profilePicture = val;
      }
    }
    console.log('URL final da imagem:', pd.profilePicture);
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
        console.log('Dados recebidos do backend:', userData);
        setUser(normalizeProfilePicture(userData));
        setIsAuthenticated(true);
      } else {
        console.log('Erro ao buscar user data. Status:', res.status);
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
    console.log('Login chamado com:', userData, 'Token:', token);
    const normalizedUser = normalizeProfilePicture(userData);
    setUser(normalizedUser);
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(normalizedUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Verificação inicial de autenticação
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (e) {
        console.error('Erro ao restaurar dados do usuário:', e);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
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