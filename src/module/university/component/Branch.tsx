"use client";

import { NotAvailable } from "@/commonComponents/Alerts";
import { ApiConstant } from "@/constant/applicationConstant";
import authClient from "@/network/authClient";
import { ToastSuccessMessage } from "@/utils/toastifyAlerts";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

interface BranchItemType {
  id: string;
  name: string;
}

const Branch = () => {
  const [branchType, setBranchType] = useState<BranchItemType[]>();

  useEffect(() => {
    getBranchTypes();
  }, []);

  const getBranchTypes = async () => {
    const res = await authClient.get(ApiConstant.BRANCH_TYPE);
    setBranchType(res.data);
  };
  return (
    <div className="p-3">
      {branchType ? (
        <>
          <p className="mb-6 text-3xl font-semibold">Branch List</p>
          <div className="grid grid-cols-2 items-center mb-4 gap-3">
            {branchType.map((item, index) => (
              <BranchSingleInput
                item={item}
                branchType={branchType}
                setBranchType={setBranchType}
                key={`branch-single-input-type-index:${index}`}
              />
            ))}
            <BranchSingleInput
              item={{ id: "", name: "" }}
              addNewInput
              branchType={branchType}
              setBranchType={setBranchType}
            />
          </div>
        </>
      ) : (
        <NotAvailable label="Branches" />
      )}
    </div>
  );
};

const BranchSingleInput = (props: {
  item: BranchItemType;
  branchType: BranchItemType[];
  setBranchType: any;
  addNewInput?: true;
}) => {
  const [branchSingleInput, setBranchSingleInput] = useState(props.item);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setBranchSingleInput((prevState) => ({ ...prevState, name: value }));
  };

  const handleAdd = async () => {
    const res = await authClient.post(ApiConstant.BRANCH_TYPE, {
      name: branchSingleInput.name,
    });
    props.setBranchType((prevState: BranchItemType[]) => [
      ...prevState,
      res.data,
    ]);
    ToastSuccessMessage("Branch successfully added.");
    setBranchSingleInput({ id: "", name: "" });
  };

  const handleUpdate = async () => {
    const res = await authClient.put(
      `${ApiConstant.BRANCH_TYPE}${branchSingleInput.id}/`,
      {
        id: branchSingleInput.id,
        name: branchSingleInput.name,
      }
    );
    ToastSuccessMessage("Branch successfully updated.");
  };

  const handleDelete = async () => {
    const res = await authClient.delete(
      `${ApiConstant.BRANCH_TYPE}${branchSingleInput.id}/`
    );
    props.setBranchType(
      props.branchType.filter((item) => item.id !== branchSingleInput.id)
    );
    ToastSuccessMessage("Branch successfully deleted.");
  };

  return (
    <>
      <TextField
        value={branchSingleInput.name}
        name="name"
        label="Branch name"
        onChange={handleOnChange}
        required
        fullWidth
        variant="outlined"
        size="small"
      />
      <div>
        {props.addNewInput ? (
          <Button
            onClick={handleAdd}
            color="success"
            variant="contained"
            size="small"
          >
            Add
          </Button>
        ) : (
          <>
            <Button
              onClick={handleUpdate}
              className="mr-3"
              variant="contained"
              size="small"
            >
              Update
            </Button>
            <Button
              onClick={handleDelete}
              color="error"
              variant="outlined"
              size="small"
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default Branch;
