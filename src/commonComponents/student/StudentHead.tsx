import StudentPagination from "@/commonComponents/student/StudentPagination";
import { StudentType } from "@/utils/types";
import React from "react";
import StudentBody from "./StudentBody";

const StudentHead = (props: {
  studentList: StudentType[];
  count: number;
  page: number;
  rowsPerPage: number;
  setPage: any;
  setRowsPerPage: any;
}) => {
  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Mobile</th>
            <th className="p-2">Enrollment number</th>
            <th className="p-2">Email</th>
            <th className="p-2">Profile pic</th>
          </tr>
        </thead>
        <tbody>
          {props.studentList.map((item, index) => (
            <StudentBody
              studentDetail={item}
              key={`student-list-item-index:${index}`}
            />
          ))}
        </tbody>
      </table>
      <StudentPagination
        count={props.count}
        page={props.page}
        rowsPerPage={props.rowsPerPage}
        setPage={props.setPage}
        setRowsPerPage={props.setRowsPerPage}
      />
    </>
  );
};

export default StudentHead;
