import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [RouterModule],
  template: `<p class="text-lg text-gray-600">Carregando projetos...</p>`,
})
export class ProjectListComponent {}
