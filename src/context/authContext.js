import { createContext, useState } from 'react';

export const AuthContext = createContext({
  isAuth: false,
  role: '',
  checkAuth: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('accessToken'));
  const [role, setRole] = useState(localStorage.getItem('role'));

  const checkAuthHandler = () => {
    setIsAuth(!!localStorage.getItem('accessToken'));
    setRole(localStorage.getItem('role'));
  };

  return (
    <AuthContext.Provider value={{ checkAuth: checkAuthHandler, isAuth: isAuth, role: role }} >
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthContextProvider;