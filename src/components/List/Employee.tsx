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
  return (
    <td className="odd:bg-grey even:bg-light-grey w-full grid grid-cols-9 h-10 py-1.5 text-center">
      <td>{props.employee.firstName}</td>
      <td>{props.employee.lastName}</td>
      <td>{props.employee.startDate}</td>
      <td>{props.employee.department}</td>
      <td>{props.employee.dateOfBirth}</td>
      <td>{props.employee.street}</td>
      <td>{props.employee.city}</td>
      <td>{props.employee.state}</td>
      <td>{props.employee.zipCode}</td>
    </td>
  );
};

export default Employee;
