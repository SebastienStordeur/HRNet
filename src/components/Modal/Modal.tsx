import React from "react";
import ReactDOM from "react-dom";
import Button from "../UI/Button";

interface IModal {
  onClick: () => void;
}

const Backdrop: React.FC<IModal> = (props) => {
  return (
    <div id="backdrop" className="absolute w-full h-screen top-0 bg-grey bg-opacity-50" onClick={props.onClick}></div>
  );
};

const ModalOverlay: React.FC<IModal> = (props) => {
  return (
    <div className="flex flex-col items-center px-8 py-4 rounded-xl h-32 w-4/6 bg-white font-bold overflow-hidden absolute  left-0 right-0 top-1/3 mx-auto z-10">
      <h3>Employee successfully created</h3>
      <Button className="mt-4" onClick={props.onClick}>
        Close modal
      </Button>
    </div>
  );
};

const Modal: React.FC<IModal> = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick} />,
        document.getElementById("backdrop-root") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onClick={props.onClick} />,
        document.getElementById("modal-root") as HTMLElement
      )}
    </React.Fragment>
  );
};

export default Modal;
