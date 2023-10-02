"use client";

import { NotAvailable } from "@/commonComponents/Alerts";
import StudentFilterbar from "@/commonComponents/student/StudentFilterbar";
import StudentHead from "@/commonComponents/student/StudentHead";
import { ApiConstant } from "@/constant/applicationConstant";
import authClient from "@/network/authClient";
import { StudentType } from "@/utils/types";
import React, { useEffect, useState } from "react";

const PendingStudent = () => {
  const [pendingStudentList, setPendingStudentList] = useState<StudentType[]>();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getPendingStudentList();
  }, [page, rowsPerPage]);

  const getPendingStudentList = async () => {
    const res = await authClient.get(
      `${ApiConstant.GET_STUDENT_PROFILE}?page=${
        page + 1
      }&pagesize=${rowsPerPage}&search=${searchValue}&isCompleted=True`
    );
    setCount(res.data.count);
    setPendingStudentList(res.data.results);
  };

  return (
    <div className="p-3">
      {pendingStudentList && pendingStudentList.length !== 0 ? (
        <>
          <StudentFilterbar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            getStudentList={getPendingStudentList}
          />
          <StudentHead
            studentList={pendingStudentList}
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
          />
        </>
      ) : (
        <NotAvailable label="Pending students" />
      )}
    </div>
  );
};

export default PendingStudent;
