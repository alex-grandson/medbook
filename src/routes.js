import { Navigate, useRoutes } from 'react-router-dom';
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
import Appointments from './pages/Appointments';
import MakeAppointment from './pages/MakeAppointment';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/profile" replace /> },
        { path: 'user', element: <User /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'appointments', element: <Appointments /> },
        { path: 'appointment', element: <MakeAppointment /> },
        { path: 'profile', element: <Profile /> },
        { path: 'doctor', element: <DoctorProfile /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
