import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("Attempting login with:", { email, password });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser = {
      id: "1",
      username: email.split("@")[0],
      email,
      avatar: `https://ui-avatars.com/api/?name=${
        email.split("@")[0]
      }&background=0D8ABC&color=fff`,
    };

    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    return true;
  };

  const signup = async (
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    console.log("Attempting signup with:", { username, email, password });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser = {
      id: Date.now().toString(),
      username,
      email,
      avatar: `https://ui-avatars.com/api/?name=${username}&background=0D8ABC&color=fff`,
    };

    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
