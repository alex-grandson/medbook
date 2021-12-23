// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Главная | Medbook">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Добро пожаловать</Typography>
        </Box>
      </Container>
    </Page>
  );
}
