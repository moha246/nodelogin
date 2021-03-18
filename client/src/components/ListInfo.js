import React, { Fragment, useEffect, useState } from "react";

import EditInfo from "./EditInfo";

const ListInfo = () => {
    const[detailss, setDetailss] = useState([]);
//   delete todoo
    const deleteDetails = async (id) =>{
        try {
            const deleteDetails = await fetch(`http://localhost:5000/detailss/${id}`, {
                method: "DELETE"
            });
          setDetailss(detailss.filter(details => details.details_id !==id));
        } catch (err) {
            console.error(err.message)
        }
    }


    const getDetailss =async () =>{
     try {
        const response = await fetch("http://localhost:5000/detailss");
        const jsonData = await response.json();

        setDetailss(jsonData);
     } catch (err) {
        console.error(err.message); 
     }
    };

    useEffect(()=>{
        getDetailss();
    }, []);
console.log(detailss);

    return (
        <Fragment>
            {" "}
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <td>Address</td>
                        <td>City</td>
                        <td>State</td>
                        <td>Phone Number</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {detailss.map(details => (
                     <tr key={details.details_id}>
                         <td>{details.address}</td>
                        <td>{details.city}</td>
                        <td>{details.state}</td>
                        <td>{details.phone_number}</td>
                         
                         
                         <td>
                             <EditInfo details={details} />
                             </td>
                         <td> 
                             <button className="btn btn-danger" 
                            onClick={() => deleteDetails(details.details_id)}>Delete</button></td>
                     </tr>    
                    ))}
                </tbody>
            </table>
        </Fragment>
    )
};

export default ListInfo;