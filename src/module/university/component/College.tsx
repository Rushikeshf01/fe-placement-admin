"use client";

import { NotAvailable } from "@/commonComponents/Alerts";
import { ApiConstant } from "@/constant/applicationConstant";
import authClient from "@/network/authClient";
import { ToastSuccessMessage } from "@/utils/toastifyAlerts";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

interface CollegeItemType {
  id: string;
  name: string;
}

const College = () => {
  const [collegeType, setCollegeType] = useState<CollegeItemType[]>();

  useEffect(() => {
    getCollegeTypes();
  }, []);

  const getCollegeTypes = async () => {
    const res = await authClient.get(ApiConstant.COLLEGE_TYPE);
    setCollegeType(res.data);
  };

  return (
    <div className="p-3">
      {collegeType ? (
        <>
          <p className="mb-6 text-3xl font-semibold">College List</p>
          <div className="grid grid-cols-2 items-center mb-4 gap-3">
            {collegeType.map((item, index) => (
              <CollegeSingleInput
                item={item}
                collegeType={collegeType}
                setCollegeType={setCollegeType}
                key={`college-single-input-type-index:${index}`}
              />
            ))}
            <CollegeSingleInput
              item={{ id: "", name: "" }}
              addNewInput
              collegeType={collegeType}
              setCollegeType={setCollegeType}
            />
          </div>
        </>
      ) : (
        <NotAvailable label="Colleges" />
      )}
    </div>
  );
};

const CollegeSingleInput = (props: {
  item: CollegeItemType;
  collegeType: CollegeItemType[];
  setCollegeType: any;
  addNewInput?: true;
}) => {
  const [collegeSingleInput, setCollegeSingleInput] = useState(props.item);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setCollegeSingleInput((prevState) => ({ ...prevState, name: value }));
  };

  const handleAdd = async () => {
    const res = await authClient.post(ApiConstant.COLLEGE_TYPE, {
      name: collegeSingleInput.name,
    });
    props.setCollegeType((prevState: CollegeItemType[]) => [
      ...prevState,
      res.data,
    ]);
    ToastSuccessMessage("College successfully added.");
    setCollegeSingleInput({ id: "", name: "" });
  };

  const handleUpdate = async () => {
    const res = await authClient.put(
      `${ApiConstant.COLLEGE_TYPE}${collegeSingleInput.id}/`,
      {
        id: collegeSingleInput.id,
        name: collegeSingleInput.name,
      }
    );
    ToastSuccessMessage("College successfully updated.");
  };

  const handleDelete = async () => {
    const res = await authClient.delete(
      `${ApiConstant.COLLEGE_TYPE}${collegeSingleInput.id}/`
    );
    props.setCollegeType(
      props.collegeType.filter((item) => item.id !== collegeSingleInput.id)
    );
    ToastSuccessMessage("College successfully deleted.");
  };

  return (
    <>
      <TextField
        value={collegeSingleInput.name}
        name="name"
        label="College name"
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

export default College;
