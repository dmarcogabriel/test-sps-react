import { useContext } from "react";
import { SnackbarContext } from "../contexts/Snackbar";

export const useSnackbar = () => useContext(SnackbarContext);
