import { inject, observer } from "mobx-react";
import React from "react";

const HandlePost = () => {
  return (
    <>
      <HandlePost />
    </>
  );
};

export default inject("store")(observer(HandlePost));
