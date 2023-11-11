import 'material-icons/iconfont/material-icons.css';
import '@fontsource/poppins/500.css';
import 'react-bootstrap-sweetalert';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import {
  Paper,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { cyan, deepOrange, deepPurple, lightBlue, pink, teal } from '@mui/material/colors';
import { Provider } from 'react-redux';

import Notfound from './Component/Notfound/Notfound';
import Signup from './Component/Signup/Signup';
import Login from './Component/Login/Login';
import AdminPanel from './Component/AdminPanel/AdminPanel';
import Calender from './Component/AdminPanel/Apps/Calender/Calender';
import Notes from './Component/AdminPanel/Apps/Notes/Notes';
import Modern from './Component/AdminPanel/Dashboard/Modern/Modern';
import AuthGuard from './Gaurd/AuthGuard';
import storage from './storage';
import Forgot from './Component/Forgot/Forgot';
import { useState } from 'react';

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

  const design = (
    <>
      <Provider store={storage}>
        <ThemeProvider theme={theme}>
          <Paper sx={{
            minHeight: '100vh'
          }}>
            <Router>
              <Routes>
                <Route path='/' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/forgot-password' element={<Forgot />} />
                <Route element={<AuthGuard />}>
                  <Route path='/admin-panel' element={<AdminPanel />}>
                    <Route path='dashboard/modern' element={<Modern />} />
                    <Route path='apps/calender' element={<Calender />} />
                    <Route path='apps/notes' element={<Notes />} />
                    <Route path='login' element={<Login />} />
                    <Route path='*' element={<Notfound />} />
                  </Route>
                </Route>
                <Route path='/*' element={<Notfound />} />
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