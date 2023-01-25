import React from "react";

const ErrorSubida = () => {
  return (
    <div className="alert alert-danger animate__animated animate__fadeIn" role="alert">
      <h4 className="alert-heading">Tu solicitud no pudio ser procesada</h4>
      <p>
        Intentalo de nuevo más tarde, asegurate de escribir un nombre correcto en el Nombre del titular u oferente
      </p>
      <hr />
      <p className="mb-0">
        Te avisaremos
      </p>
      <a href="https://sena4.sharepoint.com/sites/nube20/clasificados"> Ir a la sección clasificados</a>
    </div>
  );
};

export default ErrorSubida;
