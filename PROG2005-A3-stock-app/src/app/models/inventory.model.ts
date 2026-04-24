// 严格对应作业要求的枚举
export enum Category {
  Electronics = 'Electronics',
  Furniture = 'Furniture',
  Clothing = 'Clothing',
  Tools = 'Tools',
  Miscellaneous = 'Miscellaneous'
}

export enum StockStatus {
  InStock = 'In Stock',
  LowStock = 'Low Stock',
  OutOfStock = 'Out of Stock'
}

// 单条库存项（HD：严格类型）
export interface InventoryItem {
  item_id: number;
  item_name: string;
  category: Category;
  quantity: number;
  price: number;
  supplier_name: string;
  stock_status: StockStatus;
  featured_item: number; // 0 = 否, 1 = 是
  special_note?: string;
}

// 整个库存类型（HD必须显式定义）
export type Inventory = InventoryItem[];