import { Routes } from '@angular/router';
import { CadastroContasComponent } from './components/pages/cadastro-contas/cadastro-contas.component';
import { ConsultaContasComponent } from './components/pages/consulta-contas/consulta-contas.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { EdicaoContasComponent } from './components/pages/edicao-contas/edicao-contas.component';


export const routes: Routes = [
    {
        /* rota de navegação para o dashboard */  
        path: 'app/pages/dashboard',
        component: DashboardComponent
    },
    {
        /* rota de navegação para cadastro de contas */
        path: 'app/pages/cadastro-contas',
        component: CadastroContasComponent
    },
    {
        /* rota de navegação para consulta de contas */
        path: 'app/pages/consulta-contas',
        component: ConsultaContasComponent
    },
    {
        /* rota de navegação para a edição de contas */
        path: 'app/pages/edicao-contas/:id',
        component: EdicaoContasComponent
    },
    {
        /* rota padrão do projeto (raiz do projeto) */
        path: '', pathMatch: 'full',
        redirectTo: '/app/pages/dashboard'
    }
];





