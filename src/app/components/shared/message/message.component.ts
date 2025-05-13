import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-message',
  imports: [
    CommonModule
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {


  //Parametro para definir a mensagem que deve ser exibida no componente
  @Input() mensagem: string = '';


  //Parametro para definir o tipo de exibição da mensagem
  @Input() tipo: 'sucesso' | 'alerta' | 'erro' = 'sucesso';
}




