import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import {
  ThemeProvider,
  createTheme
} from '@mui/material';

import 'material-icons/iconfont/material-icons.css';
import '@fontsource/poppins/500.css';
import { cyan, deepOrange, deepPurple, lightBlue, pink, teal } from '@mui/material/colors';

import Notfound from './Component/Notfound/Notfound';
import Signup from './Component/Signup/Signup';
import Login from './Component/Login/Login';
import AdminPanel from './Component/AdminPanel/AdminPanel';
import Dashboard from './Component/AdminPanel/Dashboard/Dashboard';
import AuthGuard from './Gaurd/AuthGuard';

const App = () => {

  const theme = createTheme({
    palette: {
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
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route element={<AuthGuard />}>
              <Route path='/admin-panel' element={<AdminPanel />}>
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='login' element={<Login />} />
                <Route path='*' element={<Notfound />} />
              </Route>
            </Route>
            <Route path='/*' element={<Notfound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
  return design;
}

export default App;