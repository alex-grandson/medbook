import { Box } from '@mui/material';

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
        <img src={`/assets/body_parts/${imageName}.png`} alt={imageName} height={90} />
        <p>{imageName}</p>
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
    opacity: 0.5,
    padding: '15px'
  },
  default: {
    padding: '15px'
  }
};
