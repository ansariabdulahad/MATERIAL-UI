import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Notfound from './Component/Notfound/Notfound';
import Signup from './Component/Signup/Signup';
import Login from './Component/Login/Login';
import AdminPanel from './Component/AdminPanel/AdminPanel';
import Dashboard from './Component/AdminPanel/Dashboard/Dashboard';

const App = () => {
  const design = (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin-panel' element={<AdminPanel />}>
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
          <Route path='/*' element={<Notfound />} />
        </Routes>
      </Router>
    </>
  );
  return design;
}

export default App;