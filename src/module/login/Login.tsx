"use client";

import {
  ApiConstant,
  ApplicationConstant,
} from "@/constant/applicationConstant";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { LoginInputType } from "@/utils/types";
import { joiUtils } from "@/utils/joiValidation";
import authClient from "@/network/authClient";
import { useDispatch, useSelector } from "react-redux";
import { initialLoginState } from "@/store/slice/loginSlice";
import { RootState } from "@/store/store";
import { ToastErrorMessage } from "@/utils/toastifyAlerts";
import { useRouter } from "next/navigation";
import Captcha from "@/commonComponents/captcha/Captcha";
import Image from "next/image";
import logo from "../../../public/sou-logo.png";

const Login = () => {
  const [loginInputState, setLoginInputState] = useState<LoginInputType>({
    email: "",
    password: "",
    captcha: "",
  });
  const captcha = useSelector((state: RootState) => state.extra.captchaValue);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setLoginInputState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClickLogin = () => {
    const { status, message } = joiUtils.validateLoginData(loginInputState);
    if (status) {
      if (captcha === loginInputState.captcha) {
        callLoginAPI();
      } else {
        ToastErrorMessage("Invalid captcha value");
      }
    } else {
      ToastErrorMessage(message);
    }
  };

  const callLoginAPI = async () => {
    const response = await authClient.post(ApiConstant.AUTHENTICATE_USER, {
      email: loginInputState.email,
      password: loginInputState.password,
    });
    if (response.data.user.isStaff) {
      dispatch(
        initialLoginState({
          access: response.data.access,
          refresh: response.data.refresh,
          user: response.data.user,
          isAuthenticated: true,
        })
      );
      localStorage.setItem(
        ApplicationConstant.REFRESH_TOKEN,
        response.data.refresh
      );
      router.push(ApplicationConstant.DASHBOARD_PATH);
    } else {
      ToastErrorMessage("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center	items-center h-screen">
      <div className="flex flex-col items-center p-5 border rounded-md bg-gray-50 shadow-lg">
        <Image src={logo} alt="Silver Oak University" className="w-[180px]" />
        <p className="mt-4 text-3xl font-bold">Faculty Login</p>
        <div className="grid grid-cols-2 gap-4 mt-5">
          <TextField
            value={loginInputState.email}
            name="email"
            label="Email"
            type="email"
            onChange={handleOnChange}
            required
            variant="standard"
          />
          <TextField
            value={loginInputState.password}
            name="password"
            label="Password"
            type="password"
            onChange={handleOnChange}
            required
            variant="standard"
          />
          <TextField
            value={loginInputState.captcha}
            name="captcha"
            label="Enter captcha here"
            onChange={handleOnChange}
            required
            variant="standard"
          />
          <Captcha className="" />
        </div>
        <Button
          variant="outlined"
          className="mt-4"
          onClick={handleClickLogin}
          fullWidth
        >
          Log in
        </Button>
      </div>
    </div>
  );
};

export default Login;
