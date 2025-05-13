import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContasService } from '../../../services/contas.service';
import { v4 as uuidv4 } from 'uuid';
import { ContaDTO } from '../../../models/contas.dto';
import { MessageComponent } from '../../shared/message/message.component';


@Component({
  selector: 'app-cadastro-contas',
  imports: [
    CommonModule, //Biblioteca para incluir diretivas padrão na página HTML
    FormsModule, //Construção de formulários
    ReactiveFormsModule, //Construção de formulários
    MessageComponent //Componente de mensagem
  ],
  templateUrl: './cadastro-contas.component.html',
  styleUrl: './cadastro-contas.component.css'
})
export class CadastroContasComponent {


    //Atributos
    form: FormGroup;


    msgSucesso: string = ''; //Mensagem de sucesso
    msgErro: string = ''; //Mensagem de erro


    //Método construtor
    constructor(
      private service: ContasService,
      private fb: FormBuilder
    ) {
      //criando o formulário
      this.form = this.fb.group({
        nome : new FormControl('', [
          Validators.required, Validators.minLength(8), Validators.max(150)
        ]),
        data : new FormControl('', [
          Validators.required
        ]),
        valor : new FormControl('', [
          Validators.required, Validators.min(0), Validators.max(999999)
        ]),
        tipo : new FormControl('', [
          Validators.required
        ])
      });
    }


    //Método para capturar o evento de submit do formulário
    onSubmit() {
     
      //construindo um DTO com os dados do formulário
      const dto : ContaDTO = {
        id: uuidv4(), //gerando um id aleatório
        nome: this.form.value.nome as string,
        data: this.form.value.data as string,
        valor: Number(this.form.value.valor as string),
        tipo: this.form.value.tipo as string,
      };


      //limpando as mensagens
      this.msgSucesso = '';
      this.msgErro = '';


      //enviando para a API realizar o cadastro
      this.service.post(dto)
        .subscribe({
          next: (res) => {
            this.msgSucesso = `Conta "${res.nome}" cadastrada com sucesso!`;
            this.form.reset(); //resetando o formulário
          },
          error: (e) => {
            this.msgErro = `Falha ao cadastrar a conta: ${e.error}`;
          }
        });
    }
}





