import { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Provider component to manage login states and user data
export function AuthProvider({ children }) {
  // Load initial state from sessionStorage or default to false/null
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('isAdminLoggedIn') === 'true';
  });

  const [isPatientLoggedIn, setIsPatientLoggedIn] = useState(() => {
    return sessionStorage.getItem('isPatientLoggedIn') === 'true';
  });

  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(() => {
    return sessionStorage.getItem('isDoctorLoggedIn') === 'true';
  });

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('isAdminLoggedIn', isAdminLoggedIn);
    sessionStorage.setItem('isPatientLoggedIn', isPatientLoggedIn);
    sessionStorage.setItem('isDoctorLoggedIn', isDoctorLoggedIn);
  }, [isAdminLoggedIn, isPatientLoggedIn, isDoctorLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isPatientLoggedIn,
        setIsPatientLoggedIn,
        isDoctorLoggedIn,
        setIsDoctorLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
} 

// Custom hook to access the context
export const useAuth = () => useContext(AuthContext);
