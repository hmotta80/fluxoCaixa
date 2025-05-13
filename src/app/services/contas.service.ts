import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ContaDTO } from "../models/contas.dto";
import { environment } from "../../environments/environment";


@Injectable({
    providedIn: 'root'
})
export class ContasService {


    //Atributos
    apiUrl: string = environment.apiContas;


    //método construtor para injeção de dependência
    constructor(private http: HttpClient) { }


    //método para consultar todas as contas
    getAll() : Observable<ContaDTO[]> {
        return this.http.get<ContaDTO[]>(this.apiUrl);
    }


    //método para consultar uma conta pelo id
    getById(id: string) : Observable<ContaDTO> {
        return this.http.get<ContaDTO>(`${this.apiUrl}/${id}`);
    }


    //método para cadastrar contas na API
    post(dto: ContaDTO): Observable<ContaDTO> {
        return this.http.post<ContaDTO>(this.apiUrl, dto);
    }


    //método para atualizar contas na API
    put(dto: ContaDTO): Observable<ContaDTO> {
        return this.http.put<ContaDTO>(`${this.apiUrl}/${dto.id}`, dto);
    }


    //método para excluir contas na API
    delete(id: string): Observable<ContaDTO> {
        return this.http.delete<ContaDTO>(`${this.apiUrl}/${id}`);
    }
}



