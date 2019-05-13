import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */




@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public usuario:any = {};
  public mensaje: any = "";
  public error: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  /**
  * Carga el contenido del seo de la pagina
  *
  * @param Object   datos del seo
  */

  registrarUsuario(){
    this.mensaje = "";
    let validacion = this.validarInformacion();
    if( validacion[0] == false ){
      let datos = {
        "birthdate": this.usuario.fechaNacimiento,
        "firstname": this.usuario.nombres,
        "lastname": this.usuario.apellidos,
        "identification": this.usuario.identificacion
      };
      console.log( datos );
    }else{
      this.mensaje = validacion[1];
    }
  }

  /**
  * Valida la existencia del usuario en la base de datos
  *
  * @return array     [boolean con validacion del error, mensaje a mostrar]
  */
  validarInformacion(){
    let mensaje = "";
    let error = false;
    let fechaActual = new Date();
    fechaActual = new Date( fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() );
    let edad = this.calcularEdad(this.usuario.fechaNacimiento, fechaActual);
    //validacion de campos vacios
    if (  this.usuario.nombres == undefined && this.usuario.apellidos == undefined && this.usuario.identificacion == undefined && this.usuario.fechaNacimiento == undefined ){
      mensaje = "Los campos estan vacios";
      error = true;
    }else if (  this.usuario.nombres == undefined || this.usuario.apellidos == undefined || this.usuario.identificacion == undefined || this.usuario.fechaNacimiento == undefined ){
      mensaje = "Los campos estan vacios";
      error = true;
    }else if ( isNaN(parseInt(this.usuario.identificacion ) ) ){
      mensaje = "Número de identifiación invalido";
      error = true;
    } else if( edad < 18  ){
      mensaje = "Lo sentimos, debes ser mayor de edad para poder registrarte";
      error = true;
    }
    return [ error, mensaje ];
  }

  /**
  * Valida la edad del usuario
  *
  * @param Date   fecha de nacimiento del usuario
  * @param Date   fecha actual
  *
  * @return Integer     edad del usuario
  */
  calcularEdad( nacimiento:any, actual:any ){
    if( nacimiento != undefined ){
      var fnacimiento = new Date( nacimiento );
      var factual = new Date( actual );
      var diferencia = factual.getFullYear() - fnacimiento.getFullYear();
      var mes = factual.getMonth() - fnacimiento.getMonth();
      if ( mes < 0 || ( mes === 0 && factual.getDate() < fnacimiento.getDate()+1 ) ) {
        diferencia--;
      }
    }else{
      diferencia = 0;
    }
    return diferencia;
  }
}
