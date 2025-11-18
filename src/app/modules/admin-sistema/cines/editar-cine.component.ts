import { Component } from "@angular/core";
import { CinesService } from "../../../core/services/cines.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html'
})
export class EditarCineComponent {

  cine: any = {};

  constructor(
    private cineService: CinesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];

    this.cineService.obtener(id).subscribe(data => {
      this.cine = data;
    });
  }

  guardar() {
    this.cineService.actualizar(this.cine.id, this.cine).subscribe(() => {
      this.router.navigate(['/admin-sistema/cines']);
    });
  }
}
