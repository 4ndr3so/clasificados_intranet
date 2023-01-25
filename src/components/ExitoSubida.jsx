import React from "react";

const ExitoSubida = () => {
  return (
    <div className="alert alert-success animate__animated animate__fadeIn" role="alert">
      <h4 className="alert-heading">Tu solicitud ha sido recibida</h4>
      <p>
        Se Procesara tu solicitud
      </p>
      <hr />
      <p className="mb-0">
        Cuando sea aprobada la podras ver publicada
      </p>
      <a href="https://sena4.sharepoint.com/sites/nube20/clasificados"> Ir a la sección clasificados</a>
    </div>
  );
};

export default ExitoSubida;
