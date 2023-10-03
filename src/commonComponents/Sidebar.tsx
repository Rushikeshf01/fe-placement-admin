"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Business,
  ExpandLess,
  ExpandMore,
  Home,
  Person,
} from "@mui/icons-material";
import { NestedSidebarProps, SidebarRoutesType } from "@/utils/types";
import { ApplicationConstant } from "@/constant/applicationConstant";

const facultySidebarRoutes: SidebarRoutesType[] = [
  {
    path: ApplicationConstant.DASHBOARD_PATH,
    state: "Home",
    icon: <Home />,
  },
  {
    state: "Profile",
    icon: <Person />,
    path: ApplicationConstant.PROFILE_PATH,
  },
  {
    state: "Company",
    icon: <Business />,
    child: [
      { state: "Add Company", path: ApplicationConstant.NEW_COMPANY_PATH },
    ],
  },
  {
    state: "Student",
    icon: <Business />,
    child: [
      {
        state: "Pending student",
        path: ApplicationConstant.PENDING_STUDENT_PATH,
      },
      {
        state: "Verified student",
        path: ApplicationConstant.VERIFIED_STUDENT_PATH,
      },
    ],
  },
  {
    state: "University",
    icon: <Business />,
    path: ApplicationConstant.UNIVERSITY_PATH,
  },
  // {
  //   path: "/applied",
  //   state: "Applied",
  //   icon: <ApprovalIcon />,
  // },
  // {
  //   path: "/about",
  //   state: "About",
  //   icon: <InfoIcon />,
  // },
];

const Sidebar = () => {
  return (
    <div className="fixed left-0 w-[220px] h-screen p-2 bg-gray-100">
      {facultySidebarRoutes.map((item, index) => (
        <SidebarItem key={`sidebar-item-index:${index}`} item={item} />
      ))}
    </div>
  );
};

const SidebarItem = (props: { item: SidebarRoutesType }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handelNestedRoutes = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {props.item.child ? (
        <p
          onClick={handelNestedRoutes}
          className="flex m-2 p-3 px-7 cursor-pointer hover:bg-gray-200 hover:rounded-md"
        >
          {props.item.icon}
          <p className="mx-2 ">{props.item.state}</p>
          <p>
            {props.item.child && (isExpanded ? <ExpandLess /> : <ExpandMore />)}
          </p>
        </p>
      ) : (
        <Link
          href={props.item.path ? props.item.path : ""}
          className="flex m-2 p-3 px-7 hover:bg-gray-200 hover:rounded-md"
        >
          {props.item.icon}
          <p className="mx-2 ">{props.item.state}</p>
        </Link>
      )}
      {props.item.child && isExpanded && (
        <NestedSidebar subRoutes={props.item.child} />
      )}
    </div>
  );
};

const NestedSidebar = (props: { subRoutes: NestedSidebarProps[] }) => {
  return (
    <>
      {props.subRoutes.map((item, index) => (
        <div key={`sidebar-nested-route-index:${index}`}>
          <Link
            href={item.path}
            className="block m-2 ml-6 p-2 text-center hover:bg-gray-200 hover:rounded-md"
          >
            {item.state}
          </Link>
        </div>
      ))}
    </>
  );
};

export default Sidebar;
