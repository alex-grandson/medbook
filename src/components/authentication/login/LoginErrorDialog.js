import PropTypes from 'prop-types';
import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

const LoginErrorDialog = ({ onClose, onShow }) => (
  <Dialog
    open={onShow}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Неверный email или пароль</DialogTitle>

    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Не удается авторизоваться в системе. Измените email или пароль и попробуйте снова
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Понятно</Button>
    </DialogActions>
  </Dialog>
);

LoginErrorDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired
};

export default LoginErrorDialog;
