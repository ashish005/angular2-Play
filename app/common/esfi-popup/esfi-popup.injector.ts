/**
 * Created by wiznidev on 6/23/16.
 */
import { Component, Injectable, ViewChild} from '@angular/core';
import { MODAL_DIRECTIVES, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
    selector: 'popup',
    directives: [ MODAL_DIRECTIVES ],
    templateUrl: './app/common/esfi-popup/popup-modal.html'
})

export class PopupWrapperComponent {
    @ViewChild('modal') modal: ModalComponent;
};