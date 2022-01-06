import PropTypes from 'prop-types';
import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MakeAppointmentDialog = ({ onClose, onShow }) => {
  const navigate = useNavigate();
  const handleTransitionToMain = () => {
    onClose();
    navigate('/dashboard', { replace: true });
  };

  return (
    <Dialog
      open={onShow}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Вы были успешно записаны к врачу</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Вы можете перейти на главную страницу либо остаться на текущей странице для офомления еще
          одной записи
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Остаться</Button>
        <Button onClick={handleTransitionToMain} autoFocus>
          Перейти
        </Button>
      </DialogActions>
    </Dialog>
  );
};

MakeAppointmentDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired
};

export default MakeAppointmentDialog;
