import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GuestRoute from './components/GuestRoute';
import { ToastProvider } from './contexts/ToastContext';
import Toast from './components/Toast';

function App() {
  return (
    <ToastProvider>
      <Toast />
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
    </ToastProvider>
  );
}

export default App;
