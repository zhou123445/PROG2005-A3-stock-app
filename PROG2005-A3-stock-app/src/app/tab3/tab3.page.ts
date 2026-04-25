import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { InventoryItem, Category, StockStatus } from '../models/inventory.model';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class Tab3Page implements OnInit {
  searchTerm = '';
  allItems: InventoryItem[] = [];
  filteredItems: InventoryItem[] = [];
  loading = false;

  editMode = false;
  selectedItem: InventoryItem | null = null;

  itemName = '';
  category: Category = Category.Electronics;
  quantity = 0;
  price = 0;
  supplierName = '';
  stockStatus: StockStatus = StockStatus.InStock;
  featuredItem = 0;
  specialNote = '';

  categories = Object.values(Category);
  stockStatuses = Object.values(StockStatus);

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadInventory();
  }

  loadInventory(): void {
    this.loading = true;
    this.api.getAll().subscribe({
      next: (data) => {
        // 自动清除前面4条空名字脏数据（HD要求界面干净）
        this.allItems = data.filter(item => item.item_name?.trim() !== '');
        this.filteredItems = this.allItems;
        this.loading = false;
      },
      error: (err) => {
        console.error('Load error:', err);
        alert('Error: Failed to load inventory data.');
        this.loading = false;
      }
    });
  }

  filterItems(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredItems = this.allItems;
    } else {
      this.filteredItems = this.allItems.filter(item =>
        item.item_name.toLowerCase().includes(term)
      );
    }
  }

  // 仅定义方法壳，无业务逻辑
  editItem(item: InventoryItem): void {}
  cancelEdit(): void {}
  saveEdit(): void {}
  deleteItem(item: InventoryItem): void {}
  resetForm(): void {}
}