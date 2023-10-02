import React from "react";
import { StudentType } from "@/utils/types";
import { Avatar } from "@mui/material";

const StudentBody = (props: { studentDetail: StudentType }) => {
  return (
    <tr className="text-center cursor-pointer hover:bg-gray-100">
      <td className="p-2">{`${props.studentDetail.firstName} ${props.studentDetail.lastName}`}</td>
      <td className="p-2">{props.studentDetail.mobile}</td>
      <td className="p-2">
        {props.studentDetail.studentDetail.enrollmentNumber}
      </td>
      <td className="p-2">{props.studentDetail.email}</td>
      <td className="p-2 flex justify-center items-center">
        <Avatar
          alt={props.studentDetail.firstName}
          src={props.studentDetail.studentDetail.profilePic}
          className="bg-[#01633B]"
        />
      </td>
    </tr>
  );
};

export default StudentBody;
