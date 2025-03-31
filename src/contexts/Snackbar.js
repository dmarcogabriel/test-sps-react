import React, { createContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const SnackbarContext = createContext();

const HIDE_DURATION = 5000;

const INITIAL_STATE = {
  isVisible: false,
  message: "",
  severity: "info"
}
export const SnackbarProvider = ({ children }) => {
  const [snackbarOptions, setSnackbarOptions] = React.useState(INITIAL_STATE);

  const showSnackbar = (options) => {
    setSnackbarOptions({ ...options, isVisible: true });
  }

  const handleClose = () => {
    setSnackbarOptions(INITIAL_STATE);
  }

  const value = React.useMemo(() => ({
    showSnackbar
  }), []);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={snackbarOptions.message}
        autoHideDuration={HIDE_DURATION}
        onClose={handleClose}
      >
        <Alert
          severity={snackbarOptions.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarOptions.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
