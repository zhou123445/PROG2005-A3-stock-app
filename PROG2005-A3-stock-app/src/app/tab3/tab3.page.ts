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

  // 实现禁止删除Laptop的逻辑
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

}