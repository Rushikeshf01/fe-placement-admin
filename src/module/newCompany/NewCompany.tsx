"use client";

import React, { useState } from "react";
import NewCompanyInputs from "./component/NewCompanyInputs";
import { NewCompanyType } from "@/utils/types";

const NewCompany = () => {
  const [newCompanyInput, setNewCompanyInput] = useState<NewCompanyType>({
    name: "",
    location: "",
    website: "",
    deadline: "",
    description: "",
  });

  return (
    <div className="p-3">
      <NewCompanyInputs
        newCompanyInput={newCompanyInput}
        setNewCompanyInput={setNewCompanyInput}
      />
    </div>
  );
};

export default NewCompany;
