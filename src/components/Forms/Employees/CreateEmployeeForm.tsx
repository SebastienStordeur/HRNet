import React, { useState, useEffect, useContext } from "react";
import { departments, states, statesComplete } from "../../../utils/datalist";
import useInput from "../../../Hooks/useInput";
import Modal from "../../Modal/Modal";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import InputValidator from "../Inputvalidator/InputValidator";
import Label from "./Label";
import { ListSelect } from "list-select";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { months } from "../../../utils/months";
import EmployeeContext from "../../../store/EmployeeContext";

const letterRegex: RegExp =
  /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
const numberRegex: RegExp = /^\d+$/;
const isNotEmpty: any = (value: string) => value.trim() !== "";

const isValidText: any = (value: string) =>
  letterRegex.test(value) && isNotEmpty && value.length > 2;

const isValidNumber: any = (value: string) =>
  numberRegex.test(value) && isNotEmpty && value.length === 5;

const CreateEmployeeForm: React.FC = () => {
  const employees = useContext(EmployeeContext);

  const [startValue, setStartValue] = useState<any>(new Date());
  const [startWorkValue, setStartWorkValue] = useState<string>("");
  const [startCalendarIsVisible, setStartCalendarIsVisible] =
    useState<boolean>(false);
  const [birthValue, setBirthValue] = useState<string>("");
  const [birthCalendarIsVisible, setBirthCalendarIsVisible] =
    useState<boolean>(false);
  const stateLabel = document.querySelector(
    "#state > label > div > div > ul > label"
  );
  const departmentLabel = document.querySelector(
    "#department > label > div > div > ul > label"
  );

  const [stateValue, setStateValue] = useState<string>("");

  useEffect(() => {
    const stateValueHandler = () => {
      const abbreviation = statesComplete.find(
        (state) => state.name === stateLabel?.id
      );

      if (abbreviation !== undefined) {
        setStateValue(abbreviation?.abbreviation);
      }
    };
    stateValueHandler();
  }, [stateLabel, stateValue]);

  const openStartCalendarHandler = () => {
    setStartCalendarIsVisible((value) => !value);
  };

  const formatDate = (value: string, dataType: string) => {
    const unformattedDate: string[] = value.toString().split(" ").splice(1, 3);
    const monthNumber = months.find(
      (month) => month.name === unformattedDate[0]
    );

    if (monthNumber) {
      unformattedDate[0] = monthNumber?.number;
    }

    const formattedDate = unformattedDate.join("/");

    dataType === "birth"
      ? setBirthValue(formattedDate)
      : setStartWorkValue(formattedDate);
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

  if (
    enteredFirstnameIsValid &&
    enteredLastameIsValid &&
    enteredStreetIsValid &&
    enteredCityIsValid &&
    enteredZipIsValid &&
    birthValue !== "" &&
    startWorkValue !== "" &&
    stateValue !== "State"
  ) {
    formIsValid = true;
  }

  const submitHandler: (event: React.FormEvent<HTMLFormElement>) => void = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const newEmployee = {
      firstName: enteredFirstname,
      lastName: enteredLastname,
      dateOfBirth: birthValue,
      startDate: startWorkValue,
      street: enteredStreet,
      city: enteredCity,
      state: stateValue,
      zipCode: enteredZip,
      department: departmentLabel?.id ? departmentLabel.id : "",
    };

    if (!formIsValid) return;

    employees.employees.push(newEmployee);

    setShowModal((prevValue) => !prevValue);
    resetFirstnameInput();
    resetLastnameInput();
    resetStreetInput();
    resetCityInput();
    resetZipInput();
    setBirthValue("");
    setStartWorkValue("");
  };

  const [showModal, setShowModal] = useState<boolean>(false);

  const showModalHandler: () => void = () => {
    setShowModal((prevValue) => !prevValue);
  };

  return (
    <React.Fragment>
      <form
        className="max-w-[1110px] px-8 mt-20 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8"
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
            {firstnameInputHasError && (
              <p className="text-sm font-bold text-red">
                Wrong format or empty field
              </p>
            )}
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
            {lastnameInputHasError && (
              <p className="text-sm font-bold text-red">
                Wrong format or empty field
              </p>
            )}
          </InputValidator>
          <InputValidator>
            <Label htmlFor="birth">
              Date of birth
              <Input
                id="birth"
                name="birth"
                type="input"
                value={birthValue}
                onClick={() =>
                  setBirthCalendarIsVisible((prevValue) => !prevValue)
                }
                readonly
              />
              {birthCalendarIsVisible && (
                <div className="mx-auto mt-2">
                  <Calendar
                    onChange={(value: any) => formatDate(value, "birth")}
                    value={startValue}
                  />
                </div>
              )}
            </Label>
          </InputValidator>
          <InputValidator>
            <Label htmlFor="startDate">
              Start Date
              <Input
                id="start"
                name="startDate"
                type="input"
                value={startWorkValue}
                onClick={openStartCalendarHandler}
                readonly
              />
              {startCalendarIsVisible && (
                <div className="mx-auto mt-2">
                  <Calendar
                    onChange={(value: any) => formatDate(value, "start")}
                    value={startValue}
                  />
                </div>
              )}
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
            {streetInputHasError && (
              <p className="text-sm font-bold text-red">
                Wrong format or empty field
              </p>
            )}
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
            {cityInputHasError && (
              <p className="text-sm font-bold text-red">
                Wrong format or empty field
              </p>
            )}
          </InputValidator>
          <InputValidator id="state">
            <Label htmlFor="state">
              State
              <ListSelect
                data={states}
                headline="State"
                class="bg-white text-blue rounded font-semibold cursor-pointer relative"
                listContainerStyle="absolute w-full left-0 mt-1 rounded-lg z-[100] max-h-72 overflow-auto"
                listStyle="bg-white text-blue"
                defaultListStyle="px-4 py-1 w-full h-8 border-solid border-[1px] border-blue hover:bg-blue hover:text-white cursor-pointer"
              />
            </Label>
          </InputValidator>
          <InputValidator id="state">
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
            {zipInputHasError && (
              <p className="text-sm font-bold text-red">
                Wrong format or empty field
              </p>
            )}
          </InputValidator>
          <InputValidator id="department">
            <Label htmlFor="department">
              Department
              <ListSelect
                data={departments}
                headline="Department"
                class="bg-white text-blue rounded font-semibold cursor-pointer relative"
                listStyle="bg-white text-blue"
                activeValueStyle="bg-blue text-white"
                defaultListStyle="px-4 py-1 w-full h-8 border-solid border-[1px] border-blue hover:bg-blue hover:text-white cursor-pointer"
                listContainerStyle="absolute w-full left-0 mt-1 z-10 rounded-lg"
              />
            </Label>
          </InputValidator>
        </div>
        <div className="relative">
          <Button type="submit" className="w-full mb-6">
            Save
          </Button>
        </div>
      </form>
      {showModal && <Modal onClick={showModalHandler} />}
    </React.Fragment>
  );
};

export default CreateEmployeeForm;
