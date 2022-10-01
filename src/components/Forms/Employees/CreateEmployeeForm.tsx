import React, { useState, useContext } from "react";
import { departments, states, statesComplete } from "../../../utils/datalist";
import useInput from "../../../Hooks/useInput";
import EmployeeContext from "../../../store/EmployeeContext";
import Modal from "../../Modal/Modal";
import Button from "../../UI/Button";
import { isValidText, isValidNumber } from "../../../utils/formValidations";
import { months } from "../../../utils/months";
import FieldList from "./FieldList";
import InputField from "./InputField";
import DateField from "./DateField";

const CreateEmployeeForm: React.FC = () => {
  const employees = useContext(EmployeeContext);

  const [startWorkValue, setStartWorkValue] = useState<string>("");
  const [startCalendarIsVisible, setStartCalendarIsVisible] = useState<boolean>(false);
  const [birthValue, setBirthValue] = useState<string>("");
  const [birthCalendarIsVisible, setBirthCalendarIsVisible] = useState<boolean>(false);
  const stateLabel = document.querySelector("#state > label > div > div > ul > label");
  const departmentLabel = document.querySelector("#department > label > div > div > ul > label");

  const [departmentHasError, setDepartmentHasError] = useState<boolean>(false);
  const [stateHasError, setStateHasError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const showModalHandler: () => void = () => {
    setShowModal((prevValue) => !prevValue);
  };

  const openStartCalendarHandler: () => void = () => {
    setStartCalendarIsVisible((value) => !value);
  };
  const openBirthCalendarHandler: () => void = () => {
    setBirthCalendarIsVisible((value) => !value);
  };

  const formatDate = (value: string, dataType: string) => {
    const unformattedDate: string[] = value.toString().split(" ").splice(1, 3);
    const monthNumber = months.find((month) => month.name === unformattedDate[0]);

    if (monthNumber) {
      unformattedDate[0] = monthNumber?.number;
    }

    const formattedDate = unformattedDate.join("/");

    dataType === "birth" ? setBirthValue(formattedDate) : setStartWorkValue(formattedDate);
  };

  const {
    value: enteredFirstname,
    isValid: enteredFirstnameIsValid,
    hasError: firstnameInputHasError,
    valueChangeHandler: firstnameChangeHandler,
    inputBlurHandler: firstnameBlurHandler,
    reset: resetFirstnameInput,
  } = useInput(isValidText);

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

  const submitHandler: (event: React.FormEvent<HTMLFormElement>) => void = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const abbreviation = statesComplete.find((state) => state.name === stateLabel?.id);

    !abbreviation ? setStateHasError(true) : setStateHasError(false);
    departmentLabel?.id === "departments" ? setDepartmentHasError(true) : setDepartmentHasError(false);

    if (
      enteredFirstnameIsValid &&
      enteredLastameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredZipIsValid &&
      birthValue !== "" &&
      startWorkValue !== "" &&
      !stateHasError &&
      !departmentHasError
    ) {
      formIsValid = true;
    }

    const newEmployee = {
      firstName: enteredFirstname,
      lastName: enteredLastname,
      dateOfBirth: birthValue,
      startDate: startWorkValue,
      street: enteredStreet,
      city: enteredCity,
      state: abbreviation ? abbreviation?.abbreviation : "",
      zipCode: enteredZip,
      department: departmentLabel?.id ? departmentLabel.id : "",
    };

    if (!formIsValid) return;

    employees.addEmployee(newEmployee);

    setShowModal((prevValue) => !prevValue);
    resetFirstnameInput();
    resetLastnameInput();
    resetStreetInput();
    resetCityInput();
    resetZipInput();
    setBirthValue("");
    setStartWorkValue("");
  };

  return (
    <React.Fragment>
      <form
        className="max-w-[1110px] px-8 mt-20 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
        onSubmit={submitHandler}
      >
        <div className="bg-blue w-full h-auto p-8">
          <InputField
            label="FirstName"
            id="firstname"
            value={enteredFirstname}
            onChange={firstnameChangeHandler}
            onBlur={firstnameBlurHandler}
            hasError={firstnameInputHasError}
            type="text"
          />
          <InputField
            label="LastName"
            id="lastName"
            value={enteredLastname}
            onChange={lastnameChangeHandler}
            onBlur={lastnameBlurHandler}
            hasError={lastnameInputHasError}
            type="text"
          />
          <DateField
            id="birth"
            readonly
            value={birthValue}
            onClick={openBirthCalendarHandler}
            isVisible={birthCalendarIsVisible}
            format={formatDate}
          />
          <DateField
            id="start"
            readonly
            value={startWorkValue}
            onClick={openStartCalendarHandler}
            isVisible={startCalendarIsVisible}
            format={formatDate}
          />
        </div>
        <div className="bg-blue w-full h-auto p-8">
          <h2 className="text-white font-bold uppercase text-2xl">Address</h2>
          <InputField
            label="Street"
            id="street"
            value={enteredStreet}
            onChange={streetChangeHandler}
            onBlur={streetBlurHandler}
            hasError={streetInputHasError}
            type="text"
          />
          <InputField
            label="City"
            id="city"
            value={enteredCity}
            onChange={cityChangeHandler}
            onBlur={cityBlurHandler}
            hasError={cityInputHasError}
            type="text"
          />
          <FieldList nameId="state" label="State" id="states" inputId="state" hasError={stateHasError} data={states} />
          <InputField
            label="Zip Code"
            id="zipCode"
            value={enteredZip}
            onChange={zipChangeHandler}
            onBlur={zipBlurHandler}
            hasError={zipInputHasError}
            type="number"
          />
          <FieldList
            nameId="department"
            label="Department"
            id="departments"
            inputId="department"
            hasError={departmentHasError}
            data={departments}
          />
        </div>
        <div className="relative">
          <Button type="submit" className="uppercase tracking-widest w-full mb-6">
            Save
          </Button>
        </div>
      </form>
      {showModal && <Modal onClick={showModalHandler} />}
    </React.Fragment>
  );
};

export default CreateEmployeeForm;
