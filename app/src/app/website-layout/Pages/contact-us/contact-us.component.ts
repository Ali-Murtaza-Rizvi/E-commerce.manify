import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  imports: [FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUSComponent {
  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Form Data:', form.value);
      // TODO: integrate with backend/email API
      alert('Your message has been sent!');
      form.reset();
    }
  }
}
