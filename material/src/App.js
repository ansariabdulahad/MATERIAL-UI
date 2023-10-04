import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

const App = () => {
  const design = (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<h1>Welcome to Home page</h1>} />
        </Routes>
      </Router>
    </>
  );
  return design;
}

export default App;