import React from "react";
import { Routes, Route } from "react-router-dom";
import { useUser } from './hooks/useUser'

import Home from './pages/Home';
import Users from "./pages/users";
import UserEdit from "./pages/userEdit";
import SignIn from "./pages/signIn";
import UserCreate from "./pages/userCreate";

const Router = () => {
  const { user } = useUser();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {user ? (
        <>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<UserEdit />} />
          <Route path="/users/register" element={<UserCreate />} />
          <Route path="*" element={<Users />} />
        </>
      ) : (
        <>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<SignIn />}  />
        </>
      )}
    </Routes>
  )
}

export default Router;
