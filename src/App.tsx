import { registerRootComponent } from "expo";
import React from "react";
import { RecoilRoot } from "recoil";
import 'bootstrap/dist/css/bootstrap.min.css';

import { HomeScreen } from "./screens/HomeScreen";

function App() {
  return (
    <RecoilRoot>
        <HomeScreen/>
    </RecoilRoot>
  );
}

export default registerRootComponent(App);
