import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {

  user_email = '';
  message = '';

  status = '';
  statusType: 'success' | 'error' | 'loading' | '' = '';
  loading = false;

  ngOnInit() {
    emailjs.init('sD6sZjspKNf0pFWot'); // your public key
  }

  sendMessage() {
    if (!this.user_email || !this.message) return;

    this.loading = true;
    this.status = 'Sending...';
    this.statusType = 'loading';

    const templateParams = {
      user_email: this.user_email,
      message: this.message
    };

    emailjs.send(
      'service_z4z7yap',
      'template_2ennxr9',
      templateParams
    ).then(() => {
      this.status = 'Message sent successfully 🚀';
      this.statusType = 'success';
      this.user_email = '';
      this.message = '';
      this.loading = false;
    }).catch((error) => {
      console.error(error);
      this.status = 'Failed to send message ❌';
      this.statusType = 'error';
      this.loading = false;
    });
  }
}
