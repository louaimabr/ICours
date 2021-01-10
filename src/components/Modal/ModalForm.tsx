import React, { FC, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const ModalForm: FC<any> = ({ children }) => {
  const elRef = useRef(document.createElement("div"));

  useEffect(() => {
    const elRefCurrent = elRef.current;
    const modalRoot = document.getElementById("modalForm");

    if (!modalRoot) {
      return;
    }
    modalRoot.appendChild(elRefCurrent);

    return () => {
      modalRoot.removeChild(elRefCurrent);
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};
export default ModalForm;
