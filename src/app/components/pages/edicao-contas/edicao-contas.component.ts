import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContasService } from '../../../services/contas.service';
import { ContaDTO } from '../../../models/contas.dto';
import { ActivatedRoute } from '@angular/router';
import { MessageComponent } from '../../shared/message/message.component';


@Component({
  selector: 'app-edicao-contas',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MessageComponent
  ],
  templateUrl: './edicao-contas.component.html',
  styleUrl: './edicao-contas.component.css'
})
export class EdicaoContasComponent {


  //Atributos
  form: FormGroup;


  msgSucesso: string = ''; //Mensagem de sucesso
  msgErro: string = ''; //Mensagem de erro
  id: string = ''; //ID da conta a ser editada


  //Método construtor
  constructor(
    private service: ContasService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    //criando o formulário
    this.form = this.fb.group({
      nome: new FormControl('', [
        Validators.required, Validators.minLength(8), Validators.max(150)
      ]),
      data: new FormControl('', [
        Validators.required
      ]),
      valor: new FormControl('', [
        Validators.required, Validators.min(0), Validators.max(999999)
      ]),
      tipo: new FormControl('', [
        Validators.required
      ])
    });
  }


  //Função executata ao iniciar o componente
  ngOnInit() {
    //capturando o id enviado pela URL
    this.id = this.route.snapshot.paramMap.get('id') as string;
    //consultando a conta na API
    this.service.getById(this.id)
      .subscribe((response) => {
        this.form.patchValue(response); //preenchendo o formulário com os dados da conta
      });
  }


  //Método para capturar o evento de submit do formulário
  onSubmit() {


    //construindo um DTO com os dados do formulário
    const dto: ContaDTO = {
      id: this.id,
      nome: this.form.value.nome as string,
      data: this.form.value.data as string,
      valor: Number(this.form.value.valor as string),
      tipo: this.form.value.tipo as string,
    };


    //limpando as mensagens
    this.msgSucesso = '';
    this.msgErro = '';


    //enviando para a API realizar o cadastro
    this.service.put(dto)
      .subscribe({
        next: (res) => {
          this.msgSucesso = `Conta "${res.nome}" atualizada com sucesso!`;
        },
        error: (e) => {
          this.msgErro = `Falha ao atualizar a conta: ${e.error}`;
        }
      });
  }
}





