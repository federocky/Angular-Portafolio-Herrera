import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  
  cargando: boolean = true;

  productos: Producto[] = [];

  productoFiltrado: Producto[] = [];


  constructor( private http: HttpClient) {

    this.cargarProductos();

  }



  private cargarProductos(){

    /**
     * Aqui tenemos que utilizar una promesa porque si no al buscar algo
     * es posible que se lance el metodo buscar antes de que se reciban los datos por tanto
     * hacemos lo siguiente
     */
    return new Promise( (resolve:any, reject ) =>{

      this.http.get('https://angular-html-268a8-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
      .subscribe( (respuesta: Producto[]) => {
        this.productos = respuesta;
        this.cargando = false;
        //aqui estamos resolviendo cuando todo esta hecho y tenemos los datos.
        resolve();
      });

    });

  }

  getProducto( id:string ){

    return this.http.get(`https://angular-html-268a8-default-rtdb.europe-west1.firebasedatabase.app/productos/${ id }.json`);

  }

  buscarProducto( termino: string){

    //si es 0 es que todavia no tengo los datos.
    if(this.productos.length === 0 ) {

      //debemos esperar a que cargen los productos para poder filtrar.
      this.cargarProductos().then (() =>{
        //una vez ya tengo los productos aplicacmos el filtro
        this.filtrarProductos( termino );
      });

    } else {
      this.filtrarProductos( termino );
    }
  }


  filtrarProductos( termino: string ) {

    this.productoFiltrado = [];

    termino = termino.toLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLowerCase();

      if( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf(termino) >= 0 ) {
        this.productoFiltrado.push(prod);
      }
    });
  }

}
