import React, {useState} from 'react';

import chair11 from "./images/chair11.glb";
import canape from "./images/canape.glb";
import chair from "./images/chair.glb";
import Table from "./images/Table.glb";
import tv from "./images/tv.glb";
import table2 from "./images/table2.glb";

function AR() {

    const [arview, setarview] = useState("https://res.cloudinary.com/gaurangt54/image/upload/v1640257713/chair_c6ope0.glb");

    return (
        <div className="AR">
            <div>
                <button className="btn btn-primary" onClick={()=>setarview(tv)}>Tv</button> &nbsp;
                <button className="btn btn-warning" onClick={()=>setarview(chair11)}>Recliner</button> &nbsp;
                <button className="btn btn-success" onClick={()=>setarview(chair)}>Chair</button> &nbsp;
                <button className="btn btn-danger" onClick={()=>setarview(canape)}>Canape</button> &nbsp;
                <button className="btn btn-info" onClick={()=>setarview(Table)}>Table</button> &nbsp;
                <button className="btn btn-dark" onClick={()=>setarview(table2)}>Tv Set</button> &nbsp;
                
            </div>
            <div>
                <model-viewer
                    className="viewer"
                    style={{
                        height: "470px",
                        width: "100%",
                        backgroundColor: "#17171A!important",
                    }}
                    src={arview}
                    ar
                    alt="A 3D model of a chair"
                    camera-orbit="-90deg"
                    auto-rotate=""
                    camera-controls=""
                    background-color="#455A64"
                ></model-viewer>
            </div>
        </div>
    );
}

export default AR;
