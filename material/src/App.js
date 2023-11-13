import './App.css';

import * as React from 'react';

import 'material-icons/iconfont/material-icons.css';
import '@fontsource/poppins/500.css';
import 'react-bootstrap-sweetalert';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import {
  CircularProgress,
  Paper,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { cyan, deepOrange, deepPurple, lightBlue, pink, teal } from '@mui/material/colors';
import { Provider } from 'react-redux';

import storage from './storage';
import { useState } from 'react';

// lazy loading functionality use for roting
const Notfound = React.lazy(() => import('./Component/Notfound/Notfound'));
const Signup = React.lazy(() => import('./Component/Signup/Signup'));
const Login = React.lazy(() => import('./Component/Login/Login'));
const AdminPanel = React.lazy(() => import('./Component/AdminPanel/AdminPanel'));
const Calender = React.lazy(() => import('./Component/AdminPanel/Apps/Calender/Calender'));
const Notes = React.lazy(() => import('./Component/AdminPanel/Apps/Notes/Notes'));
const Modern = React.lazy(() => import('./Component/AdminPanel/Dashboard/Modern/Modern'));
const Forgot = React.lazy(() => import('./Component/Forgot/Forgot'));
const AuthGuard = React.lazy(() => import('./Gaurd/AuthGuard'));

const App = () => {

  const [mode, setMode] = useState('light');

  storage.subscribe(() => {
    const { adminReducer } = storage.getState();

    adminReducer.dark ? setMode('dark') : setMode('light');
  })

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: deepPurple,
      success: cyan,
      error: pink,
      secondary: teal,
      warning: deepOrange,
      info: lightBlue
    },
    typography: {
      fontFamily: 'Poppins'
    }
  })

  const Loader = () => {
    return (
      <CircularProgress
        color='info'
        className='loader'
      />
    );
  }

  const design = (
    <>
      <Provider store={storage}>
        <ThemeProvider theme={theme}>
          <Paper sx={{
            minHeight: '100vh'
          }}>
            <Router>
              <Routes>
                <Route path='/' element={
                  <React.Suspense fallback={<Loader />}>
                    <Signup />
                  </React.Suspense>
                } />
                <Route path='/login' element={
                  <React.Suspense fallback={<Loader />}>
                    <Login />
                  </React.Suspense>
                } />
                <Route path='/forgot-password' element={
                  <React.Suspense fallback={<Loader />}>
                    <Forgot />
                  </React.Suspense>
                } />
                <Route element={
                  <React.Suspense fallback={<Loader />}>
                    <AuthGuard />
                  </React.Suspense>
                }>
                  <Route path='/admin-panel' element={
                    <React.Suspense fallback={<Loader />}>
                      <AdminPanel />
                    </React.Suspense>
                  }>
                    <Route path='dashboard/modern' element={
                      <React.Suspense fallback={<Loader />}>
                        <Modern />
                      </React.Suspense>
                    } />
                    <Route path='apps/calender' element={
                      <React.Suspense fallback={<Loader />}>
                        <Calender />
                      </React.Suspense>
                    } />
                    <Route path='apps/notes' element={
                      <React.Suspense fallback={<Loader />}>
                        <Notes />
                      </React.Suspense>
                    } />
                    <Route path='login' element={
                      <React.Suspense fallback={<Loader />}>
                        <Login />
                      </React.Suspense>
                    } />
                    <Route path='*' element={
                      <React.Suspense fallback={<Loader />}>
                        <Notfound />
                      </React.Suspense>
                    } />
                  </Route>
                </Route>
                <Route path='/*' element={
                  <React.Suspense fallback={<Loader />}>
                    <Notfound />
                  </React.Suspense>
                } />
              </Routes>
            </Router>
          </Paper>
        </ThemeProvider>
      </Provider>
    </>
  );
  return design;
}

export default App;