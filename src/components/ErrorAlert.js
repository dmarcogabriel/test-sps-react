import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const HIDE_DURATION = 5000;

const ErrorAlert = ({ isVisible, message, onClose }) => (
  <Snackbar
    open={isVisible}
    autoHideDuration={HIDE_DURATION}
    onClose={onClose}
  >
    <Alert
    severity="error"
    variant="filled"
    sx={{ width: '100%' }}
  >
    {message}
  </Alert>
  </Snackbar>
);

export default ErrorAlert;
