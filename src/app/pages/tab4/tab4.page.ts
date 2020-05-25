import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StorageServices } from 'src/app/service/StorageService';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  sliderOpts = {
    allowSlidePrev: false,
    allowSlideNext: false,
};

  constructor(
    public dataStorage: StorageServices,
    public toastCtr: ToastController,
  ) { }

  ngOnInit() 
  {
  }
  //
  async presentToast(message: string) {
    const toast = await this.toastCtr.create({
        message,
        duration: 2000,
    });
    toast.present();
}
//refresh
doRefresh()
{
    this.dataStorage.loadFavorites();
    this.presentToast('Favourite page refreshed')
}

}
