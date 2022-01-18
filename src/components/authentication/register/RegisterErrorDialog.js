import PropTypes from 'prop-types';
import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

const RegisterErrorDialog = ({ onClose, onShow }) => (
  <Dialog
    open={onShow}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Такой email уже зарегистрирован</DialogTitle>

    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Пользователь с таким адресом электронной почты уже зарегистрирован в системе
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Понятно</Button>
    </DialogActions>
  </Dialog>
);

RegisterErrorDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired
};

export default RegisterErrorDialog;
