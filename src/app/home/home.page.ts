import { Component } from '@angular/core';
import { Firestore,doc,setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private db:Firestore) {
    this.led1 = false;
    this.led2 = false;
    this.led3 = false;
  }

  led1:boolean;
  led2:boolean;
  led3:boolean;

  async toggleEstado(led:string) {
    switch (led) {
      case 'LED1':
        this.led1 = !this.led1;
        await this.actEstado('LED1', this.led1);
        break;
      case 'LED2':
        this.led2 = !this.led2;
        await this.actEstado('LED2', this.led2);
        break;
      case 'LED3':
        this.led3 = !this.led3;
        await this.actEstado('LED3', this.led3);
        break;
      default:
        break;
    }
  }

  todos(): boolean {
    return this.led1 && this.led2 && this.led3;
  }

  async toggleTodo() {
    const nuevo = !this.todos();
    this.led1 = nuevo;
    this.led2 = nuevo;
    this.led3 = nuevo;
    await Promise.all([
      this.actEstado('LED1', nuevo),
      this.actEstado('LED2', nuevo),
      this.actEstado('LED3', nuevo)
    ]);
  }

  async actEstado(led:string, estado:boolean) {
    const ledRef = doc(this.db,'controlLED', led);
    await setDoc(ledRef, { encender: estado });
  }
}


