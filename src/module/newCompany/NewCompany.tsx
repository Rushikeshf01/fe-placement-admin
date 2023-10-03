"use client";

import React, { useState } from "react";
import NewCompanyInputs from "./component/NewCompanyInputs";
import { NewCompanyType } from "@/utils/types";
import NewCompanyDescription from "./component/NewCompanyDescription";
import { Button } from "@mui/material";
import { joiUtils } from "@/utils/joiValidation";
import { ToastErrorMessage, ToastSuccessMessage } from "@/utils/toastifyAlerts";
import authClient from "@/network/authClient";
import { ApiConstant } from "@/constant/applicationConstant";

const NewCompany = () => {
  const [newCompanyInput, setNewCompanyInput] = useState<NewCompanyType>({
    name: "",
    location: "",
    website: "",
    deadline: "",
    description: "",
  });

  const handleOnClick = () => {
    const { status, message } =
      joiUtils.validateNewCompanyData(newCompanyInput);
    if (status) {
      callNewCompanyAddAPI();
    } else {
      ToastErrorMessage(message);
    }
  };

  const callNewCompanyAddAPI = async () => {
    const res = await authClient.post(ApiConstant.ADD_COMPANY_DETAIL, {
      name: newCompanyInput.name,
      location: newCompanyInput.location,
      website: newCompanyInput.website,
      deadline: newCompanyInput.deadline,
      description: newCompanyInput.description,
    });
    ToastSuccessMessage("Company added successfully");
  };

  return (
    <div className="p-3 grid grid-cols-1 gap-4">
      <NewCompanyInputs
        newCompanyInput={newCompanyInput}
        setNewCompanyInput={setNewCompanyInput}
      />
      <NewCompanyDescription
        newCompanyInput={newCompanyInput}
        setNewCompanyInput={setNewCompanyInput}
      />
      <Button onClick={handleOnClick} variant="contained">
        Add company
      </Button>
    </div>
  );
};

export default NewCompany;
