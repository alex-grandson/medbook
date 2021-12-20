import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { RegisterForm } from '../components/authentication/register';
import AuthSocial from '../components/authentication/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
  return (
    <RootStyle title="Регистрация">
      <AuthLayout>
        Уже зарегестрированы? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          Войти
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Ваш организм скажет вам спасибо
          </Typography>
          <img alt="register" src="/assets/doctor.png" width="80%" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Зарегистрируйтесь
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Или войдите с помощью аккаунтагос услуг
            </Typography>
          </Box>

          <AuthSocial />

          <RegisterForm />

          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            Регистируясь, я соглашаюсь с&nbsp;
            <Link
              underline="always"
              sx={{ color: 'text.primary' }}
              href="https://esia.gosuslugi.ru/registration/policiesTerms.xhtml"
            >
              Условиями пользования
            </Link>
            &nbsp;и&nbsp;
            <Link
              underline="always"
              sx={{ color: 'text.primary' }}
              href="https://esia.gosuslugi.ru/registration/policiesPrivacy.xhtml"
            >
              Политикой конфиденциальности
            </Link>
            .
          </Typography>

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?&nbsp;
              <Link to="/login" component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
