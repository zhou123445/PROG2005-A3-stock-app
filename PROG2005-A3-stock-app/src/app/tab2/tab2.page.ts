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
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
    }, 1000);
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

}