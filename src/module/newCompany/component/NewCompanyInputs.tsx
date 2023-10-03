import { NewCompanyType } from "@/utils/types";
import { TextField } from "@mui/material";
import React from "react";

const NewCompanyInputs = (props: {
  newCompanyInput: NewCompanyType;
  setNewCompanyInput: any;
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    props.setNewCompanyInput((prevState: NewCompanyType) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <TextField
        value={props.newCompanyInput.name}
        name="name"
        label="Name"
        onChange={handleOnChange}
        required
      />
      <TextField
        value={props.newCompanyInput.location}
        name="location"
        label="Location"
        onChange={handleOnChange}
        required
      />
      <TextField
        value={props.newCompanyInput.website}
        name="website"
        label="Website"
        onChange={handleOnChange}
        required
      />
      <TextField
        value={props.newCompanyInput.deadline}
        name="deadline"
        label="Deadline"
        type="date"
        onChange={handleOnChange}
        required
      />
    </div>
  );
};

export default NewCompanyInputs;
