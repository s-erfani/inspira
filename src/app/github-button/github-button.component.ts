import {Component} from '@angular/core';
import {SVG_PATHS} from '../shared-components/svg-paths';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-github-button',
  imports: [
    MatTooltip
  ],
  templateUrl: './github-button.component.html',
  styleUrl: './github-button.component.css'
})
export class GithubButtonComponent {
  svgPaths = SVG_PATHS;

  openGithubPage() {
    window.open("https://github.com/s-erfani/inspira", '_blank');
  }
}
