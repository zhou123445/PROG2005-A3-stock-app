import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class PrivacyPage {
  showHelp() {
    alert('Help: This page explains our privacy and security practices for inventory data.');
  }
}