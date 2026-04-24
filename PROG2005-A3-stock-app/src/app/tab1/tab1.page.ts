import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Inventory, InventoryItem } from '../models/inventory.model';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class Tab1Page implements OnInit {
  inventory: Inventory = [];
  filteredItems: Inventory = [];
  searchTerm = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadInventory();
  }

  loadInventory(): void {
    this.api.getAll().subscribe({
      next: (data: Inventory) => {
        this.inventory = data.filter(item => item.item_name && item.item_name.trim() !== '');
        this.filteredItems = this.inventory;
      },
      error: (err: any) => console.error('Load error', err)
    });
  }

  filterItems(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredItems = this.inventory;
    } else {
      this.filteredItems = this.inventory.filter((item: InventoryItem) =>
        item.item_name.toLowerCase().includes(term)
      );
    }
  }

  showHelp(): void {
    alert('📘 Help\n• Search by item name\n• View all inventory records\n• Featured items are highlighted');
  }
}