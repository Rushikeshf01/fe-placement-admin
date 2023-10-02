import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

export const AlertForFaculty = (props: { completeAlert?: boolean }) => {
  const faculty = useSelector((state: RootState) => state.faculty);

  return (
    <div>
      {props.completeAlert && (
        <IsCompleteForFaculty
          name={`${faculty.firstName.toUpperCase()} ${faculty.lastName.toUpperCase()}`}
        />
      )}
    </div>
  );
};

export const NotAvailable = (props: { label?: string }) => {
  return (
    <div className="p-3 text-red-400 font-medium">
      {props.label ? props.label : "Details"} not available
    </div>
  );
};

const IsCompleteForFaculty = (props: { name: string }) => {
  return (
    <div className="w-full p-5 text-white bg-red-500">
      <span className="font-semibold">{props.name}</span> your profile is
      pending, please complete it as soon as possible.
    </div>
  );
};
