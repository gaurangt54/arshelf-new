/* eslint-disable */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter"
import GLTFExporter from 'three-gltf-exporter';

import React, {useState, useEffect} from 'react'
import apiCall from '../Utils/apiCall';

import {Container, Row, Col, Table, Button} from 'react-bootstrap';

function ARView(props) {
    document.title = "Approval ARView"
    var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 60);
    camera.position.z = 3; //Farness

    var loaded = false;
    let initRotate = 0;
    let meshD = {}

    const [model, setModel] = useState();
    const [arlink, setArlink] = useState();
    const [approval, getapproval] = useState();

    let m = [];
    let part;
    const [meshes, setMeshes] = useState();

    const [initScene, setScene] = useState();
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const material = new THREE.MeshStandardMaterial({color: 0x777777});

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, 400);
    renderer.shadowMap.enabled = true;

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    dirLight.target.position.set( 0, 0, -1 );
    dirLight.add( dirLight.target );
    dirLight.lookAt( -1,-1, 0 );
    dirLight.name = 'DirectionalLight';
    scene.add( dirLight );

    var loader = new GLTFLoader();

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

    useEffect(()=>{
        if(approval!==undefined && !loaded ){
            console.log(approval)
            loader.load(approval.product.arFile, function(gltf){
            console.log("Loader", scene)
            var theModel = gltf.scene;
            theModel.traverse(o => {
            if (o.isMesh) {
              if(o.name in approval.customization){
                o.material = changeColor(approval.customization[o.name])
              }
            }
            });
            theModel.scale.set(1, 1, 1);
            theModel.rotation.y = Math.PI;
            theModel.position.y = 0;
            scene.add(theModel);
            setModel(theModel);
            setMeshes(m)
            setScene(scene);
        }, undefined, function (error) {
            console.error(error);
        });

        animate();
        }
    }, [approval])
    
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 3;
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.dampingFactor = 0.1;
    controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
    controls.autoRotateSpeed = 0.2;

    function animate() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        if (model != null && loaded == false) {
            initialRotation();
            //DRAG_NOTICE.classList.add('start');
        }
    }

    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      var width = window.innerWidth;
      var height = window.innerHeight;
      var canvasPixelWidth = canvas.width / window.devicePixelRatio;
      var canvasPixelHeight = canvas.height / window.devicePixelRatio;

      const needResize =
          canvasPixelWidth !== width || canvasPixelHeight !== height;
      // if (needResize) {
      //     renderer.setSize(width, 350, false);
      // }
      return needResize;
  }

    function initialRotation() {
      initRotate++;
      if (initRotate <= 120) {
          model.rotation.y += Math.PI / 60;
      } else {
          loaded = true;
      }
    }
 
    useEffect(() => {
        const r = renderer.domElement;
        const t = document.getElementById("obj")
        if(!model && t && approval ){
          t.appendChild(r);
          console.log("Obj", renderer)
        }
    }, [renderer]);

   
    const changeColor = (color) => {


      let new_mtl;
      if (color.texture) {

        let txt = new THREE.TextureLoader().load(color.texture);

        txt.repeat.set(3, 3, 3);
        txt.wrapS = THREE.RepeatWrapping;
        txt.wrapT = THREE.RepeatWrapping;

        new_mtl = new THREE.MeshStandardMaterial({
        map: txt });


    } else  {
        new_mtl = new THREE.MeshStandardMaterial({
        color: parseInt('0x' + color.color),
     })
    }
    return new_mtl;

    
    }



    return (
      <div className="p-2">
        <div className="row">
          <div className="col-md-12" id="obj"> </div>

          <div className="col-md-12 p-5" style={{textAlign:"center" , padding:"1rem"}}>
          <Table striped hover responsive className="admin-tables">
              <thead style={{backgroundColor:"#eee"}}>
                  <th className="p-3">Sr. No.</th>
                  <th className="p-3">Mesh Name</th>
                  <th className="p-3" colSpan={2}>Type</th>
              </thead>
              <tbody>
              {approval?
              Object.keys(approval.customization).map((c, index)=>(
                <tr style={index%2==0?{backgroundColor:"#ddd"}:{backgroundColor:"#eee"}}>
                  <td className="p-3">{index+1}</td>
                  <td className="p-3">{c}</td>
                  <td className="p-3">
                    {approval.customization[c].texture?"Texture":`Color 0x${approval.customization[c].color}`}
                    </td>
                  <td className="p-3" 
                  style={approval.customization[c].texture?
                    {backgroundImage:`url(${approval.customization[c].texture})`}:
                    {backgroundColor:`#${approval.customization[c].color}`}
                  } 
                  >
                    </td>
                </tr>
              ))
              :null}
              </tbody>
          </Table>
              
          </div>
        </div>
      </div>
    );
}

export default ARView;
