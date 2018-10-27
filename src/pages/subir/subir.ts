import { CargaArchivoProvider } from './../../providers/carga-archivo/carga-archivo';
import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker,ImagePickerOptions } from '@ionic-native/image-picker';



@Component({
  selector: 'page-subir',
  templateUrl: 'subir.html',
})
export class SubirPage {

  titulo: string = "";

  imgPreview:string = "";
  imagen64:string;

  constructor(public viewCtrl: ViewController,
    private camera: Camera,
    private imgPicker:ImagePicker,
    public _cap: CargaArchivoProvider) {
  }

  cerrar_modal() {
    this.viewCtrl.dismiss();
  }

  mostrar_camara() {

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
     this.imgPreview = 'data:image/jpeg;base64,' + imageData;
     this.imagen64 = imageData;
    }, (err) => {
      // Handle error
      console.log("ERROR EN CAMARA: ", JSON.stringify(err))
    });



  }

  selecPicture(){

    let options:ImagePickerOptions = {
      quality:70,
      outputType:1,
      maximumImagesCount:1

    }

    this.imgPicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          // console.log('Image URI: ' + results[i]);

     this.imgPreview = 'data:image/jpeg;base64,' + results[i];
     this.imagen64 = results[i];

      }
    }, (err) => { 
      console.log("ERROR EN SELECPIC: ", JSON.stringify(err));
    });

  }

  crear_post(){

    let archivo = {
     img:this.imagen64,
     titulo:this.titulo
    }

    this._cap.cargar_imagen_firebase(archivo)
    .then( ()=> this.cerrar_modal());
  }

}
