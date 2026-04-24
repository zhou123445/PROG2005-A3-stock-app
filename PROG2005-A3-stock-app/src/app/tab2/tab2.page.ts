import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { Category, StockStatus } from '../models/inventory.model';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class Tab2Page implements OnInit {
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

  submitting = false;

  constructor(private api: ApiService) {}

  ngOnInit() {}

  addItem() {
    if (this.submitting) return;

    if (!this.itemName.trim() || !this.supplierName.trim()) {
      alert('Error: Item name and supplier name are required!');
      return;
    }

    if (this.quantity < 0 || this.price <= 0) {
      alert('Error: Quantity and price must be positive numbers!');
      return;
    }

    this.submitting = true;

    const newItem = {
      item_name: this.itemName,
      category: this.category,
      quantity: this.quantity,
      price: this.price,
      supplier_name: this.supplierName,
      stock_status: this.stockStatus,
      featured_item: this.featuredItem,
      special_note: this.specialNote
    };

    this.api.addItem(newItem).subscribe({
      next: () => {
        alert('Success: Item added successfully!');
        this.resetForm();
        this.submitting = false;
      },
      error: (err) => {
        alert('Error: Failed to add item. ' + (err.error?.message || 'Server error'));
        this.submitting = false;
      }
    });
  }

  resetForm() {
    this.itemName = '';
    this.category = Category.Electronics;
    this.quantity = 0;
    this.price = 0;
    this.supplierName = '';
    this.stockStatus = StockStatus.InStock;
    this.featuredItem = 0;
    this.specialNote = '';
  }

  showHelp() {
    alert(`📘 Add New Item Help
• All fields except Special Note are required
• Price and Quantity must be greater than 0
• Set Featured Item = 1 to mark as featured`);
  }
}