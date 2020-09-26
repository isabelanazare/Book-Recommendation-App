import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private modals: any[] = [];

    public add(modal: any) {
        this.modals.push(modal);
    }

    public remove(id: string) {
        this.modals = this.modals.filter(x => x.id !== id);
    }

    public open(id: string) {
        const modal = this.modals.find(x => x.id === id);
        modal.open();
    }

    public close(id: string) {
        const modal = this.modals.find(x => x.id === id);
        modal.close();
    }
}