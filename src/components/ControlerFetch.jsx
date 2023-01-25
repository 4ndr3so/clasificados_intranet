import React, { useState, useEffect } from "react";
import { apijsonCargaim1, subirFormulario } from "../api/apiRest";
import { uploadFileImg, createListItem } from "../api/apiRest";
import CheckIcon from "@material-ui/icons/Check";

export const ControlerFetch = (props) => {
  //const [subida, setSubida] = useState(false);
  const [procesActual, setProcesActual] = useState("Subiendo 1 imagen");
  useEffect(() => {
    let mounted = true;
    async function fetchMyAPI() {
      let response = await uploadFileImg(props.datos.archivo,props.datos.dtoform.numRamd).then(
        (successMessage) => {
          // succesMessage es lo que sea que pasamos en la función resolve(...) de arriba.
          // No tiene por qué ser un string, pero si solo es un mensaje de éxito, probablemente lo sea.
          if (mounted) {
            console.log("¡Sí! " , successMessage);
            console.log(props.datos);
            // console.log(props.datos.archivosExtra.length);
            if (props.datos.archivosExtra.length > 0) {
              props.datos.archivosExtra
                .reduce(function (prev, curr, ind) {
                  // console.log(prev);
                  // console.log(curr);
                  return prev.then(
                    () => {
                      if (mounted) {
                        setProcesActual(`Subiendo ${ind + 2} imagen`);
                        return uploadFileImg(curr.img,props.datos.dtoform.numRamd);
                      }
                    },
                    (fail) => {
                      console.log("¡NO! ",fail );
                      
                      setProcesActual("Fallo el proceso");
                      props.onSubida(false);
                    }
                  );
                }, Promise.resolve())
                .then(function (result) {
                  if (mounted) {
                    setProcesActual("Subiendo formulario");
                    terminaSubForm(result);
                  }
                })
                .catch((err) => {
                  console.log("¡NO! " , err);
                  setProcesActual("Fallo el proceso");
                  props.onSubida(false);
                });
            } else {
              if (mounted) {
                setProcesActual("Subiendo formulario");
                terminaSubForm(successMessage);
              }
            }
          }
        },
        (fail) => {
          console.log("¡NO! " , fail);
          setProcesActual("Fallo el proceso");
          props.onSubida(false);
        }
      );

      function terminaSubForm(successMessage) {
        createListItem(props.datos).then(
          (successMessage) => {
            if (mounted) {
              console.log("¡Sí! " , successMessage);
              setProcesActual("Finalizo");
              props.onSubida(true);
            }
          },
          (fail) => {
            console.log("¡NO! " + fail);
            setProcesActual("Fallo el proceso");
            props.onSubida(false);
          }
        );
      }

      
     /*  let response = await apijsonCargaim1(props.datos.archivo,props.datos.dtoform.numRamd).then(
        (successMessage) => {
          // succesMessage es lo que sea que pasamos en la función resolve(...) de arriba.
          // No tiene por qué ser un string, pero si solo es un mensaje de éxito, probablemente lo sea.
          if (mounted) {
            console.log("¡Sí! " + successMessage);
            //console.log(props.datos.archivosExtra);
            // console.log(props.datos.archivosExtra.length);
            if (props.datos.archivosExtra.length > 0) {
              props.datos.archivosExtra
                .reduce(function (prev, curr, ind) {
                  console.log(prev);
                  console.log(curr);
                  return prev.then(
                    () => {
                      if (mounted) {
                        setProcesActual(`Subiendo ${ind + 2} imagen`);
                        return apijsonCargaim1(curr.img,props.datos.dtoform.numRamd);
                      }
                    },
                    (fail) => {
                      console.log("¡NO! " + fail);
                      setProcesActual("Fallo el proceso");
                      props.onSubida(false);
                    }
                  );
                }, Promise.resolve())
                .then(function (result) {
                  if (mounted) {
                    setProcesActual("Subiendo formulario");
                    terminaSubForm(result);
                  }
                })
                .catch((err) => {
                    console.log("¡NO! " + err);
                      setProcesActual("Fallo el proceso");
                      props.onSubida(false);
                });
            } else {
              if (mounted) {
                setProcesActual("Subiendo formulario");
                terminaSubForm(successMessage);
              }
            }
          }
        },
        (fail) => {
          console.log("¡NO! " + fail);
          setProcesActual("Fallo el proceso");
          props.onSubida(false);
        }
      );

      function terminaSubForm(successMessage) {
        subirFormulario(props.datos,successMessage).then(
          (successMessage) => {
            if (mounted) {
              console.log("¡Sí! " + successMessage);
              setProcesActual("Finalizo");
              props.onSubida(true);
            }
          },
          (fail) => {
            console.log("¡NO! " + fail);
            setProcesActual("Fallo el proceso");
            props.onSubida(false);
          }
        );
      }  */
    } //fin

    fetchMyAPI();
    return function cleanup() {
      mounted = false;
    };
  }, []);

  return (
    <div className="text-center animate__animated animate__fadeIn">
      <div className="alert alert-info mb-0" role="alert">
        <h4 className="alert-heading">Procesando tu solicitud</h4>
        {true ? (
          <div>
            <p>
              {procesActual}
              {"  "}
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Loading...</span>
            </p>
          </div>
        ) : (
          <p>
            Imagenes subidas <CheckIcon />
          </p>
        )}
        <hr />
        <p className="mb-0">Espera un momento</p>
      </div>
      <div className="progress">
        <div
          className="progress-bar-animated progress-bar-striped bg-info progresoU"
          role="progressbar"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
};

/*
let response = await apijsonCargaim1(props.datos).then((successMessage) => {
            // succesMessage es lo que sea que pasamos en la función resolve(...) de arriba.
            // No tiene por qué ser un string, pero si solo es un mensaje de éxito, probablemente lo sea.
            console.log("¡Sí! " + successMessage());
          
            setProcesActual("Subiendo 2 imagen")
            return apijsonCargaim2()
          },(fail) => {

            console.log("¡NO! " + fail);
            setProcesActual("Fallo el proceso")      
            props.onSubida(false);
          }).then((successMessage) => {

            if(mounted){
            console.log("¡Sí! " + successMessage);
            setProcesActual("Subiendo 3 imagen")
            return apijsonCargaim3()
            }
          },(fail) => {

            console.log("¡NO! " + fail);
            setProcesActual("Fallo el proceso")
            props.onSubida(false);
          }).then((successMessage) => {
    
            if(mounted){
            console.log("¡Sí! " + successMessage);
            setProcesActual("Subiendo 4 imagen")
            return apijsonCargaim4()
            }
          },(fail) => {

            console.log("¡NO! " + fail);
            setProcesActual("Fallo el proceso")
            props.onSubida(false);
          }).then((successMessage) => {
            if(mounted){
            console.log("¡Sí! " + successMessage);
            setProcesActual("Subiendo formulario")
            return subirFormulario();
            }
          },(fail) => {

            console.log("¡NO! " + fail);
            setProcesActual("Fallo el proceso")   
            props.onSubida(false);
          }).then((successMessage) => {
                if(mounted){
                    console.log("¡Sí! " + successMessage);
                    setProcesActual("Finalizo")      
                    props.onSubida(true);
                }
            
          },(fail) => {

            console.log("¡NO! " + fail);
            setProcesActual("Fallo el proceso")        
            props.onSubida(false);
          })

  

*/

/*
await uploadFileImg(props.datos.archivo).then((successMessage) => {
            
            if(mounted){
              //console.log("¡Sí! " + successMessage);
              setProcesActual("Subiendo el formulario")
              //console.log(props.datos)
              return createListItem(props.datos)
              }

          },(fail) => {
            
            console.log("¡NO! " + fail);
            setProcesActual("Fallo el proceso")      
            props.onSubida(false);
          }).then((successMessage) => {
            if(mounted){
                console.log("¡Sí! " + successMessage);
                setProcesActual("Finalizo")      
                props.onSubida(true);
            }
        
          },(fail) => {

            console.log("¡NO! " + fail);
            setProcesActual("Fallo el proceso")        
            props.onSubida(false);
          }) 
*/
