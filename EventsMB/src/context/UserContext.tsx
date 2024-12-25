import React, { createContext, useState, useContext } from 'react';

import { getUser, addTicketToUser } from '../services/userService';
import { User, Ticket } from '../types';

interface UserContextData {
  user: User | null;
  loadUser: () => Promise<void>;
  addTicket: (ticket: Ticket) => Promise<void>;
}

const UserContext = createContext<UserContextData | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const loadUser = async () => {
    try {
      const userData = await getUser();
      setUser(userData);
    } catch (error) {
      console.error('Erro ao carregar o usuário');
    }
  };

  const addTicket = async (ticket: Ticket) => {
    try {
      const updatedUser = await addTicketToUser(ticket);
      setUser(updatedUser);
    } catch (error) {
      console.error('Erro ao adicionar o ticket');
    }
  };

  return (
    <UserContext.Provider value={{ user, loadUser, addTicket }}>{children}</UserContext.Provider>
  );
};

export const useUser = (): UserContextData => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de UserProvider');
  }
  return context;
};
