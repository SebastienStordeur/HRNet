import React from "react";
import { Link } from "react-router-dom";
import CreateEmployeeForm from "../components/Forms/Employees/CreateEmployeeForm";
import Main from "../components/Layout/Main";

const Home: React.FC = () => {
  return (
    <Main>
      <span className="flex justify-center font-bold text-3xl mt-5">
        <Link to="/employees">See employees</Link>
      </span>
      <CreateEmployeeForm />
    </Main>
  );
};

export default Home;
