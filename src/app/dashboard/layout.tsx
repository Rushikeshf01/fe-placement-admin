"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { facultyProfile } from "@/store/slice/facultySlice";
import appClient from "@/network/appClient";
import { ApiConstant } from "@/constant/applicationConstant";
import Sidebar from "@/commonComponents/sidebar/Sidebar";
import Navbar from "@/commonComponents/navbar/Navbar";
import { AlertForFaculty } from "@/commonComponents/alert/Alerts";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    getDashboardProfile();
  }, []);

  const getDashboardProfile = async () => {
    const res = await appClient.get(
      `${ApiConstant.GET_FACULTY_PROFILE}${user.id}`
    );
    dispatch(facultyProfile(res.data));
  };

  const showHideSidebar = () => {
    setToggleSidebar(!toggleSidebar);
  };
  return (
    <>
      <Navbar showHideSidebar={showHideSidebar} />
      <div className={`mt-[70px] ${toggleSidebar ? "ml-[220px]" : "ml-[0px]"}`}>
        {toggleSidebar && <Sidebar />}
        <AlertForFaculty completeAlert />
        {children}
      </div>
    </>
  );
};

export default DashboardLayout;
