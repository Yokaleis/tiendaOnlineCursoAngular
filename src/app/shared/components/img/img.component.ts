import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  
  @Input() img: String = '';
  /* Mediante el metodo emit() de la instancia EvenEmitter enviará el valor al componente padre que se encuentre escuchando el evento. */
  @Output() loaded = new EventEmitter <String> ();

  imgDefault = './assets/images/no-image.png';

  /*ngDestroy y SetInput - Funcion especial: liberar espacio en memoria.*/
  /*Ejemplo: implementar un contador */
  //counter = 0;
  /*Para detener el setinterval y matar ese proceso primero creamos una variable*/
  //counterFn: number | undefined;

  /*Ciclos de vida de componentes*/
  constructor() { 
    //Corre antes del render - NO correr peticiones async - corre una sola vez
    console.log('Constructor', 'ImgValue =>', this.img);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Corre antes del render - evalua cambios - corre muchas veces
    console.log('OnChanges', 'ImgValue =>', this.img);
  }

  ngOnInit(): void {
    //Corre antes del render - SI podemos correr peticiones async - fetch - corre una sola vez
    console.log('ngOnInit', 'ImgValue =>', this.img);
    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1;
    //   console.log('Run counter');
    // }, 1000 );
  }

  ngAfterViewInit(): void {
    //Corre despues del render - aca se manipulan los componentes hijos - relacionado directivas
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    //Corre solo cuando se elimina un componente
    console.log('ngOnDestroy');

    //Limpiamos o borramos el evento del intervalo
    // window.clearInterval(this.counterFn);
  }

  /*FIN Ciclos de vida de componentes*/

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    console.log('Ha llegado al componente hijo');
    this.loaded.emit(this.img);
  }

}
