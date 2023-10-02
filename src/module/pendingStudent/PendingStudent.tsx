"use client";

import { NotAvailable } from "@/commonComponents/Alerts";
import StudentFilterbar from "@/commonComponents/StudentFilterbar";
import { ApiConstant } from "@/constant/applicationConstant";
import authClient from "@/network/authClient";
import { StudentType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import PendingStudentHead from "./component/PendingStudentHead";

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
      {pendingStudentList ? (
        <>
          <StudentFilterbar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            getPendingStudentList={getPendingStudentList}
          />
          <PendingStudentHead
            pendingStudentList={pendingStudentList}
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
