/*
    Modelo de dados para o registro de contas
*/
export interface ContaDTO {
    id : string;
    nome : string;
    data : string;
    valor : number;
    tipo : string;
}