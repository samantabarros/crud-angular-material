import { Component, OnInit } from '@angular/core';
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
import { query } from '@angular/animations';

@Component({
  selector: 'app-cadastro',
  imports: [
    FormsModule, 
    FlexLayoutModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {
  cliente: Cliente = Cliente.novoCliente();
  atualizando: boolean = false;
  
  constructor(
    private _clienteService: ClienteService, 
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((query: any) => {
      const params = query['params']
      const id = params['id']
      console.log('Id', id)
      if(id){
        let clienteEncontrado = this._clienteService.buscaClientePorId(id);
        if(clienteEncontrado){
          this.atualizando = true;
          this.cliente = clienteEncontrado;
        }else{
          this.cliente = Cliente.novoCliente();
        }
      }
    })
      
  }

  salvarCliente(){
    if(!this.atualizando){
      this._clienteService.salvar(this.cliente);
      this.cliente = Cliente.novoCliente();
    }else{
      this._clienteService.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
    }
  }
}
