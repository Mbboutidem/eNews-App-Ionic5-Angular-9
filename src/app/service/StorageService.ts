import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Article } from '../pattern/pattern';



@Injectable({
    providedIn: 'root',
})
export class StorageServices {
    news: Article[] = [];

    constructor(
        private storage: Storage,
        public toastCtr: ToastController,
        public alertControl: AlertController,
        ) 
        {
        this.loadFavorites();
    }

    async presentToast(message: string) {
        const toast = await this.toastCtr.create({
            message,
            duration: 2000,
        });
        toast.present();
    }

    saveNew(evNew: Article) {
        const exists = this.news.find(i => i.title === evNew.title);
        if (!exists) {
            this.news.unshift(evNew);
            this.storage.set('favorites', this.news);
        }

        this.presentToast('Added to favorites');
    }

     async loadFavorites() {
        const favorites = await this.storage.get('favorites');
        if (favorites) {
            this.news = favorites;
        }
    }
    //alert notification
    async showAlert()
    {
        const alert = await this.alertControl.create({
            header: 'Confirm!',
            message: 'Are you sure you want to delete your favourite news?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (favourites) => {
                  console.log('Cancel: favourites');
                }
              }, {
                text: 'Okay',
                handler: () => {
                  console.log('Okay');
                }
              }
            ]
          });
          await alert.present();
    }

    deleteNew(NewArt: Article) {
        //this.news = this.news.splice(this.news.indexOf(),1)
        this.news = this.news.filter(i => i.title !== NewArt.title);
        this.storage.set('favorites', this.news); // remove the stored news
        //this.showAlert();
        this.presentToast('Your favourite is deleted');
    }
}
