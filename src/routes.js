import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import User from './pages/User';
import NotFound from './pages/Page404';
import Profile from './pages/Profile';
import DoctorProfile from './pages/DoctorProfile';
import PatientSchedule from './pages/PatientSchedule';
import MakeAppointment from './pages/MakeAppointment';
import { ROLES } from './constants';
import DoctorSchedule from './pages/DoctorSchedule';

// ----------------------------------------------------------------------

export default function Router() {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const isDoctor = useSelector((state) => state.auth.role === ROLES.DOCTOR);

  return useRoutes([
    {
      path: '/dashboard',
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/profile" replace /> },
        { path: 'user', element: <User /> },
        {
          path: 'app',
          element: <DashboardApp />
        },
        {
          path: 'schedule',
          element: isDoctor ? <DoctorSchedule /> : <Navigate to="/dashboard/app" />
        },
        { path: 'appointments', element: <PatientSchedule /> },
        { path: 'appointment', element: <MakeAppointment /> },
        { path: 'profile', element: !isDoctor ? <Profile /> : <DoctorProfile /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        {
          path: 'login',
          element: !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
        },
        {
          path: 'register',
          element: !isAuthenticated ? <Register /> : <Navigate to="/dashboard" />
        },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
