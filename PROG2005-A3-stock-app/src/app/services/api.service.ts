// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory, InventoryItem } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // 老师提供的API地址
  private baseUrl = 'https://prog2005.it.scu.edu.au/ArtGalley';

  constructor(private http: HttpClient) { }

  // 获取所有商品
  getAll(): Observable<Inventory> {
    return this.http.get<Inventory>(this.baseUrl);
  }

  // 按名称查询单个商品
  getItemByName(name: string): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.baseUrl}/${name}`);
  }

  // 新增商品（自动排除item_id，由API生成）
  addItem(item: Omit<InventoryItem, 'item_id'>): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.baseUrl, item);
  }

  // 更新商品
  updateItem(name: string, item: Partial<InventoryItem>): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.baseUrl}/${name}`, item);
  }

  // 删除商品（注意：Laptop禁止删除）
  deleteItem(name: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${name}`);
  }
}