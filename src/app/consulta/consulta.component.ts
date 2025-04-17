import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulta',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, FlexLayoutModule, MatIconModule, MatTableModule, CommonModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ['id', 'nome', 'cpf','dataNascimento', 'email']
  nomeBusca: string  = '';

  constructor(private _clienteService: ClienteService){}

  ngOnInit(){
    this.listaClientes = this._clienteService.pesquisarClientes('');
  }

  pesquisar(){
    this.listaClientes = this._clienteService.pesquisarClientes(this.nomeBusca)
  }
}
