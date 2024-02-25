import axios from "axios";
import gifImg from "../assets/images/372108180_WHATSAPP_ICON_400.gif";
import { FcGoogle } from "react-icons/fc";
import Button from "@mui/material/Button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CHECK_USER_ROUTE } from "../utils/ApiRoutes";
import { useDispatch } from "react-redux";
import { firebaseAuth } from "../utils/FirebaseConfig";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    const {
      user: { displayName: name, email, photoURL: avatar },
    } = await signInWithPopup(firebaseAuth, provider);
    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });

        if (!data.status) {
          dispatch({
            type: "loginSuccess",
            payload: {
              id:"",
              name: name,
              email: email,
              avatar: avatar,
              about: "",
            },
          });
          navigate("/onboarding");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-full flex-col gap-3 bg-slate-800 ">
      <div className="flex items-center gap-2 justify-center">
        <img
          src={gifImg}
          alt="gif"
          className=" sm:w-[300px] sm:h-[300px] w-[150px] h-[150px] object-contain"
        />
        <span className=" sm:text-7xl text-2xl text-white font-bold">
          Whatsapp
        </span>
      </div>
      <Button
        variant="contained"
        color="success"
        size="large"
        startIcon={<FcGoogle size={25} />}
        onClick={() => handleLogin()}
      >
        <span className=" text-white sm:text-2xl text-[18px]">
          Login with Google{" "}
        </span>
      </Button>
    </div>
  );
};

export default Login;
