import React, { Fragment, useState } from "react";

const EditInfo =({details}) =>{
    const [address, setAddress] = useState(details.address) ;
const [city, setCity] = useState(details.city) ;
const [state, setState] = useState(details.state) ;
const [phone_number,setPhone_number] = useState(details.phone_number) ;


//edit description function

  const updateDescription = async e => {
    e.preventDefault();
    try {
      const body = {  address, city, state, phone_number};
      const response = await fetch(
        `http://localhost:5000/detailss/${details.details_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location= "/";
    } catch (err) {
      console.error(err.message);
    }
  };



    return <Fragment>
    <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${details.details_id}`}>
      Edit
    </button>
   
    <div class="modal" id={`id${details.details_id}`}>
      <div class="modal-dialog">
        <div class="modal-content">
    
          
          <div class="modal-header">
            <h4 class="modal-title">Edit Info</h4>
            <button type="button" class="close" data-dismiss="modal" 
            // onClick={() =>setAddress(details.adresss)} 
            // onClick={() =>setCity(details.city)}
            // onClick={() =>setState(details.state)}
            // onClick={() =>setPhone_number(details.phone_number)}
            >&times;</button>
          </div>
    
         
          <div class="modal-body">
            <input type="text" className="form-control" value={address}
            onChange={e => setAddress(e.target.value)}/>
            <input type="text" className="form-control" value={city}
            onChange={e => setCity(e.target.value)}/>
            <input type="text" className="form-control" value={state}
            onChange={e => setState(e.target.value)}/>
            <input type="text" className="form-control" value={phone_number}
            onChange={e => setPhone_number(e.target.value)}/>
          </div>
    
         
          <div class="modal-footer">
            <button type="button" class="btn btn-warning" data-dismiss="modal" onClick={e=> updateDescription(e)}>Edit</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
    
        </div>
      </div>
    </div>
    </Fragment>;
};

 



export default EditInfo;




// const EditInfo = ({ details }) => {
// const [description, setDescription] = useState(todo.description);
// const [address, setAddress] = useState("details.address") ;
// const [city, setCity] = useState("details.city") ;
// const [state, setState] = useState("details.state") ;
// const [phone_number,setPhone_number] = useState("phone_number.state") ;
  

// //edit description function

//   const updateAddress = async e => {
//     e.preventDefault();
//     try {
//       const body = {  address, city, state, phone_number};
//       const response = await fetch(
//         `http://localhost:5000/detailss/${details.details_id}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(body)
//         }
//       );

//       window.location = "/";
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   return (
//     <Fragment>
//       <button
//         type="button"
//         class="btn btn-warning"
//         data-toggle="modal"
//         data-target={`#id${details.details_id}`}
//       >
//         Edit
//       </button>

//       {/* 
//         id = id10
//       */}
//       <div
//         class="modal"
//         id={`id${details.details_id}`}
//         // onClick={() => setAddress(details.address),
//         //     setCity(details.city),
//         //     setState(details.state),
//         //     setPhone_number(details.state)            
//         // }
//       >
//         <div class="modal-dialog">
//           <div class="modal-content">
//             <div class="modal-header">
//               <h4 class="modal-title">Edit Detail</h4>
//               <button
//                 type="button"
//                 class="close"
//                 data-dismiss="modal"
//                 // onClick={() => setAddress(details.address),
//                 //                setCity(details.city),
//                 //                setState(details.state),
//                 //                setPhone_number(details.state)            
//                 //  }
//               >
//                 &times;
//               </button>
//             </div>

//             <div class="modal-body">
//               <input
//                 type="text"
//                 className="form-control"
//                 value={address,city,state,phone_number}
//                 // onChange={e => setAddress,setCity,setState,setPhone_number(e.target.value)
                         
                
//                 // }
//               />
//             </div>

//             <div class="modal-footer">
//               <button
//                 type="button"
//                 class="btn btn-warning"
//                 data-dismiss="modal"
//                 // onClick={e => updateAddress(e),updateCity(e),updateState(e),updatePhone_number(e)}
//               >
//                 Edit
//               </button>
//               <button
//                 type="button"
//                 class="btn btn-danger"
//                 data-dismiss="modal"
//                 onClick={() => setAddress(details.address),
//                     setCity(details.city),
//                     setState(details.state),
//                     setPhone_number(details.state)            
//                 }
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };
