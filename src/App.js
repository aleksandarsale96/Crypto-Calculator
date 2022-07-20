import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';




import Inputs from "./components/Inputs";
import Title from "./components/Title";

function App() {
  return (
    <div className="App">
          <Title leadTittle="Crypto Calculator"/>
          <Inputs />
    </div>
  );
}

export default App;
