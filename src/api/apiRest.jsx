import $ from "jquery";
const SP = window.SP;
const _spPageContextInfo = window._spPageContextInfo;

/*------------------ --------------------------- ------------------------ ----------------*/
$(document).ready(function () {
  // Check for FileReader API (HTML5) support.
  if (!window.FileReader) {
    alert("This browser does not support the FileReader API.");
  }

  if (SP != null) {
    SP.SOD.executeFunc("SP.js", "SP.ClientContext", function () {
     // console.log("Ejecuta cliente");
      //console.log(SP.ClientContext);
    });
  }

});

// Upload the file.
// You can upload files up to 2 GB with the REST API.
export function uploadFileImg(fileRecibido,consecu) {//solo recibe el archivo
  console.log("empieza carga");
 // console.log(fileRecibido)
  // Define the folder path for this example.
  var serverRelativeUrlToFolder = "ImagenesClasificados";

  // Get test values from the file input and text input page controls.
  //var fileInput = $('#fileinput');
  //var newName = $('#fileinput').val();
  

  // Get the server URL.
  var serverUrl = _spPageContextInfo.webAbsoluteUrl;

  // Initiate method calls using $ promises.
  // Get the local file as an array buffer.
  return new Promise((resolve, reject) => {

    var newName = generate_name(fileRecibido.name,consecu);///le cambio el nombre
    //var newName =fileRecibido.name;///le cambio el nombre

    var getFile = getFileBuffer();
    getFile.done(function (arrayBuffer) {
      // Add the file to the SharePoint folder.
      //console.log("empieza agrega archivo");
      var addFile = addFileToFolder(arrayBuffer);
      addFile.done(function (file, status, xhr) {
        // Get the list item that corresponds to the uploaded file.
        var getItem = getListItem(file.d.ListItemAllFields.__deferred.uri);
        getItem.done(function (listItem, status, xhr) {
          // Change the display name and title of the list item.
          var changeItem = updateListItem(listItem.d.__metadata);
          changeItem.done(function (data, status, xhr) {
            //alert("file uploaded and updated");
            resolve(newName);
          });

          changeItem.fail(onError);
        });

        getItem.fail(onError);
      });

      addFile.fail(onError);
    });

    getFile.fail(onError);

    // Display error messages.
    function onError(error) {
     // console.log("fallo", error);
      //alert(error.responseText);
      reject(error);
    }

    // Get the local file as an array buffer.
    function getFileBuffer() {
     // console.log("entra getFile Buffer");
      var deferred = $.Deferred();
      var reader = new FileReader();
      reader.onloadend = function (e) {
       // console.log(e.target.result);
        deferred.resolve(e.target.result);
      };
      reader.onerror = function (e) {
       // console.log("error getFileBuffer ", e, e.target.error);
        deferred.reject(e.target.error);
      };
      reader.readAsArrayBuffer(fileRecibido);
     // console.log(fileRecibido);
      return deferred.promise();
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

    // Add the file to the file collection in the Shared Documents folder.
    function addFileToFolder(arrayBuffer) {
      // Get the file name from the file input control on the page.
     // console.log(arrayBuffer);
      /* var parts = fileInput[0].value.split('\\');
  var fileName = parts[parts.length - 1]; */

      // Construct the endpoint.
      var fileCollectionEndpoint = String.format(
        "{0}/_api/web/getfolderbyserverrelativeurl('{1}')/Files" +
          "/add(url='{2}',overwrite=true)",
        serverUrl,
        serverRelativeUrlToFolder,
        newName
      );

      // Send the request and return the response.
      // This call returns the SharePoint file.
      //console.log("nombre addfiletofolder", fileCollectionEndpoint);
      return $.ajax({
        url: fileCollectionEndpoint,
        type: "POST",
        data: arrayBuffer,
        processData: false,
        headers: {
          accept: "application/json;odata=verbose",
          "X-RequestDigest": $("#__REQUESTDIGEST").val(),
        },
      });
    }

    // Get the list item that corresponds to the file by calling the file's ListItemAllFields property.
    function getListItem(fileListItemUri) {
      // Send the request and return the response.
      return $.ajax({
        url: fileListItemUri,
        type: "GET",
        headers: { accept: "application/json;odata=verbose" },
      });
    }

    // Change the display name and title of the list item.
    function updateListItem(itemMetadata) {
      // Define the list item changes. Use the FileLeafRef property to change the display name.
      // For simplicity, also use the name as the title.
      // The example gets the list item type from the item's metadata, but you can also get it from the
      // ListItemEntityTypeFullName property of the list.
      var body = String.format(
        "{{'__metadata':{{'type':'{0}'}},'FileLeafRef':'{1}','Title':'{2}'}}",
        itemMetadata.type,
        newName,
        newName
      );
     // console.log(itemMetadata, body, newName);
      // Send the request and return the promise.
      // This call does not return response content from the server.
      return $.ajax({
        url: itemMetadata.uri,
        type: "POST",
        data: body,
        headers: {
          "X-RequestDigest": $("#__REQUESTDIGEST").val(),
          "content-type": "application/json;odata=verbose",
          "IF-MATCH": itemMetadata.etag,
          "X-HTTP-Method": "MERGE",
        },
      });
    }
  });
}

/*------------------ --------------------------- ------------------------ ----------------*/
export function createListItem(fileRecibido) {
  var deferred = $.Deferred();
  //console.log(fileRecibido,nombre);
  var clientContext = new SP.ClientContext(
    "https://sena4.sharepoint.com/sites/nube20"
  );
  var oList = clientContext
    .get_web()
    .get_lists()
    .getByTitle("01_SENAClasificados");

  var itemCreateInfo = new SP.ListItemCreationInformation();

  //console.log(oList);
  var oListItem = oList.addItem(itemCreateInfo);
 // console.log(oListItem);
  var selectedUser = SP.FieldUserValue.fromUser(
    fileRecibido.dtoform.autor
  );
  //console.log(selectedUser);

  oListItem.set_item("Title", fileRecibido.dtoform.titulo);
  oListItem.set_item("Tipo_x0020_de_x0020_oferta", fileRecibido.dtoform.tipoOferta);
  oListItem.set_item("Subt_x00ed_tulo", fileRecibido.dtoform.subtitulo);
  oListItem.set_item("Valor", fileRecibido.dtoform.valor);
  oListItem.set_item(
    "Imagen_x0020_Cargada",
    `<img alt='${fileRecibido.dtoform.titulo}' src='/sites/nube20/ImagenesClasificados/${fileRecibido.dtoform.Imagen_x0020_Cargada}'>`
  );
  if(fileRecibido.dtoform.Imagen_x0020_descriptiva_x0020_A!==""){
    oListItem.set_item(
      "Imagen_x0020_descriptiva_x0020_A",
      `<img alt='${fileRecibido.dtoform.titulo}' src='/sites/nube20/ImagenesClasificados/${fileRecibido.dtoform.Imagen_x0020_descriptiva_x0020_A}'>`
    );
  }
  if(fileRecibido.dtoform.Imagen_x0020_descriptiva_x0020_B!==""){
    oListItem.set_item(
      "Imagen_x0020_descriptiva_x0020_B",
      `<img alt='${fileRecibido.dtoform.titulo}' src='/sites/nube20/ImagenesClasificados/${fileRecibido.dtoform.Imagen_x0020_descriptiva_x0020_B}'>`
    );
  }
  if(fileRecibido.dtoform.Imagen_x0020_descriptiva_x0020_C!==""){
    oListItem.set_item(
      "Imagen_x0020_descriptiva_x0020_C",
      `<img alt='${fileRecibido.dtoform.titulo}' src='/sites/nube20/ImagenesClasificados/${fileRecibido.dtoform.Imagen_x0020_descriptiva_x0020_C}'>`
    );
  }
  if(fileRecibido.dtoform.Imagen_x0020_descriptiva_x0020_D!==""){
    oListItem.set_item(
      "Imagen_x0020_descriptiva_x0020_D",
      `<img alt='${fileRecibido.dtoform.titulo}' src='/sites/nube20/ImagenesClasificados/${fileRecibido.dtoform.Imagen_x0020_descriptiva_x0020_D}'>`
    );
  }
  if(fileRecibido.dtoform.Imagen_x0020_descriptiva_x0020_E!==""){
    oListItem.set_item(
      "Imagen_x0020_descriptiva_x0020_E",
      `<img alt='${fileRecibido.dtoform.titulo}' src='/sites/nube20/ImagenesClasificados/${fileRecibido.dtoform.Imagen_x0020_descriptiva_x0020_E}'>`
    );
  }
  if(fileRecibido.dtoform.Imagen_x0020_descriptiva_x0020_F!==""){
    oListItem.set_item(
      "Imagen_x0020_descriptiva_x0020_F",
      `<img alt='${fileRecibido.dtoform.titulo}' src='/sites/nube20/ImagenesClasificados/${fileRecibido.dtoform.Imagen_x0020_descriptiva_x0020_F}'>`
    );
  }

  oListItem.set_item("Autor_x002d_", selectedUser);
  oListItem.set_item(
    "Fecha_x0020_para_x0020_publicaci",
    fileRecibido.dtoform.fecha
  );
  oListItem.set_item(
    "Fecha_x0020_expiraci_x00f3_n",
    fileRecibido.dtoform.fecha_expiracion
  );
  oListItem.set_item(
    "Entradilla",
    fileRecibido.dtoform.entradilla
  );
  oListItem.set_item("Cuerpo", fileRecibido.dtoform.cuerpo);
  oListItem.set_item("Direcci_x00f3_n_x0020_de_x0020_a", fileRecibido.dtoform.url_Link);
  oListItem.set_item("Tel_x00e9_fonos_x0020_de_x0020_c", fileRecibido.dtoform.telefono);
  oListItem.set_item("Estado_x0020_actual_x0020_del_x0", fileRecibido.dtoform.estado_clasificado);
  oListItem.set_item("Regional", fileRecibido.dtoform.regional);

  oListItem.update();

  clientContext.load(oListItem);

  clientContext.executeQueryAsync(
    function (sender, args) {
      //alert("Item created: " + oListItem.get_id());
      deferred.resolve(sender, args);
    },
    function (sender, args) {
      /* alert(
        "Request failed. " + args.get_message() + "\n" + args.get_stackTrace()
      ); */
      deferred.reject(sender, args);
    }
  );
  return deferred.promise();
}




let varie=0;
/*---------- ------------------------------ -------------------------- ------------------------- */
export function apijsonCargaim1(fileRecibido,name) {//recibe solo el archivo

  //comprueba
     // console.log(fileRecibido);
      return new Promise((resolve, reject) => {
        // Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
        // En este ejemplo, usamos setTimeout(...) para simular código asíncrono.
        // En la vida real, probablemente uses algo como XHR o una API HTML5.
        console.log("empieza api");
        console.log(fileRecibido);
        console.log(generate_name(fileRecibido.name,name));
      // console.log(fileRecibido.archivo);
        //console.log(fileRecibido.archivosExtra);

        setTimeout(function () {
          varie++;
          if(varie===9){
            reject("rechazo el archivo"); // ¡Todo salió bien!
          }else{
            resolve("Suvio el archivo"); // ¡Todo salió bien!
          }
          
        }, 2000);

        /* setTimeout(function(){
            reject("algo salido mal!"); // ¡Todo salió bien!
          }, 600);*/
      });

  
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
 
}
export var apijsonCargaim2 = () =>
  new Promise((resolve, reject) => {
    // Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
    // En este ejemplo, usamos setTimeout(...) para simular código asíncrono.
    // En la vida real, probablemente uses algo como XHR o una API HTML5.
    console.log("empieza2");
    setTimeout(function () {
      resolve("¡Éxito! im2"); // ¡Todo salió bien!
    }, 2000);

    /* setTimeout(function(){
        reject("algo salido mal!"); // ¡Todo salió bien!
      }, 600);*/
  });
export var apijsonCargaim3 = () =>
  new Promise((resolve, reject) => {
    // Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
    // En este ejemplo, usamos setTimeout(...) para simular código asíncrono.
    // En la vida real, probablemente uses algo como XHR o una API HTML5.
    console.log("empieza3");
    setTimeout(function () {
      resolve("Exito! im3"); // ¡Todo salió bien!
    }, 1000);

    /* setTimeout(function(){
        reject("algo salido mal!"); // ¡Todo salió bien!
      }, 600);*/
  });
export var apijsonCargaim4 = () =>
  new Promise((resolve, reject) => {
    // Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
    // En este ejemplo, usamos setTimeout(...) para simular código asíncrono.
    // En la vida real, probablemente uses algo como XHR o una API HTML5.
    console.log("empieza4");
    setTimeout(function () {
      resolve("¡Éxito! im4"); // ¡Todo salió bien!
    }, 2000);

    /* setTimeout(function(){
        reject("algo salido mal!"); // ¡Todo salió bien!
      }, 600);*/
  });
export var subirFormulario = (datos,nombre) =>
  new Promise((resolve, reject) => {
    // Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
    // En este ejemplo, usamos setTimeout(...) para simular código asíncrono.
    // En la vida real, probablemente uses algo como XHR o una API HTML5.
    console.log("empieza subida form");
    console.log(datos);
    console.log(nombre);
    setTimeout(function () {
      resolve("¡Éxito! form"); // ¡Todo salió bien!
    }, 3000);

    /* setTimeout(function(){
        reject("algo salido mal!"); // ¡Todo salió bien!
      }, 600);*/
  });
