import React, { Fragment, useState } from "react";

const InputInfo = () => {
  const [address, setAddress] = useState("") ;
  const [city, setCity] = useState("") ;
  const [state, setState] = useState("") ;
  const [phone_number,setPhone_number] = useState("") ;


  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { address, city, state, phone_number };
      const response = await fetch("http://localhost:5000/detailss", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      
      <form className="mt-5" onSubmit={onSubmitForm} >
        <label>Address</label>
        <input type="text" className="form-control"


          value={address}
          onChange={e => setAddress(e.target.value)}
        />

        <label>city</label>
        <input type="text" className="form-control"


          value={city}
          onChange={e => setCity(e.target.value)}
        />

        <label>State</label>
        <input type="text" className="form-control"


          value={state}
          onChange={e => setState(e.target.value)}
        />

        <label>Phone number</label>
        <input type="text" className="form-control"


          value={phone_number}
          onChange={e => setPhone_number(e.target.value)}
        />

        <button className="btn btn-success">Submit</button>
      </form>


    </Fragment>
  );
};

export default InputInfo;

