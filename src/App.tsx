import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NavBar />} />
    </Routes>
  );
}

export default App;
