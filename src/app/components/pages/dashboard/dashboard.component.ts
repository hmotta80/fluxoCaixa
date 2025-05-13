import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Chart, ChartModule } from 'angular-highcharts';
import { ContasService } from '../../../services/contas.service';


@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    ChartModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {


  //Atributos
  grafico: Chart = new Chart();
  dados: any[] = [];


  //Construtor para injeção de dependências
  constructor(private service: ContasService) { }


  //Método executado ao inicializar o componente
  ngOnInit() {
    //consultando as cntas na api
    this.service.getAll()
      .subscribe((response) => {


        //agrupamento para totalizar os valores por tipo
        const totalPorTipo = response.reduce((acc, item) => {
          if(!acc[item.tipo]) {
            acc[item.tipo] = 0;
          }
          acc[item.tipo] += item.valor;
          return acc;
        }, {} as Record<string, number>);


        //transformando o objeto em um array
        for(const item in totalPorTipo) {
          this.dados.push({ tipo: item, valor: totalPorTipo[item] }); 
        }


        //Criando o gráfico
        this.criarGrafico();
      });      
  }


  //Método para criar o gráfico
  criarGrafico() {


    //Organizar os dados para o gráfico
    const conteudo: any[] = [];
    this.dados.forEach(item => {
      conteudo.push([item.tipo, item.valor]);
    });


    //Criar o gráfico
    this.grafico = new Chart({
      chart: { type : 'pie' },
      title: { text: 'Total de contas por tipo.' },
      subtitle: { text: 'Somatório de contas de entrada e saída.' },
      plotOptions: {
        pie: {
          innerSize: '50%',
          dataLabels: { enabled: true }
        }
      },
      series: [{ data: conteudo, type: 'pie', name: 'Contas' }],
      legend: { enabled: false },
      credits: { enabled: false },
    });
  }
}
