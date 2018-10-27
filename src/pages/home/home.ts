import { CargaArchivoProvider } from './../../providers/carga-archivo/carga-archivo';
import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SubirPage } from '../subir/subir';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  haymas:boolean = true;
  


  constructor(public modalCtrl:ModalController,
              public _cap: CargaArchivoProvider,) {
    
    
    // this.posts = afDB.list('post').valueChanges();

  }

  mostrar_modal(){

    let modal = this.modalCtrl.create( SubirPage);

    modal.present();

  }

  doInfinite(infiniteScroll) {

    console.log("Begin async operation");
    
    this._cap.cargar_imagenes().then(
      (hayMas:boolean)=>{
        
        
        console.log(hayMas);

        this.haymas = hayMas;
        infiniteScroll.complete();
      }
    );
  }

}
