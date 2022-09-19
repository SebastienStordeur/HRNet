import React, { useState } from "react";
import { departments, states } from "../../../utils/datalist";
import useInput from "../../../Hooks/useInput";
import Modal from "../../Modal/Modal";
import Select from "../../Select/Select";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import InputValidator from "../Inputvalidator/InputValidator";
import Label from "./Label";

const CreateEmployeeForm: React.FC = () => {
  const letterRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  const isNotEmpty: any = (value: string) => value.trim() !== "";

  const isValidText: any = (value: string) => {
    letterRegex.test(value) && isNotEmpty();
  };

  const {
    value: enteredFirstname,
    isValid: enteredFirstnameIsValid,
    hasError: firstnameInputHasError,
    valueChangeHandler: firstnameChangeHandler,
    reset: resetFirstnameInput,
  } = useInput(isValidText);

  const {
    value: enteredLastname,
    isValid: enteredLastameIsValid,
    hasError: lastnameInputHasError,
    valueChangeHandler: lastnameChangeHandler,
    reset: resetLastnameInput,
  } = useInput(isValidText);

  let formIsValid: boolean = false;

  if (enteredFirstnameIsValid && enteredLastameIsValid) {
    formIsValid = true;
  }

  const submitHandler: (event: React.FormEvent<HTMLFormElement>) => void = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!formIsValid) return;

    setShowModal((prevValue) => !prevValue);
  };

  const [showModal, setShowModal] = useState<boolean>(false);

  const showModalHandler = () => {
    setShowModal((prevValue) => !prevValue);
  };

  const handleChange: () => void = () => {};

  return (
    <React.Fragment>
      <form
        className="max-w-[1110px] px-8 mt-20 mx-auto grid grid-cols-2 gap-8"
        onSubmit={submitHandler}
      >
        <div className="bg-blue w-full h-auto p-8">
          <InputValidator>
            <Label htmlFor="firstName">
              FirstName
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={enteredFirstname}
                onChange={firstnameChangeHandler}
              />
            </Label>
            {firstnameInputHasError && <p>error</p>}
          </InputValidator>
          <InputValidator>
            <Label htmlFor="name">
              Last Name
              <Input
                id="name"
                name="name"
                type="text"
                value={enteredLastname}
                onChange={lastnameChangeHandler}
              />
            </Label>
            {lastnameInputHasError && <p>Error</p>}
          </InputValidator>
          <InputValidator>
            <Label htmlFor="birth">
              Date of birth
              <Input
                id="birth"
                name="birth"
                type="date"
                value=""
                onChange={handleChange}
                onBlur={handleChange}
              />
            </Label>
          </InputValidator>
          <InputValidator>
            <Label htmlFor="startDate">
              Start Date
              <Input
                id="start"
                name="startDate"
                type="date"
                value=""
                onChange={handleChange}
                onBlur={handleChange}
              />
            </Label>
          </InputValidator>
        </div>
        <div className="bg-blue w-full h-auto p-8">
          <h2 className="text-white font-bold uppercase text-2xl">Address</h2>
          <InputValidator>
            <Label htmlFor="street">
              Street
              <Input
                id="street"
                name="street"
                type="text"
                value=""
                onChange={handleChange}
                onBlur={handleChange}
              />
            </Label>
          </InputValidator>
          <InputValidator>
            <Label htmlFor="city">
              <Input
                id="city"
                name="city"
                type="text"
                value=""
                onChange={handleChange}
                onBlur={handleChange}
              />
            </Label>
          </InputValidator>
          <InputValidator>
            <Label htmlFor="state">
              State
              <Select data={states} headline="State"></Select>
            </Label>
          </InputValidator>
          <InputValidator>
            <Label htmlFor="zip">
              Zip Code
              <Input
                id="zip"
                name="zip"
                type="number"
                value=""
                onChange={handleChange}
                onBlur={handleChange}
              />
            </Label>
          </InputValidator>
          <InputValidator>
            <Label htmlFor="department">
              Department
              <Select data={departments} headline="Department"></Select>
            </Label>
          </InputValidator>
        </div>
        <div className="relative">
          <Button type="submit">Save</Button>
        </div>
      </form>
      {showModal && <Modal onClick={showModalHandler} />}
    </React.Fragment>
  );
};

export default CreateEmployeeForm;
