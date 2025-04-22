import { Component, inject, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CpfPipe } from '../shared/pipes/cpf.pipe';
import { ConfirmationDialogService } from '../services/confirmation-dialog.service';
import { filter } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-consulta',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatTooltipModule, FlexLayoutModule, MatIconModule, MatTableModule, CommonModule, CpfPipe],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ['nome', 'cpf', 'dataNascimento', 'municipio', 'uf','email',  'acoes']
  nomeBusca: string = '';
  confirmationDialogService = inject(ConfirmationDialogService);

  constructor(
    private _clienteService: ClienteService,
    private router: Router,
    private snackBar: MatSnackBar){}

  ngOnInit(){
    this.listaClientes = this._clienteService.pesquisarClientes('');
  }

  pesquisar(){
    this.listaClientes = this._clienteService.pesquisarClientes(this.nomeBusca)
  }

  preparaEditar(id: string){
    this.router.navigate(['cadastro'], { queryParams: { 'id': id } });
  }

  preparaDeletar(cliente: Cliente){
    this.confirmationDialogService.openDialog(cliente)
    .pipe(filter((answer) => answer === true))
    .subscribe(() => {
      this._clienteService.deletar(cliente);
      this.listaClientes = this._clienteService.pesquisarClientes('');
      this.mensagemSucesso('Cliente deletado com sucesso!');
    })
  }

  deletarCliente(cliente: Cliente){
    this._clienteService.deletar(cliente);
    this.listaClientes = this._clienteService.pesquisarClientes('');
    this.mensagemSucesso('Cliente deletado com sucesso!');
  }

  mensagemSucesso(mensagem: string){
    this.snackBar.open(mensagem, 'Ok',{
      verticalPosition: 'top',
    })

  }
}
