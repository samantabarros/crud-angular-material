import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  static REPO_CLIENTES = "_CLIENTES";
  constructor() { }

  salvar(cliente: Cliente){
    const storage = this.obterStorage();
    storage.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  private obterStorage() : Cliente[]{
    const repositorioCliente = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if(repositorioCliente){
      const clientes: Cliente [] = JSON.parse(repositorioCliente)
      return clientes;
    }
    const clientes : Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes))
    return clientes;
  }

  pesquisarClientes(nomeBusca: string) : Cliente[] {
    const clientes = this.obterStorage();

    if(!nomeBusca){
      return clientes;
    }
    return clientes.filter(cliente => cliente.nome?.indexOf(nomeBusca) !== -1);
  }

  buscaClientePorId(id: string) : Cliente | undefined{
    const clientes = this.obterStorage();
    return clientes.find(cliente => cliente.id ===  id);
  }
}
