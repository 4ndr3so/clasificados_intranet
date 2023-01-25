import React, { useState,useEffect } from "react";
import "./Form.css";
import ReCAPTCHA from "react-google-recaptcha";
import SubirImagen from "./SubirImagen";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import { GetUsuario } from "./GetUsuario";

export const Form = (props) => {
  const recaptchaRef = React.createRef();
  const [imgInput1, setImgInput1] = useState();
  const [imgImgExtra, setImgImgExtra] = useState([]);
  const [idIm, setIdIm] = useState(0);
  const regionalesAr= [{Id: 4, Title: "AMAZONAS"},  {Id: 5, Title: "ANTIOQUIA"},  {Id: 6, Title: "ARAUCA"},  {Id: 7, Title: "ATLÁNTICO"},  {Id: 194, Title: "BOGOTÁ D.C."},  {Id: 8, Title: "BOLÍVAR"},{Id: 9, Title: "BOYACÁ"},  {Id: 10, Title: "CALDAS"},  {Id: 11, Title: "CAQUETÁ"},  {Id: 12, Title: "CASANARE"},   {Id: 16, Title: "CAUCA"},   {Id: 18, Title: "CESAR"},   {Id: 20, Title: "CHOCÓ"},
   {Id: 22, Title: "CÓRDOBA"},   {Id: 24, Title: "CUNDINAMARCA"},   {Id: 26, Title: "DIRECCIÓN GENERAL"},   {Id: 34, Title: "DISTRITO CAPITAL"},   {Id: 35, Title: "GUAINÍA"},   {Id: 37, Title: "GUAJIRA"},   {Id: 39, Title: "GUAVIARE"},   {Id: 41, Title: "HUILA"},   {Id: 47, Title: "MAGDALENA"},   {Id: 54, Title: "META"},   {Id: 64, Title: "NARIÑO"},   {Id: 95, Title: "NORTE DE SANTANDER"},
   {Id: 155, Title: "PUTUMAYO"},   {Id: 159, Title: "QUINDÍO"},   {Id: 161, Title: "RISARALDA"},   {Id: 164, Title: "SAN ANDRÉS"},   {Id: 167, Title: "SANTANDER"},   {Id: 169, Title: "SUCRE"},   {Id: 172, Title: "TOLIMA"},   {Id: 174, Title: "VALLE"},   {Id: 177, Title: "VAUPÉS"},   {Id: 179, Title: "VICHADA"}  ]
  const [datos, setDatos] = useState({
    titulo: "",
    tipoOferta: "Venta", //dejar valor defecto
    subtitulo: "",
    valor: "",
    fecha: "",
    autor: "",
    entradilla: "",
    cuerpo: "",
    url_Link: "",
    telefono: "",
    estado_clasificado: "Clasificado activo", //dejar valor defecto
    Imagen_x0020_Cargada:"",
    Imagen_x0020_descriptiva_x0020_A:"",
    Imagen_x0020_descriptiva_x0020_B:"",
    Imagen_x0020_descriptiva_x0020_C:"",
    Imagen_x0020_descriptiva_x0020_D:"",
    Imagen_x0020_descriptiva_x0020_E:"",
    Imagen_x0020_descriptiva_x0020_F:"",
    regional:"4",
    numRamd:1,
    fecha_expiracion:""
  });
  const [userData, setUserData] = useState("")

  const nombrImgConst=["Imagen_x0020_descriptiva_x0020_A","Imagen_x0020_descriptiva_x0020_B","Imagen_x0020_descriptiva_x0020_C","Imagen_x0020_descriptiva_x0020_D","Imagen_x0020_descriptiva_x0020_E","Imagen_x0020_descriptiva_x0020_F"]

  const [capvalidate, setCapvalidate] = useState(false);

    useEffect(() => {
      
      var numeTemp=Math.floor(Math.random() * 1000)
      console.log("pinta"+numeTemp);
      setDatos({
        ...datos,
        numRamd: numeTemp
      });
    }, [])

  function onchangeCapcha(value) {
    
    document
      .querySelector("#capcha>.invalid-feedback")
      .classList.remove("capchaSt");
    //console.log("Captcha value:", value);
  }

  const handleSubmit = (evt) => {
    //revisar imagen
    //console.log(datos)
    evt.preventDefault();
    setDatos({
      ...datos,
      autor:userData
    });
    validateImage(function (a) {
      if(a && validarNombre(datos.autor) && validateCapcha(recaptchaRef.current.getValue())){
     //if (a ) {
        var elementsImgs = document.getElementsByClassName("form-control-file");
        var elements = Array.from(elementsImgs);
          elements.reduce(function (prev, curr,ind) {
              return prev.then(()=>{
                return compruebaTama(curr)
              });
          }, Promise.resolve())
          .then(function (result) {
              //console.log("todas buen tamaño")
              props.onDataResponse(datos, imgInput1, imgImgExtra);
          },
          (fail) => {
            console.log("mal tamño")
          });
        //console.log(imgInput1.current.files[0]);
        //var parts = imgInput1.current.value.split('\\');
        //var fileName = parts[parts.length - 1];
        //console.log(fileName);
        
      } else {
        console.log("falta la imagen");
      }
    });
  };
  const validarNombre=(usuario)=>{
    
    if(usuario!=="" && usuario.length>=7){
      document.querySelector("#seleccionarUsuario>.invalid-feedback").style.display="none";
      return true;
    }else{
      document.querySelector("#seleccionarUsuario>.invalid-feedback").style.display="block";
      
      document.getElementById("tipoOferta").focus()
      return false;
    }
  }
  const onChangepro = (evt) => {
    //console.log(datos);

    switch (evt.currentTarget.id) {
      case "validacionTitulo":
        setDatos({
          ...datos,
          [evt.target.name]: evt.target.value,
          url_Link: generate_link(datos["titulo"], new Date()),
        });
        break;

      case "example-datetime-local-input":
        var e=new Date(evt.target.value);
        e.setMonth(e.getMonth() + 2)
       // console.log(evt.target.value)
       // console.log(e)
        setDatos({
          ...datos,
          [evt.target.name]: evt.target.value,
          url_Link: generate_link(datos["titulo"], new Date()),
          fecha_expiracion:e
        });
        break;
      default:
        setDatos({
          ...datos,
          [evt.target.name]: evt.target.value,
          autor:userData
        });
        break;
    }

  };
  const cargaImgSub = (data, obl, idIm) => {
    
    if (obl) {
      setDatos({
        ...datos,
        Imagen_x0020_Cargada:generate_name(data.name,datos.numRamd)
      });
      setImgInput1(data);
    } else {
      var index = imgImgExtra.findIndex((x) => x.id === idIm);

      var arrT = imgImgExtra;
      arrT[index].img = data;

      setDatos({
        ...datos,
        [nombrImgConst[index]]:generate_name(data.name,datos.numRamd)
      });
      setImgImgExtra(arrT);
    }
     //console.log(datos)
  };
  const verifyCallbackReCa = (response) => {
    if (response) {
      setCapvalidate(true);
    }
  };
  const generate_link = (title, fecha) => {
    var d = new Date(fecha);
    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

    let textFin = title.replace(/ /g, "_");
    textFin = textFin + Math.round(Math.random() * 1000) + `${da}-${mo}-${ye}`;

    return textFin;
  };

  const addImg = () => {
    setIdIm(idIm + 1);
    setImgImgExtra([...imgImgExtra, { id: idIm, img: null }]);
    // console.log(imgImgExtra)
  };
  const retirarImg = (e, id) => {
    var temp = imgImgExtra.filter((e) => {
      return e.id !== id;
    });
    setDatos({
      ...datos,
      [nombrImgConst[id]]:""
    });
    setImgImgExtra(temp);
   // console.log(temp);
  };
  const setUsuarioForm=(user)=>{
    //console.log(user)
   // console.log("desde usuario")
   setUserData(user)
    
 // console.log(datos)
  }

  return (
    <form
      className="needs-validation was-validated bordeFor animate__animated animate__fadeIn"
      onSubmit={handleSubmit}
    >
      <b className="text-danger">*</b> Campos requeridos
      <hr></hr>
      <div className="form-row">
        <div className="col-md-12 mb-3">
          <label col-md-12="validacionTitulo">
            <b className="text-danger">*</b>Título
          </label>
          <input
            type="text"
            className="form-control"
            id="validacionTitulo"
            placeholder="título"
            value={datos["titulo"]}
            onChange={(e) => onChangepro(e)}
            name="titulo"
            pattern="^[a-zA-Z0-9 ]*$"
            minLength="4"
            maxLength="50"
            required
          />
          <small id="validacionTitulo" className="form-text text-muted">
            No debe tener más de 50 caracteres, ni tener caracteres especiales como
            puntos , comas o tildes.
          </small>
        </div>
        <div className="col-md-12 mb-3">
          <label htmlFor="valsubtitulo">Destacado del clasificado</label>
          <input
            type="text"
            className="form-control"
            id="valsubtitulo"
            placeholder="subtítulo"
            maxLength="50"
            onChange={(e) => onChangepro(e)}
            value={datos["subtitulo"]}
            name="subtitulo"
          />
          <small id="valsubtitulo" className="form-text text-muted">
            No debe tener más de 50 caracteres.
          </small>
        </div>
        <div className="col-md-6 mb-3">
          <div className="form-group" id="seleccionarUsuario">
            <label htmlFor="selecAutor">
              <b className="text-danger">*</b>Nombre del titular u oferente
            </label>
            <GetUsuario setUsuario={setUsuarioForm}></GetUsuario>
            <div className="invalid-feedback">Debe selecionar un usuario</div>
            <small id="selecAutor" className="form-text text-muted">
              Escriba el nombre y seleccionelo con el autocompletar.
            </small>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="tipoOferta">
            <b className="text-danger">*</b>Tipo de oferta
          </label>
          <select
            className="form-control form-control-sm"
            id="tipoOferta"
            name="tipoOferta"
            value={datos["tipoOferta"]}
            onChange={(e) => onChangepro(e)}
            required
          >
            <option value="Venta">Venta</option>
            <option value="Convocatoria abierta">Convocatoria abierta</option>
            <option value="Arriendo">Arriendo</option>
            <option value="Permuta">Permuta</option>
            <option value="Remate">Remate</option>
            <option value="Subasta">Subasta</option>
            <option value="Alquiler">Alquiler</option>
          </select>
        </div>
        

        <div className="col-md-12 mb-3">
          <div className="row">
            <div className="col-md-6 mb-3">
              <SubirImagen
                handleSubImg={cargaImgSub}
                obligato={true}
              ></SubirImagen>
            </div>
            <div className="col-md-6 mb-3">
              {imgImgExtra.length <= 5 && (
                <button type="button" className="btn btn-info" onClick={addImg}>
                  Agregar otra imagen <AddIcon></AddIcon>
                </button>
              )}
            </div>
          </div>
          <div className="row">
            {imgImgExtra.map((item, i) => {
              return (
                <div key={item.id} className="col-md-6 mb-3">
                  <SubirImagen
                    handleSubImg={cargaImgSub}
                    obligato={false}
                    idIm={item.id}
                  ></SubirImagen>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(e) => retirarImg(e, item.id)}
                  >
                    Quitar imagen <ClearIcon></ClearIcon>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="valorOpc">
            <b className="text-danger">*</b>Valor
          </label>
          <input
            type="text"
            className="form-control"
            id="valorOpc"
            placeholder="Valor"
            pattern="^\d+$"
            value={datos["valor"]}
            name="valor"
            onChange={(e) => onChangepro(e)}
            required
          />
          <small id="valsubtitulo" className="form-text text-muted">
            Debe ser un número positivo sin puntos ni comas, ni caracteres
            especiales.
          </small>
        </div>
        
        <div className="col-md-6 mb-3">
          <div className="form-group">
            <label htmlFor="example-datetime-local-input" className="">
              <b className="text-danger">*</b>Fecha para publicación
            </label>

            <input
              className="form-control"
              type="datetime-local"
              value={datos["fecha"]}
              name="fecha"
              onChange={(e) => onChangepro(e)}
              id="example-datetime-local-input"
              required
            />
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <div className="form-group">
            <label htmlFor="selecEntradilla">
              <b className="text-danger">*</b>Describa como puede contactarse y su ubicación 
            </label>
            <textarea
              className="form-control"
              id="selecEntradilla"
              rows="3"
              pattern="^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$"
              minLength="4"
              maxLength="250"
              onChange={(e) => onChangepro(e)}
              value={datos["entradilla"]}
              name="entradilla"
              required
            ></textarea>
            <small id="selecEntradilla" className="form-text text-muted">
              El texto no debe ser mayor a 255 caracteres
            </small>
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <div className="form-group">
            <label htmlFor="selecCuerpo">
              <b className="text-danger">*</b>Descripción de lo que se ofrece
            </label>
            <textarea
              className="form-control"
              id="selecCuerpo"
              rows="3"
              pattern="^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*$"
              minLength="4"
              maxLength="250"
              onChange={(e) => onChangepro(e)}
              value={datos["cuerpo"]}
              name="cuerpo"
              required
            ></textarea>
            <small id="selecCuerpo" className="form-text text-muted">
              El texto no debe ser mayor a 255 caracteres
            </small>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="form-group ">
            <label htmlFor="tel-input" className="">
              <b className="text-danger">*</b>Teléfono
            </label>

            <input
              className="form-control"
              type="tel"
              placeholder="555-555-55-55"
              id="tel-input"
              minLength="4"
              maxLength="50"
              onChange={(e) => onChangepro(e)}
              value={datos["telefono"]}
              name="telefono"
              required
            />
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="tipoOferta">
            <b className="text-danger">*</b>Regional
          </label>
          <select
            className="form-control form-control-sm"
            id="seleRegional"
            name="seleRegional"
            value={datos["regional"]}
            onChange={(e) => {setDatos({
              ...datos,
              regional: e.target.value
            });}
            }
            required
          >
            {
              regionalesAr.map((item,ind)=>
                <option key={item.Title} value={item.Id}>{item.Title}</option>
              )
            }
          </select>
        </div>
        <div className="col-md-6 mb-3 ">
          <div className="nodisplay">
            <label htmlFor="estadoClasifi">
              <b className="text-danger">*</b>Estado actual clasificado
            </label>
            <select
              className="form-control form-control-sm"
              id="estadoClasifi"
              name="estado_clasificado"
              value={datos["estado_clasificado"]}
              onChange={(e) => onChangepro(e)}
              required
            >
              <option value="Clasificado activo">Clasificado activo</option>
              <option value="Clasificado inactivo">Clasificado inactivo</option>
              <option value="Clasificado anulado">Clasificado anulado</option>
              <option value="Vendido">Vendido</option>
              <option value="Unidades disponibles">Unidades disponibles</option>
              <option value="Asignado">Asignado</option>
            </select>
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <div id="capcha">
            {<ReCAPTCHA
                              sitekey="6LfwwdQZAAAAAJukkk7XrHVN8TAx9MLoz9jMDELT"
                              onChange={onchangeCapcha}
                              ref={recaptchaRef}
            /> }
            <div className="invalid-feedback ">Debe llenar el reCAPTCHA</div>
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="invalidCheck2"
                required
              />
              <label className="form-check-label" htmlFor="invalidCheck2">
                Esta de acuerdo con los términos y condiciones
              </label>
              <small id="selecEntradilla" className="form-text text-muted">
                <a
                  href="https://www.sena.edu.co/es-co/Paginas/politicasCondicionesUso.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver términos y condiciones
                </a>
              </small>
            </div>
          </div>
        </div>
        

        <div className="col-md-12 mb-3">
          <div className="form-group">
            <button className="btn btn-primary mb-3" type="submit">
              Solicitar publicación
            </button>
          </div>
          <div className="alert alert-danger animate__animated animate__fadeIn ocultar" role="alert">
            Hay imágenes repetidas, por favor cámbielas o elimínelas.
          </div>
        </div>
      </div>
    </form>
  );
};
function validateCapcha(cpcha) {
  if (cpcha) {
    document
      .querySelector("#capcha>.invalid-feedback")
      .classList.remove("capchaSt");
    return true;
  } else {
    document
      .querySelector("#capcha>.invalid-feedback")
      .classList.add("capchaSt");
    document.querySelector("#capcha>.invalid-feedback").focus();
    return false;
  }
}
function validateImage(result) {
  document.getElementsByClassName("alert-danger")[0].classList.remove("mostrar");
  document.getElementsByClassName("alert-danger")[0].classList.add("ocultar");

  var formData = new FormData();
  var elementsImgs = document.getElementsByClassName("form-control-file");

  for(var i=0; i < elementsImgs.length;i++){
    
   
    var elemtImg = elementsImgs[i];
    
    var file = elemtImg.files[0];

    var parts = elemtImg.value.split("\\");
    var fileName = parts[parts.length - 1];
    var alphaExp = /^[a-zA-Z0-9_-]{1,50}\.(\w+)$/;

    formData.append("Filedata", file);
    var t = file.type.split("/").pop().toLowerCase();

    let eletValIm = elemtImg.nextElementSibling;
    // valida ninguna imagen tenga mismo nombre
    
    
    if (t !== "jpeg" && t !== "jpg" && t !== "png" && t !== "bmp" && t !== "gif") {
      //console.log(elemtImg);
      eletValIm.innerText = "Debe ser fomato imagen valido : jpg, jpeg, png";
      elemtImg.focus();
      elemtImg.value = "";
      return result(false);
    } else if (file.size > 1024000) {
      elemtImg.focus();
      eletValIm.innerText = "Debe ser menor a 1MB";
      elemtImg.value = "";
      return result(false);
    } else if (!fileName.match(alphaExp)) {
      elemtImg.focus();
      eletValIm.innerText = `El nombre de la imagen no debe tener caracteres especiales (espacios, tíldes, símbolo) y no ser mayor a 50 caracteres. " ${fileName} "`;
      elemtImg.value = "";
      return result(false);
    } else if(i=== elementsImgs.length-1){  
      comprobarNombre(elementsImgs,function(dupli){
          if(dupli){
            return result(true);
          }else{
            document.getElementsByClassName("alert-danger")[0].classList.remove("ocultar");
            document.getElementsByClassName("alert-danger")[0].classList.add("mostrar");
            return result(false);
          }
      })
         //   return result(true);           
     }
    
  }

}
function comprobarNombre(elementsImgs,result){///promesa
  var temp=[];

  
  for(var i=0; i < elementsImgs.length;i++){
      temp.push( elementsImgs[i].files[0].name)
  }
  var uniq = temp
  .map((name,indx) => {
    return {
      ind:indx,
      count: 1,
      name: name
    }
  })
  .reduce((a, b) => {
    a[b.name] = (a[b.name] || 0) + b.count
    return a
  }, {})

var duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1)
  if(duplicates.length>0){
    result(false)
  }else{
    result(true)
  }
}

function generate_name(title,num){
  var d = new Date();
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);

  var parts = title.split(".");
  var fileName1 = parts[0];

  let textFin =
    fileName1 + `${da}-${mo}-${ye}`+num;

  textFin = textFin +"."+ parts[parts.length - 1];
 // console.log(textFin)
  return textFin;
};

function compruebaTama(elemtImg){//promesa

 // console.log(elemtImg)

      let eletValIm = elemtImg.nextElementSibling;
     
      return new Promise((resolve,reject)=>{
        var reader = new FileReader();

 
      //Read the contents of Image File.
      reader.readAsDataURL(elemtImg.files[0]);
      reader.onload = function (e) {
        //Initiate the JavaScript Image object.
        var image = new Image();

        //Set the Base64 string return from FileReader as source.
        image.src = e.target.result;

        //Validate the File Height and Width.
        image.onload = function () {
          var height = this.height;
          var width = this.width;
          // console.log("height "+height,width);
          if (height > 580 && height< 620 && width > 890 &&  width < 920) {
              // console.log("tanaño bien")
             resolve (true);
          } else {
            elemtImg.focus();
            elemtImg.value = "";
            eletValIm.innerText = `Tamaño de la imagen ${width}px ancho X ${height}px alto`;
            //console.log("tanaño mal")
            reject( false);
           
          }
        };
      }; 
      })   
  }
