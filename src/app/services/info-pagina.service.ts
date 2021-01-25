import { Injectable } from '@angular/core';

//cliente http
import { HttpClient } from '@angular/common/http';

//interface de mnodelo de datos.
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};

  cargada: boolean = false;

  equipo: any[] = [];

  constructor( private http: HttpClient) {

    //console.log('Servicio de info listo');

    //leer el JSON
    this.cargarInfo();

    //trae datos de firebase
    this.cargarEquipo();

   }


   private cargarInfo(){

    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) => {

        this.cargada = true;

        this.info = resp;
      });
   }

   private cargarEquipo(){

    this.http.get('https://angular-html-268a8-default-rtdb.europe-west1.firebasedatabase.app/equipo.json')
      .subscribe( (respuesta : any[]) => {
        this.equipo = respuesta;
      })
   }
}
