import { useContext } from "react";
import { UserContext } from "../contexts/User";

export const useUser = () => useContext(UserContext);
