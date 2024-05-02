import './App.css'
import {Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';

import {jwtDecode} from "jwt-decode";
import {useSelector} from "react-redux";
import ProtectedRoute from './ProtectedRoute';

function App() {

  const userInfo = useSelector(state => state.auth?.userInfo);
  const accessToken = useSelector(state => state.auth.accessToken)
  if (accessToken) {
    
    console.log(jwtDecode(accessToken).exp);
  }

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute userInfo={userInfo} />}>
          <Route path="/home" element={<Home />} /> 
          <Route path="/" element={<Home />} /> 
        </Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </>
  )
}

export default App
