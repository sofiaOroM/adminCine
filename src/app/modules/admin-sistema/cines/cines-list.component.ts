import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CinesService } from '../../../core/services/cines.service';

interface Cine {
    id: number;
    nombre: string;
    direccion: string;
    administrador: string;
}

@Component({
    selector: 'app-cines-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './cines-list.component.html'
})
export class CinesListComponent {
    cines: Cine[] = [];
    constructor(private cineService: CinesService) { }

    ngOnInit() {
        this.cineService.listar().subscribe(data => {
            this.cines = data;
        });
    }  
    eliminar(id: number) {
        if (confirm('¿Eliminar cine?')) {
          this.cineService.eliminar(id).subscribe(() => {
            this.cines = this.cines.filter(c => c.id !== id);
          });
        }
      }
}
