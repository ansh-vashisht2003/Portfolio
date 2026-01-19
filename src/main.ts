import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch(err =>
  console.error(err)
);

/* ================================
   TRUE LIQUID CURSOR PHYSICS
================================ */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let glowX = mouseX;
let glowY = mouseY;

let velX = 0;
let velY = 0;

const friction = 0.85;   // water resistance
const ease = 0.12;       // pull strength

function initLiquidCursor() {
  const glow = document.querySelector(".cursor-glow") as HTMLElement;
  if (!glow) {
    requestAnimationFrame(initLiquidCursor);
    return;
  }

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = "1";
  });

  document.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
  });

  function animate() {
    const dx = mouseX - glowX;
    const dy = mouseY - glowY;

    velX += dx * ease;
    velY += dy * ease;

    velX *= friction;
    velY *= friction;

    glowX += velX;
    glowY += velY;

    const speed = Math.min(Math.sqrt(velX * velX + velY * velY) * 0.04, 0.35);

    glow.style.transform = `
      translate3d(${glowX - 130}px, ${glowY - 130}px, 0)
      scale(${1 + speed}, ${1 - speed})
    `;

    requestAnimationFrame(animate);
  }

  animate();
}

initLiquidCursor();
