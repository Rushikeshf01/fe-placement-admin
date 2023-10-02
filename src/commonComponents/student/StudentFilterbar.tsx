import { Search } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React from "react";

const StudentFilterbar = (props: {
  searchValue: string;
  getStudentList: any;
  setSearchValue: any;
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    props.setSearchValue(value);
  };

  return (
    <div className="my-2">
      <TextField
        value={props.searchValue}
        onChange={handleOnChange}
        name="searchValue"
        className="mr-4"
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => props.getStudentList()} type="button">
              <Search />
            </IconButton>
          ),
        }}
        fullWidth
        placeholder="Search with name, mobile, enrollment, email, college, branch"
      />
    </div>
  );
};

export default StudentFilterbar;
