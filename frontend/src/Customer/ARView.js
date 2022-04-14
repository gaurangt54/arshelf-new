/* eslint-disable */

import React from 'react'

import {Container, Row, Col, Table, Button} from 'react-bootstrap';

import { useState, useEffect, useContext } from "react";
import { Context } from "./Context";
import apiCall, {mainBackendUrl} from '../Utils/apiCall'; 

function ARView(props) {
     //Farness

    const [approval, getapproval] = useState();
    const [user, saveUser] = useContext(Context);

    

    useEffect(() => {
        apiCall(`getCustomizationRequest`, "POST", null, {id: props.match.params.id})
        .then((res) => {
            getapproval(res.data.approval)
        })
        .catch((err) => {
            console.log(err);
            alert("Something went wrong");
        });
    }, []);

  
    return (
      <div className="p-2">
        {approval?<div className="row">
          <div className="col-md-6 text-center p-3" id="obj"> 
          <h3>Original Design</h3>
          <model-viewer style={{height:"500px",width:"100%",backgroundColor:"#17171A!important"}} src={`${mainBackendUrl}/download/${approval.product.arFile}`} ar alt='A 3D model of a furniture' camera-orbit="-90deg" auto-rotate='' camera-controls='' background-color='#455A64'></model-viewer>

          </div>
          <div className="col-md-6 text-center p-3" id="obj"> 
          <h3>Required Design</h3>
          <model-viewer style={{height:"500px",width:"100%",backgroundColor:"#17171A!important"}} src={`${mainBackendUrl}/download/${approval.customization.image}`} ar alt='A 3D model of a furniture' camera-orbit="-90deg" auto-rotate='' camera-controls='' background-color='#455A64'></model-viewer>

          </div>
          <hr/>

          <div className="col-md-12 p-3" style={{textAlign:"center" , padding:"1rem"}}>
          <h4>Color Customizations</h4><br/>
          <Table striped hover responsive className="admin-tables">
              <thead style={{backgroundColor:"#eee"}}>
                  <th className="p-3">Sr. No.</th>
                  <th className="p-3">Mesh Name</th>
                  <th className="p-3" colSpan={2}>Old Design</th>
                  <th></th>
                  <th className="p-3" colSpan={2}>New Design</th>
              </thead>
              <tbody>
              {approval?
              Object.keys(approval.customization.color).map((c, index)=>(
                <tr style={index%2==0?{backgroundColor:"#ddd"}:{backgroundColor:"#eee"}}>
                  <td className="p-3">{index+1}</td>
                  <td className="p-3">{c}</td>
                  <td className="p-3">
                    {approval.product.design.color[c].texture?"Texture":`Color 0x${approval.product.design.color[c].texture}`}
                  </td>
                  <td className="p-3" 
                  style={approval.product.design.color[c].texture?
                    {backgroundImage:`url(${approval.product.design.color[c].texture})`}:
                    {backgroundColor:`#${approval.product.design.color[c].color}`}
                  } 
                  ></td>
                  <td></td>
                  <td className="p-3">
                    {approval.customization.color[c].texture?"Texture":`Color 0x${approval.customization.color[c].color}`}
                  </td>
                  <td className="p-3" 
                  style={approval.customization.color[c].texture?
                    {backgroundImage:`url(${approval.customization.color[c].texture})`}:
                    {backgroundColor:`#${approval.customization.color[c].color}`}
                  } 
                  >
                    </td>
                </tr>
              ))
              :null}
              </tbody>
          </Table> 
          </div>
          <hr/>

          <div className="col-md-12 p-3" style={{textAlign:"center" , padding:"1rem"}}>
          <h4>Size Customizations</h4><br/>
          <Table striped hover responsive className="admin-tables">
              <thead style={{backgroundColor:"#eee"}}>
                  <th className="p-3">Sr. No.</th>
                  <th className="p-3">Dimensions</th>
                  <th className="p-3" >Old Dimension</th>
                  <th></th>
                  <th className="p-3" >New Dimension</th>
              </thead>
              <tbody>
              {approval?
              Object.keys(approval.customization.size).map((c, index)=>(
                <tr style={index%2==0?{backgroundColor:"#ddd"}:{backgroundColor:"#eee"}}>
                  <td className="p-3">{index+1}</td>
                  <td className="p-3">{c}</td>
                  <td className="p-3">
                    {approval.product[c]}
                  </td>
                  
                  <td></td>
                  <td className="p-3">
                    {approval.customization.size[c]}
                  </td>
                  
                </tr>
              ))
              :null}
              </tbody>
          </Table> 
          </div>
          
          {approval && approval.customization && approval.customization.extras?
          <>
          <hr/>

          <div className="col-md-12 p-3" style={{textAlign:"center" , padding:"1rem"}}>
          <h4>Extra Customizations</h4><br/>
          <Table striped hover responsive className="admin-tables">
              <thead style={{backgroundColor:"#eee"}}>
                  <th className="p-3">Sr. No.</th>
                  <th className="p-3">Feature</th>
                  <th className="p-3" >Original Qty</th>
                  <th></th>
                  <th className="p-3" >Required Qty</th>
              </thead>
              <tbody>
              {approval.customization.extras?
              approval.customization.extras.map((feature, index)=>(
                <tr style={index%2==0?{backgroundColor:"#ddd"}:{backgroundColor:"#eee"}}>
                  <td className="p-3">{index+1}</td>
                  <td className="p-3">{feature.name}</td>
                  <td className="p-3">
                    2
                  </td>
                  
                  <td></td>
                  <td className="p-3">
                    {feature.qty}
                  </td>
                  
                </tr>
              ))
              :null}
              </tbody>
          </Table> 
          </div>
          </>
          :null}

        </div>:
        "Loading..."}
      </div>
    );
}

export default ARView;
