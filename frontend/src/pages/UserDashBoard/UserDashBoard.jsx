import React from "react";
import UserSideBar from "../../components/UserDashComp/UserSideBar";

import UserProfile from "../../components/UserDashComp/UserAnalysisChart";

const UserDashBoard = () => {
  return (
    <div className="flex w-full h-[100vh]">
      <UserSideBar />
      <div className="w-full">
        <UserProfile />
      </div>
    </div>
  );
};

export default UserDashBoard;
