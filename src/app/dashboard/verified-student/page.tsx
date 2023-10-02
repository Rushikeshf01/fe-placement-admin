"use client";

import { ApplicationConstant } from "@/constant/applicationConstant";
import VerifiedStudent from "@/module/verifiedStudent/VerifiedStudent";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const VerifiedStudentPage = () => {
  const authClient = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!authClient.isAuthenticated && !authClient.user.isStaff) {
      router.push(ApplicationConstant.LOGIN_PATH);
    }
  }, []);

  return <VerifiedStudent />;
};

export default VerifiedStudentPage;
