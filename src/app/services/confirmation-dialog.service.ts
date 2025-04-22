import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Cliente } from '../cadastro/cliente';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  matDialog = inject(MatDialog);

  constructor() { }

  openDialog(cliente: Cliente): Observable<boolean>{
   return this.matDialog.open(ConfirmationDialogComponent).afterClosed()
  }
}
