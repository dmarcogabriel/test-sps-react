import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DeleteUserDialog = ({ isVisible, onClose, onConfirm, userName }) => (
  <Dialog
    open={isVisible}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Atenção!
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {`Deseja confirmar deletar o usuário ${userName}? Esta ação não poderá ser desfeita!`}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Disagree</Button>
      <Button onClick={onConfirm} autoFocus color='error'>
        Agree
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteUserDialog;
