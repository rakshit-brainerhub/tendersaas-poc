import { Routes, Route } from 'react-router-dom';
import { Home } from './Components/Home';
import { Login } from './Components/Login';
import { SignUp } from './Components/SignUp';
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from './Components/ProtectedRoute';
import { AdminView } from './pages/AdminView';
import OrderForm from './Components/OrderForm';

function App() {
  return (
    <div className="bg-slate-300 h-screen text-black flex">
      <AuthProvider>
        <Routes>
          <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/order' element={<OrderForm />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/adminView' element={<ProtectedRoute> <AdminView /> </ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;