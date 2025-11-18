import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GuestRoute from './components/GuestRoute';

function App() {
  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <GuestRoute>
            <Signup />
          </GuestRoute>
        }
      />
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route path="*" element={<NavBar />} />
    </Routes>
  );
}

export default App;
