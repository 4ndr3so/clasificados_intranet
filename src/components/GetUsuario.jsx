import React, { useEffect, useState } from "react";
import $ from "jquery";
var MyPeoplePicker = window.MyPeoplePicker;
var mp;
var usuarioGlo = window.usuarioGlo;

export const GetUsuario = (props) => {
    const pikerperso = React.createRef();
  const [personaSelec, setPersonaSelec] = useState(null);
  const  [mapUSer, setMapUSer] = useState(null)

  

  var obtenerusuario = function () {
    //console.log("intenta piker");
    if (MyPeoplePicker !== undefined) {
      //console.log("crea el piker");
      mp =new MyPeoplePicker();
      mp.init("peoplePickerDiv", { AllowMultipleValues: false });
      setMapUSer(mp)
      //console.log(pikerperso.current)
        
    }

    $(pikerperso.current).on("user:changed", function () {
        //console.log("cambia");
    // triggered when the users changed
        var users = mp.getUsers().map(function (u) {
        return u.DisplayText;
        });
       // console.log(users[0]);
        usuarioGlo=users[0];
        setPersonaSelec(usuarioGlo);
        props.setUsuario(usuarioGlo);
    });
    
    function getInfo() {
      //console.log(mp.getUsers()); // -> return an array of the users
      mp.getUsersID(function () {
        console.log(arguments); // -> return the User ID
      });
    }
  };


  useEffect(() => {
    obtenerusuario();

    
  }, []);
  const changeDiv=()=>{
   // console.log(pikerperso.current)
    //  console.log("cambio algo")
  }

  return <div id="peoplePickerDiv" ref={pikerperso} onChange={changeDiv}></div>;
};


