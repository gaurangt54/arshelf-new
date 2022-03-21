/* eslint-disable */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter"
import GLTFExporter from 'three-gltf-exporter';

import React from 'react'
import apiCall from '../Utils/apiCall';

import { colors } from "./colors1";

// import obj2gltf from "obj2gltf";

import { useState, useEffect, useContext } from "react";
import { Context } from "./Context";

function Customizer(props) {
    document.title = "Product Customizer"
    var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 60);
    camera.position.z = 5; //Farness

    var loaded = false;
    let initRotate = 0;
    let meshD = {}
    const [customization, setCustomization] = useState();

    const [model, setModel] = useState();
    const [arlink, setArlink] = useState();
    const [product, setProduct] = useState();
    const [user, saveUser] = useContext(Context);

    let m = [];
    let part;
    const [meshes, setMeshes] = useState();

    const [initScene, setScene] = useState();
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const material = new THREE.MeshStandardMaterial({color: 0x777777});

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, 350);
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
    useEffect(()=>{

        const id = props.match.params.id;
        apiCall(`getProductById`, 'GET', id)
        .then(res=>{
            setProduct(res.data.data)
        }).catch(err => {
            alert("Something went wrong, please try again!");
            console.log(err)
        })
    }, [])

    useEffect(()=>{
        if(product!==undefined && !loaded ){
            console.log(product)
            loader.load(product.arFile, function(gltf){
            console.log("Loader", scene)
            var theModel = gltf.scene;
            theModel.traverse(o => {
            if (o.isMesh) {
                m.push(o.name)
                let n = o.name
                meshD[n] = {color: "777777"}
                o.nameID = o.name; 
                o.castShadow = true;
                o.receiveShadow = true;
                o.material = material;
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
    }, [product])
    
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
        if(!model && t && product ){
          t.appendChild(r);
          console.log("Obj", renderer)
        }
        if(model){
        model.traverse(o => {
          if (o.isMesh) {
              let n = o.name
              meshD[n] = {color: "777777"}
            }
        });}
    }, [renderer]);


    const download = () => {
        const exporter = new GLTFExporter();
        console.log("Download", initScene);
        console.log("Dict", meshD)
        setCustomization(meshD)
        exporter.parse(
          initScene,
            function (result) {
                console.log(result)
                if (result instanceof ArrayBuffer) {
                    saveArrayBuffer(result, "scene.glb");
                } else {
                    const output = JSON.stringify(result, null, 2);
                    saveString(output, "scene.gltf");
                }
            },
            function (error) {
                console.log(error);
            },
            {binary:true}
        );
    }

    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link);

    function saveArrayBuffer(buffer, fileName) {
        save(new Blob([buffer], { type: "model/gltf-binary" }), fileName);
    }

    function saveString(text, filename) {
        save(new Blob([text], { type: "text/plain" }), filename);
    }

    function save(blob, fileName) {
        console.log("Blob" ,blob)
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        console.log(link.href)
        setArlink(link.href)
        const a = link.href.split("/")
        let al = a[a.length-1]
    }
    
    const changeColor = (color) => {

      if(!part){
        alert("Select Part")
      }

      let new_mtl;
      if (color.texture) {

        let txt = new THREE.TextureLoader().load(color.texture);

        txt.repeat.set(color.size[0], color.size[1], color.size[2]);
        txt.wrapS = THREE.RepeatWrapping;
        txt.wrapT = THREE.RepeatWrapping;

        new_mtl = new THREE.MeshStandardMaterial({
        map: txt });

        meshD[part] = {texture: color.texture}

    } else  {
        new_mtl = new THREE.MeshStandardMaterial({
        color: parseInt('0x' + color.color),
        //shininess: color.shininess ? color.shininess : 10
     })
        meshD[part] = {color: color.color}
    }

    model.traverse(o => {
      if(o.isMesh && o.nameID!= null){
      if(o.name==part){
        o.material=new_mtl
      }
    }
    });
    
    }

    const setPart = (mesh) => {
      if(part){
        document.getElementById(`${part}`).style.backgroundColor = '#b3b3b3';
        document.getElementById(`${part}`).style.borderColor = '#b3b3b3';
        document.getElementById(`${part}`).style.color = '#000000';
      }
      part = mesh;
      console.log(part)
      document.getElementById(`${mesh}`).style.backgroundColor = '#333333';
      document.getElementById(`${mesh}`).style.borderColor = '#333333';
      document.getElementById(`${mesh}`).style.color = '#ffffff';
    }
   
    const cColor = (color) => {

      if(!part){
        alert("Select Part")
      }

      let new_mtl = new THREE.MeshStandardMaterial({
        color: parseInt('0x' + color.substring(1)),
        //shininess: color.shininess ? color.shininess : 10
      })

      meshD[part] = {color: color.substring(1)}

      model.traverse(o => {
        if(o.isMesh && o.nameID!= null){
        if(o.name==part){
          o.material=new_mtl
        }
      }
      });

    }

    const addCustomizationRequest = () => {

      console.log("Customization", customization)
      const request = {
          user:user,
          product: product,
          customization: customization
      }

      apiCall(`addCustomizationRequest`, 'POST', null, request)
      .then(res=>{ 
          console.log(res.data)
          alert(res.data.message)
          props.history.push('/approvals')
      })
      .catch(err=>{ 
          alert("Something went wrong")
      })
    }

    return (
        <div>
          {arlink?
          <div className="p-2">
            <div className="row">
              <div className="col-6 text-left">
                <button className="btn btn-primary" onClick={()=>{window.location.reload()}}>Customize Again</button>
              </div>
              <div className="col-6 text-right">
                <button className="btn btn-dark align-right" onClick={addCustomizationRequest}>Ask for Approval</button>
              </div>
            </div>

            <model-viewer style={{height:"500px",width:"100%",backgroundColor:"#17171A!important"}} src={arlink} ios-src={arlink} ar alt='A 3D model of a furniture' camera-orbit="-90deg" auto-rotate='' camera-controls='' background-color='#455A64'></model-viewer>
          </div>
          :<div className="p-2">
            <div className="row mx-3 color-pallete">
              {colors && colors.length!==0?
              colors.map((color,index)=>(
                <div key={index} className="choose-color" 
                style={color.texture?{backgroundImage:`url(${color.texture})`}:{backgroundColor:`#${color.color}`}} 
                onClick={()=>changeColor(color)}
                />
              ))
              :null}
              <br/>
            </div>
            <div className="mx-3">
            Select Custom Color from this input: <input type="color" className="choose-input-color" onChange={(e)=>{cColor(e.target.value)}} />

            </div>

            <div id="obj" style={{height:"50vh"}}>
            </div>
            <div style={{textAlign:"center" , padding:"1rem"}}>
                <div id="selected-part"></div>
                {meshes && meshes.length!=0?
                  meshes.map((mesh)=>(
                    <button className="btn m-1" style={{backgroundColor:"#b3b3b3"}} id={`${mesh}`} onClick={()=>{setPart(mesh)}}>{mesh}</button>
                  ))
                :null}
                <br/> 
                <button className="btn btn-proceed btn-block m-2" onClick={download}>Proceed</button>
            </div>
            </div>
            }
        </div>
    );
}

export default Customizer;
