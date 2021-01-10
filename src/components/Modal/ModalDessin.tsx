import { FC, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const ModalDessin: FC<any> = ({ children }) => {
  const elRef = useRef(document.createElement("div"));

  useEffect(() => {
    const elRefCurrent = elRef.current;
    const modalRoot = document.getElementById("modalDessin");

    if (!modalRoot) {
      return;
    }
    modalRoot.appendChild(elRefCurrent);

    return () => {
      modalRoot.removeChild(elRefCurrent);
    };
  }, []);

  return createPortal(children, elRef.current);
};
export default ModalDessin;
