// import { useEffect, useState, useContext, createContext, ReactNode } from 'react';
// import { onAuthStateChanged, User } from 'firebase/auth';
// import { auth } from '@/utils/firebase/config';

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const AuthContext = createContext<{ user: User | null }>({ user: null });

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
