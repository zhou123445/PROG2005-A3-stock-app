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

  editItem(item: InventoryItem): void {
    this.editMode = true;
    this.selectedItem = item;

    this.itemName = item.item_name;
    this.category = item.category;
    this.quantity = item.quantity;
    this.price = item.price;
    this.supplierName = item.supplier_name;
    this.stockStatus = item.stock_status;
    this.featuredItem = item.featured_item;
    this.specialNote = item.special_note || '';

    window.scrollTo(0, 0);
  }

  cancelEdit(): void {
    this.editMode = false;
    this.selectedItem = null;
    this.resetForm();
  }

  saveEdit(): void {
    if (!this.selectedItem || !this.itemName.trim() || !this.supplierName.trim()) {
      alert('Error: Item name and supplier are required!');
      return;
    }
    if (this.quantity < 0 || this.price <= 0) {
      alert('Error: Quantity & price must be positive!');
      return;
    }

    const updatedData = {
      item_name: this.itemName,
      category: this.category,
      quantity: this.quantity,
      price: this.price,
      supplier_name: this.supplierName,
      stock_status: this.stockStatus,
      featured_item: this.featuredItem,
      special_note: this.specialNote
    };

    this.api.updateItem(this.selectedItem.item_name, updatedData).subscribe({
      next: () => {
        alert('Success: Item updated!');
        this.loadInventory();
        this.cancelEdit();
      },
      error: (err) => {
        alert('Error: Update failed. ' + (err.error?.message || 'Server error'));
      }
    });
  }

  deleteItem(item: InventoryItem): void {
    if (item.item_name.toLowerCase() === 'laptop') {
      alert('Error: Laptop cannot be deleted!');
      return;
    }

    if (!confirm(`Are you sure you want to delete "${item.item_name}"?`)) {
      return;
    }

    this.api.deleteItem(item.item_name).subscribe({
      next: () => {
        alert('Success: Item deleted!');
        this.loadInventory();
      },
      error: (err) => {
        alert('Error: Delete failed. ' + (err.error?.message || 'Server error'));
      }
    });
  }

  resetForm(): void {
    this.itemName = '';
    this.category = Category.Electronics;
    this.quantity = 0;
    this.price = 0;
    this.supplierName = '';
    this.stockStatus = StockStatus.InStock;
    this.featuredItem = 0;
    this.specialNote = '';
  }

  showHelp(): void {
    alert(`📘 Edit/Delete Help
• Search items to edit/delete
• Click "Edit" to modify an item
• Click "Delete" to remove an item
• Laptop cannot be deleted
• All fields except Special Note are required`);
  }
}