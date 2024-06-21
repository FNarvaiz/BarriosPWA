import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-install-button',
  standalone: true,
  imports: [],
  template: '<button [hidden]="!showButton"  class="btn btn-success" (click)="installPWA()">Instala nuestra App</button>',
  styleUrl: './install-button.component.css'
})
export class InstallButtonComponent implements OnInit {
  deferredPrompt: any;
  showButton = false;

  constructor() {}

  ngOnInit(): void {
    console.log("INIT")
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log(e)
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      this.showButton = true;
    });
  }

  installPWA(): void {
    // Hide the app provided install promotion
    this.showButton = false;
    // Show the install prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      this.deferredPrompt = null;
    });
  }
}
