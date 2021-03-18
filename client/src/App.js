
import React, { Fragment } from 'react';
import './App.css';

//components

import InputInfo from "./components/InputInfo";
import ListInfo from "./components/ListInfo";
import EditInfo from "./components/EditInfo";


function App() {
  return(
     <Fragment>
     <div className="container">
    <InputInfo/>
    <ListInfo/>
    </div>
  </Fragment>
  );
}

export default App;

