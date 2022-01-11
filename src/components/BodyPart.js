import { Box, Typography } from '@mui/material';
import { ORGAN_NAMES } from '../constants';

export default function BodyPart({ imageName, onClick, isChecked, key }) {
  return (
    <>
      <Box
        onClick={(e) => onClick(e, imageName)}
        sx={
          // eslint-disable-next-line no-nested-ternary
          isChecked ? styles.checked : isChecked === undefined ? styles.default : styles.unchecked
        }
      >
        <img src={`/assets/body_parts/${imageName}.png`} alt={ORGAN_NAMES[imageName]} height={90} />
        <Typography variant="body1">{ORGAN_NAMES[imageName]}</Typography>
      </Box>
    </>
  );
}

const styles = {
  checked: {
    transform: 'scale(1.1)',
    padding: '15px'
  },
  unchecked: {
    cursor: 'pointer',
    opacity: 0.5,
    padding: '15px'
  },
  default: {
    cursor: 'pointer',
    padding: '15px'
  }
};
