import React, { FC, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const ModalFriends : FC<any> = ({ children }) => {
  const elRef = useRef(document.createElement("div"));

  useEffect(() => {
    const elRefCurrent = elRef.current;
    const modalRoot = document.getElementById("modalFriends");

    if (!modalRoot) {
      return;
    }
    modalRoot.appendChild(elRefCurrent);

    return () => {
      modalRoot.removeChild(elRefCurrent);
    };
  }, []);

  return createPortal(<>{children}</>, elRef.current);
};
export default ModalFriends;
