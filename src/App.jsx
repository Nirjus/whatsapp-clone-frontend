import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./layout/routes/Home";
import About from "./layout/routes/About";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
// import {getAuth} from "firebase/auth";
// import { useEffect } from "react";
// // import {useDispatch} from 'react-redux';
// import { loadUser } from "./redux/action/user";
// import Store from "./redux/store";
// import ProtectedRoute from "./layout/hooks/userProtected";
function App() {
// const auth = getAuth();
// const dispatch = useDispatch();

// const user = auth.currentUser;

// useEffect(() => {
//   if(user){
//     Store.dispatch(loadUser(user.email))
//   }
//   },[user])

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/onboarding" element={<Onboarding />}/>
        <Route path="*" element={<div>Route not found</div>} />
      </Routes>
     </Router>
    </>
  )
}

export default App
