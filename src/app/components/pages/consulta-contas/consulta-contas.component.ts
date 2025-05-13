import { Component } from '@angular/core';
import { ContasService } from '../../../services/contas.service';
import { CommonModule } from '@angular/common';
import { ContaDTO } from '../../../models/contas.dto';
import { NgxPaginationModule } from 'ngx-pagination';
import { MessageComponent } from '../../shared/message/message.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-consulta-contas',
  imports: [
    CommonModule, //Importa o módulo comum do Angular para usar diretivas comuns
    NgxPaginationModule, //Importa o módulo de paginação ngx-pagination
    MessageComponent, //Importa o componente de mensagem
    RouterLink   // Faz a navegação entre rotas
  ],
  templateUrl: './consulta-contas.component.html',
  styleUrl: './consulta-contas.component.css'
})
export class ConsultaContasComponent {
 
  contas: ContaDTO[] = []; //Atributo para armazenar a lista de contas
  pagina: number = 1; //Atributo para armazenar o número da página atual


  msgSucesso: string = ''; //Atributo para armazenar mensagens de sucesso
  msgErro: string = ''; //Atributo para armazenar mensagens de erro


  //método construtor para fazer a injeção de dependência
  //da classe ContasService (integração com o backend)
  constructor(private service: ContasService) { }


  //método executado quando o componente é inicializado
  ngOnInit() {
    this.service.getAll()
      .subscribe((response) => {
        //Atribui a resposta do serviço à variável contas
        this.contas = response;
      })
  }


  //método para fazer a paginação da lista de contas
  pageChange(event: any) {
    this.pagina = event; //Atualiza o número da página atual com o evento de paginação
  }


  //método para excluir uma conta selecionada
  onDelete(dto: ContaDTO) {
    if(confirm(`Deseja realmente excluir a conta "${dto.nome}"?`)) {
      this.service.delete(dto.id)
        .subscribe({
          next: (res) => {
            this.msgSucesso = `Conta "${res.nome}" excluída com sucesso!`;
            this.ngOnInit(); //Recarrega a lista de contas após a exclusão
          },
          error: (e) => {
            this.msgErro = `Falha ao excluir a conta: "${e.error}".`;
          }
        })
    }
  }


}





