
import React from "react";
import { MobXProviderContext } from 'mobx-react';
import { AppStore } from "../AppStore";

export function useStores(): Record<string, AppStore> {
  return React.useContext(MobXProviderContext);
}