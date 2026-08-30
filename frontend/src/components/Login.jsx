import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
// import Logo from "../assets/Logo.png";
import InputBox from "./Input";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import LoginSvg from "../assets/Login.svg";
import { FetchData } from "../utils/FetchFromApi";
import { useRef } from "react";
import { useToast } from "./hooks/ToastContext";
import { parseErrorMessage } from "../utils/parseErrorMessage";
import OtpVerificationPopup from "./ui/OtpVerificationPopup";
import { useDispatch } from "react-redux";
import { addUser, clearUser } from "../redux/slice/authSlice";

const Login = ({ onRegister }) => {
  const navigate = useNavigate();
  const formRef = useRef();
  const { userType } = useParams("");
  const { alertSuccess, alertError, alertInfo } = useToast({});
  const [data, setData] = useState();
  const [otpPopup, setOtpPopup] = useState(false);
  const [otpNumber, setOTPNumber] = useState("");
  const [loginWithPassword, setLoginWithPassword] = useState(false);
  const dispatch = useDispatch();

  const handleLoginWithOtp = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(formRef.current);
      const response = await FetchData(`${userType}/login`, "post", formData);
      if (response.data.data.otpStatus === true) {
        setOtpPopup(true);
        formRef.current.reset();
        setData(response.data.data);
        setOTPNumber(response.data.data.otp);
      }
      alertInfo(response.data.message);
    } catch (err) {
      alertError(err?.response?.data);
    }
  };

  const handleLoginWithPassword = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(formRef.current);
      const response = await FetchData(
        `${userType}/login/via/password`,
        "post",
        formData,
      );
      const { user, tokens } = response.data.data;

      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      localStorage.setItem("role", user.role);

      dispatch(clearUser());
      dispatch(addUser(user));
      formRef.current.reset();
      navigate(`/dashboard`);
      alertInfo(response.data.message);
    } catch (err) {
      alertError(err?.response?.data);
    }
  };

  return (
    <div className="w-full  rounded-3xl flex justify-center items-center lg:px-10 px-2 h-[90vh]">
      <div className="shadow-xl border border-neutral-100 rounded-3xl h-full w-full flex flex-row justify-center items-center lg:p-10 p-2">
        {" "}
        <div className="w-1/2 h-full hidden lg:flex justify-center items-center">
          <img src={LoginSvg} alt="Login" className="w-[70%]" />
        </div>
        <div className="lg:w-1/2 w-full lg:border border-neutral-100 lg:shadow-xl rounded-xl py-4 justify-center items-center flex">
          <div className="w-full lg:w-fit">
            {" "}
            {/* Logo */}
            <div className="flex justify-center">
              <img
                src={
                  "https://ik.imagekit.io/parikrama/media-library-export-18-7-2026-10-8-9-690%20(1)/Logo.png?updatedAt=1784349570750"
                }
                alt="Logo"
                className="w-24 h-24 object-contain"
              />
            </div>
            {/* Heading */}
            <div className="text-center mt-4">
              <h1 className="text-4xl font-serif text-[#5B1933]">
                Welcome Back!
              </h1>

              <p className="text-gray-500 mt-2">
                Login as{" "}
                <span className="capitalize font-semibold text-black">
                  {userType}
                </span>{" "}
                & continue to Stylist Finder
              </p>
            </div>
            {/* Form */}
            <form
              ref={formRef}
              onSubmit={
                loginWithPassword === true
                  ? handleLoginWithPassword
                  : handleLoginWithOtp
              }
              className="mt-8"
            >
              <InputBox
                label="contact Number"
                placeholder="Enter your contact number"
                name="contactNumber"
                type="text"
              />
              {loginWithPassword === true ? (
                <InputBox
                  required={loginWithPassword === true ? true : false}
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              ) : (
                ""
              )}

              <Button type="submit" LabelName="Login" className="w-full" />
            </form>
            {/* Register */}
            <p className="text-center mt-8 text-gray-600">
              <button
                onClick={() => setLoginWithPassword(true)}
                className="text-[#8B2954] font-semibold hover:underline cursor-pointer"
              >
                Login with password
              </button>
            </p>
            <p className="text-center mt-8 text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate(`/auth/${"register"}/${userType}`)}
                className="text-[#8B2954] font-semibold hover:underline cursor-pointer"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
      <OtpVerificationPopup
        isOpen={otpPopup}
        userType={userType}
        onClose={() => setOtpPopup(false)}
        data={data}
        verificationType="loginVerification"
        otpNumber={otpNumber}
      />
    </div>
  );
};

export default Login;
