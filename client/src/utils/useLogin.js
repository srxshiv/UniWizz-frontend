import axios from "axios";
import { loginState } from "../store/loginState";
import { base_url } from "../App";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const token = localStorage.getItem("unikart-auth");
  const setLogin = useSetRecoilState(loginState)
  const navigate = useNavigate();

  useEffect(()=>{
    const checkAuth = async ()=>{
      try {
        const response = await axios.post(`${base_url}/user/auth-check`, {} ,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setLogin({
            isLoading: false,
            fname : response.data.fname ,
            username : response.data.username ,
            _id : response.data._id
          });
        }
        else{
          setLogin({
            isLoading : false ,
            fname : null ,
            username : null , 
            _id : null
          })
          navigate('/login')
        }
      }
      catch (error){
        if(error.response.status ===429){
          alert("You are sending too many requests! , wait for sometime")
        }
        console.error(error)
        setLogin({
          isLoading : false ,
          fname : null ,
          username : null ,
          _id : null
        })
      }
    }
    if(token) checkAuth() ;
    else setLogin({
      isLoading : false ,
      fname : null ,
      username : null , 
      _id : null
    }) ;
  } , [setLogin , token])
}
