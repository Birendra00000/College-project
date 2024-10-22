import React from "react";
import AdminSideBar from "../../components/AdminDashComp/AdminSideBar";
import AdminNavbar from "../../components/AdminDashComp/AdminNavbar";
import AdminAnalysisChart from "../../components/AdminDashComp/AdminAnalysisChart";

const AdminDashBoard = () => {
  return (
    <>
      <div className="flex w-full h-[100vh]">
        <AdminSideBar />
        <div className="w-full">
          <AdminNavbar />
          <AdminAnalysisChart />
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;
