import React from "react";
     
import "./App.css";
import FileUpload from "./components/FileUpload";

const App = () => (
  <div className="container mt-4">
    <h4 className="display-4 text-center mb-4">
      <h1>SDLMUI.COM</h1> 
      <p className="descrption">React multiple Files upload</p>
    </h4>
    <FileUpload />
  </div>
);

export default App;
