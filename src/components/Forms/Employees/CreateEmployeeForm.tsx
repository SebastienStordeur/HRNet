import React, { useState, useContext, useRef } from "react";
import { departments, states, statesComplete } from "../../../utils/datalist";
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

const CreateEmployeeForm: React.FC = () => {
  const employees = useContext(EmployeeContext);

  const firstnameRef = useRef<HTMLInputElement>();
  const lastnameRef = useRef<HTMLInputElement>();
  const streetRef = useRef<HTMLInputElement>();
  const cityRef = useRef<HTMLInputElement>();
  const zipRef = useRef<HTMLInputElement>();

  const [form, setForm] = useState<any>({
    firstName: "",
    firstNameHasError: false,
    lastName: "",
    lastNameHasError: false,
    street: "",
    streetHasError: false,
    city: "",
    cityHasError: false,
    zipCode: "",
    zipHasError: false,
  });

  const startValue = new Date();
  const [startWorkValue, setStartWorkValue] = useState<string>("");
  const [startCalendarIsVisible, setStartCalendarIsVisible] =
    useState<boolean>(false);
  const [birthValue, setBirthValue] = useState<string>("");
  const [birthCalendarIsVisible, setBirthCalendarIsVisible] =
    useState<boolean>(false);

  const [departmentsHasError, setDepartmentsHasError] =
    useState<boolean>(false);
  const [statesHasError, setStatesHasError] = useState<boolean>(false);

  const stateLabel = document.querySelector(
    "#state > label > div > div > ul > label"
  );
  const departmentLabel = document.querySelector(
    "#department > label > div > div > ul > label"
  );

  const openStartCalendarHandler = () => {
    setStartCalendarIsVisible((value: boolean) => !value);
  };

  const openBirthCalendarHandler = () => {
    setBirthCalendarIsVisible((value: boolean) => !value);
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

  let formIsValid: boolean = false;

  if (birthValue !== "" && startWorkValue !== "") {
    formIsValid = true;
  }

  const submitHandler: (event: React.FormEvent<HTMLFormElement>) => void = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const abbreviation = statesComplete.find(
      (state) => state.name === stateLabel?.id
    );

    const newEmployee = {
      firstName: form.firstName,
      lastName: form.lastName,
      dateOfBirth: birthValue,
      startDate: startWorkValue,
      street: form.street,
      city: form.city,
      state: abbreviation ? abbreviation?.abbreviation : "",
      zipCode: form.zipCode,
      department: departmentLabel?.id ? departmentLabel.id : "",
    };

    newEmployee.department === "departments"
      ? setDepartmentsHasError(true)
      : setDepartmentsHasError(false);

    newEmployee.state === "states"
      ? setStatesHasError(true)
      : setStatesHasError(false);

    if (!formIsValid && departmentsHasError) return;

    employees.addEmployee(newEmployee);

    setShowModal((prevValue) => !prevValue);
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
                value={form.firstName}
              />
            </Label>
            {form.firstNameHasError && (
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
                value={form.lastName}
                /* onChange={lastnameChangeHandler} */
              />
            </Label>
            {form.lastNameHasError && (
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
                onClick={openBirthCalendarHandler}
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
                value={form.street}
                /* onChange={streetChangeHandler} */
              />
            </Label>
            {form.streetHasError && (
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
                value={form.city}
                /* onChange={cityChangeHandler} */
              />
            </Label>
            {form.cityHasError && (
              <p className="text-sm font-bold text-red">
                Wrong format or empty field
              </p>
            )}
          </InputValidator>
          <InputValidator id="state">
            <Label htmlFor="state">
              State
              <ListSelect
                id="states"
                data={states}
                headline="State"
                class="bg-white text-blue rounded font-semibold cursor-pointer relative"
                listContainerStyle="absolute w-full left-0 mt-1 rounded-lg z-[100] max-h-72 overflow-auto"
                listStyle="bg-white text-blue"
                defaultListStyle="px-4 py-1 w-full h-8 z-[100] border-solid border-[1px] bg-blue text-white border-blue hover:bg-blue hover:text-white cursor-pointer"
              />
              {statesHasError && (
                <p className="text-sm font-bold text-red">
                  Please choose a valid option
                </p>
              )}
            </Label>
          </InputValidator>
          <InputValidator id="state">
            <Label htmlFor="zip">
              Zip Code
              <Input
                id="zip"
                name="zip"
                type="number"
                value={form.zipCode}
                /* onChange={zipChangeHandler} */
              />
            </Label>
            {form.zipHasError && (
              <p className="text-sm font-bold text-red">
                Wrong format or empty field
              </p>
            )}
          </InputValidator>
          <InputValidator id="department">
            <Label htmlFor="department">
              Department
              <ListSelect
                id="departments"
                data={departments}
                headline="Department"
                class="bg-white text-blue rounded font-semibold cursor-pointer relative"
                listStyle="bg-white text-blue"
                activeValueStyle="bg-blue text-white"
                defaultListStyle="px-4 py-1 w-full h-8 border-solid border-[1px] border-blue hover:bg-blue hover:text-white cursor-pointer"
                listContainerStyle="absolute w-full left-0 mt-1 z-10 rounded-lg"
              />
              {departmentsHasError && (
                <p className="text-sm font-bold text-red">
                  Please choose a valid option
                </p>
              )}
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
