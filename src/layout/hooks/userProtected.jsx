import { onAuthStateChanged, getAuth} from "firebase/auth"
import {Navigate} from "react-router-dom";
import { firebaseAuth } from "../../utils/FirebaseConfig";
const AuthProvider = ({children}) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if(!user){
    return <Navigate to={"/login"} replace /> 
  }else{
   return children
  }
    // onAuthStateChanged(firebaseAuth, async (currentUser) => {
    //     if(!currentUser){
    //        return <Navigate to={"/login"} replace />
    //     }else{
    //         return children
    //     }
    // })

     
}

export default AuthProvider;