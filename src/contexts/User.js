import React, { createContext } from "react";
import { getUserMe } from "../services/auth.service";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [signedUser, setSignedUser] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        const data = await getUserMe();
  
        setSignedUser(data);
      } catch (e) {
        console.log("Sessão Expirada.");
      }
    })();
  }, [])

  const signIn = (user) => {
    setSignedUser(user);
  }

  const value = React.useMemo(() => ({
    user: signedUser,
    signIn
  }), [signedUser]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
