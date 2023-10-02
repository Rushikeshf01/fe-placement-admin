import StudentPagination from "@/commonComponents/StudentPagination";
import { StudentType } from "@/utils/types";
import React from "react";
import PendingStudentBody from "./PendingStudentBody";

const PendingStudentHead = (props: {
  pendingStudentList: StudentType[];
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
            <th className="p-2">Email</th>
            <th className="p-2">Enrollment number</th>
            <th className="p-2">Profile pic</th>
          </tr>
        </thead>
        <tbody>
          {props.pendingStudentList.map((item, index) => (
            <PendingStudentBody
              studentDetail={item}
              key={`pending-student-list-index:${index}`}
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

export default PendingStudentHead;
