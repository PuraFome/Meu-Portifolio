import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Project } from '@meu-portifolio/shared-types';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  template: `
    <article
      class="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <!-- Image -->
      @if (project().imagemUrl) {
        <div class="aspect-video w-full overflow-hidden">
          <img
            [src]="project().imagemUrl"
            [alt]="project().titulo"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      }

      <!-- Content -->
      <div class="flex flex-1 flex-col gap-3 p-5">
        <!-- Title -->
        <h3
          class="text-lg font-semibold leading-tight text-slate-900"
        >
          {{ project().titulo }}
        </h3>

        <!-- Description (truncated 2 lines) -->
        <p class="line-clamp-2 text-sm leading-relaxed text-slate-600">
          {{ project().descricao }}
        </p>

        <!-- Tech badges -->
        @if (project().tecnologias.length > 0) {
          <div class="mt-auto flex flex-wrap gap-1.5">
            @for (tech of project().tecnologias; track tech) {
              <span
                class="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
              >
                {{ tech }}
              </span>
            }
          </div>
        }

        <!-- Action links -->
        @if (project().linkDemo || project().linkRepo) {
          <div class="flex items-center gap-3 pt-2">
            @if (project().linkDemo) {
              <a
                [href]="project().linkDemo"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Demo
              </a>
            }
            @if (project().linkRepo) {
              <a
                [href]="project().linkRepo"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Repo
              </a>
            }
          </div>
        }
      </div>
    </article>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  readonly project = input.required<Project>();
}
