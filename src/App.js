import './App.css';
import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom';
import Login from './components/user/Login';
import RootLayout from './layouts/RootLayout';
import RegistrationForm from './components/user/RegistrationForm';
import NotFound from './components/NotFound';
import Home from './components/Home';
import RequireAuth from './auth/RequireAuth';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<RegistrationForm />} />
      <Route path="*" element={<NotFound />} />

      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="home" element={<Home />} />
      </Route>
      
    </Route>
  )
)

function App() {
  //console.log(process.env);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
