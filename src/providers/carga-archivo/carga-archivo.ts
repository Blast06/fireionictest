import { Injectable } from '@angular/core';


// import firebase from 'firebase/app';
import * as firebase from 'firebase';
import { ToastController } from '../../../node_modules/ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import "rxjs/add/operator/map";


@Injectable()
export class CargaArchivoProvider {

  imagenes: ArchivoSubir[] = [];
  lastKey: string = null;

  constructor(public toastCtrl: ToastController,
    public afDB: AngularFireDatabase) {

    this.cargar_ultimo_key().subscribe( ()=> this.cargar_imagenes() )
    

  }

  cargar_imagenes(){

    return new Promise( (resolve, reject)=>{

      this.afDB.list('/post',
      ref=> ref.limitToLast(3)
               .orderByKey()
               .endAt(this.lastKey)
      
      
               //aqui tenemos todos los registros
      ).valueChanges().subscribe( (posts:any)=>{

        //borrar la ultima posicion del arreglo para que 
        // no salga repetido el post
        posts.pop();
        if (posts.length ==0) {
          console.log("YA NO HAY MAS REGISTROS");
          resolve(false);
          return;
          
        }

        this.lastKey = posts[0].key;

        //para ir insertando los posts en el arreglo llamado posts
        for( let i = posts.length-1; i>=0; i--){
          let post = posts[i];
          this.imagenes.push(post);
        }
        //para decir que pueden haber mas posts.
        resolve(true);

      });

    });

  }

  private cargar_ultimo_key() {
    return this.afDB.list('/post', ref => ref.orderByKey().limitToLast(1))
      .valueChanges()
      .map((post:any) => {

        console.log("POST en cargar ultimo key: ", post);

        this.lastKey = post[0].key;
        this.imagenes.push( post[0]);
        console.log("imagenes: ", this.imagenes);

      })


  }

  cargar_imagen_firebase(archivo: ArchivoSubir) {

    let promesa = new Promise((resolve, reject) => {

      this.mostrar_toast('Cargando...');

      let storeRef = firebase.storage().ref();
      let nombreArchivo: string = new Date().valueOf().toString();
      nombreArchivo = nombreArchivo;

      let uploadTask: firebase.storage.UploadTask =
        storeRef.child(`img/${nombreArchivo}`)
          .putString(archivo.img, 'base64', { contentType: 'image/jpeg' });


      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => { }, //saber el % de cuantos mg se han subido
        (error) => {
          //mostrar error
          console.log("ERROR EN LA CARGA");
          console.log(JSON.stringify(error));
          this.mostrar_toast(JSON.stringify(error))
          reject();
        },
        () => {
          //SI TODO SALE BIEN
          console.log("archivo subido");
          this.mostrar_toast('imagne cargada correctamente');

          //obtener la url para enviarla a la funcion crear post  para que asi
          //se pueda agregar a la BD.
            uploadTask.snapshot.ref.getDownloadURL().then( (url) =>{
              console.log(url);
              this.crear_post(archivo.titulo, url, nombreArchivo);
            });




          resolve();
        }

      )





    });

    return promesa;



  }

  private crear_post(titulo: string, url: string, nombreArchivo: string) {
    let post: ArchivoSubir = {
      img: url,
      titulo: titulo,
      key: nombreArchivo
    };

    console.log("POST en crear post");
    console.log(JSON.stringify(post));

    //asi mandamos a firebase database a los nodos que tengan como cabecera "nombreArchivo" y
    //en el update le dicemos, que sera el "post" que se incluira debajo de nombre archivo en la jerarquia.
    this.afDB.object(`/post/${nombreArchivo}`).update(post);

    this.imagenes.push(post);


  }

  mostrar_toast(message: string) {

    this.toastCtrl.create({
      message: message,
      duration: 2000
    }).present();
  }



}


interface ArchivoSubir {
  titulo: string;
  img: string;
  key?: string;
}
