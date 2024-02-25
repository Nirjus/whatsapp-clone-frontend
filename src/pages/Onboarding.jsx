import React, {  useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import gifImg from "../assets/images/372108180_WHATSAPP_ICON_400.gif";
import Input from "../layout/components/Input";
import Avatars from "../layout/components/Avatar";
import defaultAvatar from "../assets/images/default_avatar.png";
import { ONBOARD_USER_ROUTE } from "../utils/ApiRoutes";
import toast from "react-hot-toast";


const Onboarding = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.initUser);
  console.log(user);
  const [name, setName] = React.useState(user?.name || "");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(user?.avatar ? user?.avatar : defaultAvatar);
   const [label, setLabel] = useState(false);

   React.useEffect(() => {
     if(!user?.email){
          navigate("/login");
     }
   },[navigate, user])

  const onBoardUserHandler = async () => {
   
      const email = user?.email;
      try {
       await axios.post(ONBOARD_USER_ROUTE,{
          email,
          name,
          about,
          avatar:image
        },{withCredentials: true}).then((res) => {
          toast.success(res.data.message);
          dispatch({
            type: "loadUserSuccess",
            payload:{
              id: res?.data?.user?.id,
              name: res?.data?.user?.name,
              email: res?.data?.user?.email,
              avatar: res?.data?.user?.avatar,
              about: res?.data?.user?.about
            }
          })
          navigate("/");
        }).catch((error) => {
          toast.error(error.response.data.message);
          setLabel(true)
        })
      } catch (error) {
        console.log(error)
      }
     
  }

  return (
    <div className=" bg-slate-800 h-screen w-full flex justify-center items-center flex-col">
      <div className=" flex items-center justify-center gap-2">
        <img
          src={gifImg}
          alt="gif"
          className=" sm:w-[300px] sm:h-[300px] w-[150px] h-[150px] object-contain"
        />
        <span className=" sm:text-7xl text-2xl text-white font-bold ">
          Whatsapp
        </span>
      </div>
      <h2 className="text-2xl text-white">Create your profile</h2>
      <div className=" flex gap-6 mt-6">
        <div className=" flex flex-col items-center justify-center mt-6 gap-6">
          <Input
            name={"Display Name"}
            state={name}
            setState={setName}
            label={label}
          />
          <Input
            name={"About"}
            state={about}
            setState={setAbout}
            label={label}
          />
          <div className=" flex items-center justify-center">
            <Button variant={"outlined"} color="success" size="large" onClick={() => onBoardUserHandler()}>Create Profile</Button>
          </div>
        </div>
        <div className=" mt-4">
          <Avatars size={"xl"} image={image} setImage={setImage} defaultImage={user?.avatar} />
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
