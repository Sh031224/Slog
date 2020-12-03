import React from "react";
import { MobXProviderContext } from "mobx-react";
import StoreType from "../../types/StoreType";

export default (): StoreType => {
  return React.useContext(MobXProviderContext) as StoreType;
};
