import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENV } from '../../conf/ENV';
//import { Observable } from 'rxjs/Observable';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  private url: string;//= "http://192.168.1.209/Api/cuenta";
  private environment: any;

  constructor( private http: HttpClient, private env: ENV ) {
    this.environment = env.getEnv();
    this.url = this.environment.API_URL;
  }

  /**
  * Valida la existencia del usuario en la base de datos
  *
  * @param Object    Datos del usuario
  *
  * @return promise     respuesta del servidor
  */
  registroUsuario( usuario: any ){

    console.log( this.url );
   return this.http.post( this.url , usuario );
  }

}
