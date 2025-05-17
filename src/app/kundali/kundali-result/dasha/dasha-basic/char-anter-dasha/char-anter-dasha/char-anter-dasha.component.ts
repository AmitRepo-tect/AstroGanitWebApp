import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-char-anter-dasha',
  templateUrl: './char-anter-dasha.component.html',
  styleUrl: './char-anter-dasha.component.scss'
})
export class CharAnterDashaComponent {
  @Input() message!: string;
}
