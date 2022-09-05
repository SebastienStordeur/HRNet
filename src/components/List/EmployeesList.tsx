import React from "react";
import Employee from "./Employee";

const EmployeesList: React.FC = () => {
  return (
    <section id="employee-list" className="max-w-[1110px] mx-auto mt-5 ">
      <div className="grid grid-cols-9 text-white bg-blue h-10 font-medium text-center py-1.5">
        <span>First Name</span>
        <span>Last Name</span>
        <span>Start Date</span>
        <span>Department</span>
        <span>Date of Birth</span>
        <span>Street</span>
        <span>City</span>
        <span>State</span>
        <span>Zip Code</span>
      </div>
      <div>
        <Employee />
        <Employee />
        <Employee />
      </div>
    </section>
  );
};

export default EmployeesList;
