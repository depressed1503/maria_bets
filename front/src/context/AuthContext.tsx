import { createContext } from "react";
import type { CustomUser } from "@/lib/types";

export interface AuthContextType {
  user: CustomUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  getUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
