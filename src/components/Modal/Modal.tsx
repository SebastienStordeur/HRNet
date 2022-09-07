import React from "react";
import ReactDOM from "react-dom";

interface IBackdrop {
  onClick: () => void;
}

const Backdrop: React.FC<IBackdrop> = (props) => {
  return <div id="backdrop" /* onClick={props.onClick} */></div>;
};

const ModalOverlay: React.FC = () => {
  return (
    <section className="h-full w-full absolute">
      <div className="h-10 w-4/6 bg-white">Modal</div>
    </section>
  );
};

const Modal: React.FC = () => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={() => {}} />,
        document.getElementById("backdrop-root") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay />,
        document.getElementById("modal-root") as HTMLElement
      )}
    </React.Fragment>
  );
};

export default Modal;
