import React,{useState} from "react";
import "./App.css";
import { Form } from "./components/Form";
import Animati from "./components/Animati";
import {ControlerFetch} from "./components/ControlerFetch";
import ExitoSubida from "./components/ExitoSubida";
import ErrorSubida from "./components/ErrorSubida";

import $ from "jquery";

function App() {
  const [subidaArch, setSubidaArch] = useState(false)
  const [proceSolicitud, setProceSolicitud] = useState(false)
  const [muestraForm, setMuestraForm] = useState(true)
  const [resultOpera, setResultOpera] = useState(false)
  const [datos, setDatos] = useState(null)
  const [hook1, setHook1] = useState(true)

  const handledata = (data, file,filesExtra) => {
    /* console.log(data)
    console.log(file.name) */
    setMuestraForm(false)
    setProceSolicitud(true)
    setDatos({...datos,
    dtoform:data,
    archivo:file,
    archivosExtra:filesExtra} );
    $("#s4-workspace").animate({ scrollTop: 150 }, 500, "linear", null);
  };

  const handleTerminaSubida = (data)=>{
    //console.log(data)
    setResultOpera(data)
    setSubidaArch(true)
    setProceSolicitud(false)
    console.log("finalizo subida");
    setHook1(false)
  }
  window.onbeforeunload = function() {
    if (hook1) {
      return "ya acabaste?"
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 ">
          <p>
            Puede utilizar herramientas en linea para{" "}
            <a
              href="https://www.adobe.com/la/photoshop/online/crop-image.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              cortar su imagen
            </a>
          </p>

          <p>
            Puede utilizar herramientas en linea para{" "}
            <a
              href="https://tinypng.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              bajar el peso de su imagen
            </a>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mb-3">
        <div className="panel panel-primary text-info">
            <div className="panel-heading">
            <b>Formulario solicitud publicación clasificados </b> 
            </div>
          </div>
         {subidaArch &&  (resultOpera ?<ExitoSubida></ExitoSubida>:<ErrorSubida></ErrorSubida>)}
          {proceSolicitud && datos && datos.archivo && datos.archivo.name && <ControlerFetch onSubida={handleTerminaSubida} datos={datos} ></ControlerFetch>}
          
          
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 ">
          { muestraForm &&<Form onDataResponse={handledata}></Form>}
        </div>
      </div>
      
    </div>
  );
}

export default App;
