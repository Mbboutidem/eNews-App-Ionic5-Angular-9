import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/pattern/pattern';
import { ActionSheetController, Platform } from '@ionic/angular';
import { StorageServices } from 'src/app/service/StorageService';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';



@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
})
export class NewComponent implements OnInit {
    @Input() new: Article;
    @Input() index: number;
    @Input() onFavorites = false;

    constructor(
        private iab: InAppBrowser,
        private actionSheetCtrl: ActionSheetController,
        private socialSharing: SocialSharing,
        public dataStorage: StorageServices,
        private platform: Platform,
    ) {}

    ngOnInit() {}

    openNewBrower() {
        const browser = this.iab.create(this.new.url, '_system');
    }

    async startMenu() {
        let saveDeleteBtn;
        if (this.onFavorites) {
            saveDeleteBtn = {
                text: 'Delete Favorite',
                icon: 'trash',
                handler: () => {
                    console.log('Delete favorite');
                    this.dataStorage.deleteNew(this.new);
                },
            };
        } else {
            saveDeleteBtn = {
                text: 'Favorite',
                icon: 'star-half',
                handler: () => {
                    console.log('Favorite');
                    this.dataStorage.saveNew(this.new);
                },
            };
        }
        const actionSheet = await this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Share',
                    icon: 'share',
                    handler: () => {
                        this.shareNew();
                    },
                },
                saveDeleteBtn,
                {
                    text: 'Cancel',
                    icon: 'close',
                },
            ],
        });
        await actionSheet.present();
}

    shareNew() {
        if (this.platform.is) {
            this.socialSharing.share(
                this.new.title, // new
                this.new.source.name, // author
                '', // file
                this.new.url,
            );
        } else {
            if (navigator['share']) {
                navigator['share']({
                    title: this.new.title,
                    text: this.new.description,
                    url: this.new.url,
                })
                    .then(() => console.log('Successful share'))
                    .catch(error => console.log('Error sharing', error));
            } else {
                alert('Error share');
            }
        }
    }
}
