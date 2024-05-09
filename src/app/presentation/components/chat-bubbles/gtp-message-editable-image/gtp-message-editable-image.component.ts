import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gtp-message-editable-image',
  standalone: true,
  imports: [],
  templateUrl: './gtp-message-editable-image.component.html',
  styleUrl: './gtp-message-editable-image.component.css',
})
export class GtpMessageEditableImageComponent {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) imageInfo!: { url: string; alt: string };
}
