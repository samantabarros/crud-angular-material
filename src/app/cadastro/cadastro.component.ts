import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';
import {MatSnackBar} from '@angular/material/snack-bar';
import { BrasilapiService } from '../brasilapi.service';
import { Estado, Municipio } from '../brasil.model';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  imports: [
    FormsModule, 
    FlexLayoutModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgxMaskDirective,
    MatSelectModule,
    CommonModule
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {
  cliente: Cliente = Cliente.novoCliente();
  atualizando: boolean = false;
  //snack: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios: Municipio[] = [];
  
  constructor(
    private _clienteService: ClienteService, 
    private _brasilApiService: BrasilapiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params']
      const id = params['id']
      if(id){
        let clienteEncontrado = this._clienteService.buscaClientePorId(id);
        if(clienteEncontrado){
          this.atualizando = true;
          this.cliente = clienteEncontrado;
          if(this.cliente.uf){
            const event = {value: this.cliente.uf}
            this.carregarMunicipios(event as MatSelectChange)
          }
        }else{
          this.cliente = Cliente.novoCliente();
        }
      }
    })
    this.carregarUFs();
  }

  carregarUFs(){
    this._brasilApiService.listarUFS().subscribe({
      //next: listaEstados => console.log("Lista de estados", listaEstados),
      next: listaEstados => this.estados = listaEstados,
      error: erro => console.log("ocorreu um erro: ", erro)
    })
  }

  carregarMunicipios(event: MatSelectChange){
    const ufSelecionada =  event.value;
    this._brasilApiService.listarMunicipios(ufSelecionada).subscribe({
      next: listaMunicipios => this.municipios = listaMunicipios,
      error: erro => console.log("Ocorreu um erro!", erro)
    })
  }

  salvarCliente(){
    if(!this.atualizando){
      this._clienteService.salvar(this.cliente);
      this.cliente = Cliente.novoCliente();
      this.router.navigate(['/consulta']);
      this.mensagemSucesso('Cliente cadastrado com sucesso!');
    }else{
      this._clienteService.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
      this.mensagemSucesso('Cliente atualizado com sucesso!');
    }
  }

  mensagemSucesso(mensagem: string){
    this.snackBar.open(mensagem, 'Ok')
  }
}
