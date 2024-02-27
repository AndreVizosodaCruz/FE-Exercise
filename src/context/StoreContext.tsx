import React, { createContext, useReducer, useContext, ReactNode } from 'react';

export interface User {
  name: string;
  surname: string;
  country: string;
  birthday: string;
}

export interface Country {
  value: string,
  label: string,
  labelPT: string
}

interface StoreProviderProps {
  children: ReactNode;
}

type Action =
  | { type: 'ADD_USER'; payload: User }
  | { type: 'REMOVE_USER'; payload: User }
  | { type: 'ADD_COUNTRIES'; payload: Country[] }
  | { type: 'SET_LOADING' };

interface StoreContextType {
  users: User[];
  countries: Country[];
  loading: boolean;
  addUser: (user: User) => void;
  addCountries: (countries: Country[]) => void;
  startLoading: () => void;
}

const initialState: StoreContextType = {
  users: [{name: 'Initial', surname: 'User', country: 'pt', birthday: ''}],
  countries: [],
  loading: false,
  addUser: () => { },
  addCountries: () => { },
  startLoading: () => { }
};

const StoreContext = createContext<StoreContextType>(initialState);

const reducer = (state: StoreContextType, action: Action): StoreContextType => {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, loading: false, users: [...state.users, action.payload] };
    case 'ADD_COUNTRIES':
      return { ...state, loading: false, countries: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: true }
    default:
      return state;
  }
};

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addUser = (user: User) => {
    dispatch({ type: 'ADD_USER', payload: user });
  };

  const addCountries = (countries: Country[]) => {
    dispatch({ type: 'ADD_COUNTRIES', payload: countries });
  };

  const startLoading = () => {
    dispatch({ type: 'SET_LOADING' });
  };

  return (
    <StoreContext.Provider value={{ ...state, addUser, addCountries, startLoading }}>
      {children}
    </StoreContext.Provider>
  );
};


export const useContextStore = () => {
  return useContext(StoreContext);
};
