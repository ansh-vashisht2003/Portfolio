import { Component, OnInit, OnDestroy, NgZone, HostListener,Renderer2, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { EducationComponent } from './components/education/education.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    EducationComponent,
    ContactComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  
  // Inject Renderer2 for safe DOM manipulation and DOCUMENT to access the body
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  // This listener tracks movement across the entire document
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.createWave(e.clientX, e.clientY);
  }

  createWave(x: number, y: number) {
    // 1. Create the div element
    const wave = this.renderer.createElement('div');
    
    // 2. Add the CSS class we defined earlier
    this.renderer.addClass(wave, 'cursor-wave');
    
    // 3. Position it at the cursor coordinates
    this.renderer.setStyle(wave, 'left', `${x}px`);
    this.renderer.setStyle(wave, 'top', `${y}px`);
    
    // 4. Append to body (so it floats above all other components)
    this.renderer.appendChild(this.document.body, wave);

    // 5. Remove the element after the animation finishes (600ms) to prevent memory leaks
    setTimeout(() => {
      this.renderer.removeChild(this.document.body, wave);
    }, 600); 
  }
}