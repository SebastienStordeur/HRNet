import React, { useState } from "react";
import { departments, states } from "../../../utils/datalist";
import useInput from "../../../Hooks/useInput";
import Modal from "../../Modal/Modal";
import Select from "../../Select/Select";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import InputValidator from "../Inputvalidator/InputValidator";
import Label from "./Label";

const letterRegex: RegExp =
  /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
const numberRegex: RegExp = /^\d+$/;
const isNotEmpty: any = (value: string) => value.trim() !== "";

const isValidText: any = (value: string) =>
  letterRegex.test(value) && isNotEmpty && value.length > 2;

const isValidNumber: any = (value: string) =>
  numberRegex.test(value) && isNotEmpty;

const CreateEmployeeForm: React.FC = () => {
  const {
    value: enteredFirstname,
    isValid: enteredFirstnameIsValid,
    hasError: firstnameInputHasError,
    valueChangeHandler: firstnameChangeHandler,
    inputBlurHandler: firstnameBlurHandler,
    reset: resetFirstnameInput,
  } = useInput(isValidText);

  console.log(firstnameInputHasError);
  const {
    value: enteredLastname,
    isValid: enteredLastameIsValid,
    hasError: lastnameInputHasError,
    valueChangeHandler: lastnameChangeHandler,
    inputBlurHandler: lastnameBlurHandler,
    reset: resetLastnameInput,
  } = useInput(isValidText);

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useInput(isValidText);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useInput(isValidText);

  const {
    value: enteredZip,
    isValid: enteredZipIsValid,
    hasError: zipInputHasError,
    valueChangeHandler: zipChangeHandler,
    inputBlurHandler: zipBlurHandler,
    reset: resetZipInput,
  } = useInput(isValidNumber);

  let formIsValid: boolean = false;

  if (
    enteredFirstnameIsValid &&
    enteredLastameIsValid &&
    enteredStreetIsValid &&
    enteredCityIsValid &&
    enteredZipIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler: (event: React.FormEvent<HTMLFormElement>) => void = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!formIsValid) return;

    setShowModal((prevValue) => !prevValue);
    resetFirstnameInput();
    resetLastnameInput();
    resetStreetInput();
    resetCityInput();
    resetZipInput();
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
                onBlur={firstnameBlurHandler}
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
                onBlur={lastnameBlurHandler}
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
                value={enteredStreet}
                onChange={streetChangeHandler}
                onBlur={streetBlurHandler}
              />
            </Label>
            {streetInputHasError && <p>Error</p>}
          </InputValidator>
          <InputValidator>
            <Label htmlFor="city">
              City
              <Input
                id="city"
                name="city"
                type="text"
                value={enteredCity}
                onChange={cityChangeHandler}
                onBlur={cityBlurHandler}
              />
            </Label>
            {cityInputHasError && <p>Error</p>}
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
                value={enteredZip}
                onChange={zipChangeHandler}
                onBlur={zipBlurHandler}
              />
            </Label>
            {zipInputHasError && <p>Error</p>}
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
