import React from "react";

interface IEmployee {
  employee: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    startDate: string;
    department: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

const Employee: React.FC<IEmployee> = (props) => {
  console.log("props", props);
  return (
    <div className="odd:bg-grey even:bg-light-grey grid grid-cols-9 h-10 py-1.5 text-center">
      <span>{props.employee.firstName}</span>
      <span>{props.employee.lastName}</span>
      <span>{props.employee.startDate}</span>
      <span>{props.employee.department}</span>
      <span>{props.employee.dateOfBirth}</span>
      <span>{props.employee.street}</span>
      <span>{props.employee.city}</span>
      <span>{props.employee.state}</span>
      <span>{props.employee.zipCode}</span>
    </div>
  );
};

export default Employee;
