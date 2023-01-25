import React from 'react'


const SubirImagen = (props) => {
 
    const imgInput1 = React.createRef();

    const onChangepro = (evt) => {
       // console.log(evt.target.id);
    
       // console.log(imgInput1.current.files[0]);
        props.handleSubImg(imgInput1.current.files[0],props.obligato,props.idIm);
      };
    return (
        <div className="form-group" id="seleImagen">
        <label htmlFor="selecImgPrin1">
        <b className="text-danger">*</b>  {props.obligato ? <> Imagen principal </>: "Imagen Secundaria" } 
        </label>

        <input
          type="file"
          className="form-control-file"
          id="selecImgPrin1"
          accept="image/*"
          ref={imgInput1}
          onChange={(e) => onChangepro(e)}
          
           required
        />
        <div className="invalid-feedback">Debe selecionar una imagen</div>
        <small id="valsubtitulo" className="form-text text-muted">
          Debe ser una imagen de 900 pixeles de ancho X 600 pixeles de alto
          y pesar menos de 1MB, el nombre no debe tener caracteres especiales
        </small>
      </div>
    )
}



export default SubirImagen
