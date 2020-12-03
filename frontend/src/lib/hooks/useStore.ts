import React from "react";
import { MobXProviderContext } from "mobx-react";
import StoreType from "../../types/StoreType";

const useStore = (): StoreType => {
  return React.useContext(MobXProviderContext) as StoreType;
};

export default useStore;
