// item-entry.component.ts
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Item, ItemStatus } from '../../models/item';

@Component({
  selector: 'app-item-entry',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './item-entry.component.html',
  styleUrl: './item-entry.component.scss'
})
export class ItemEntryComponent {
  items: Item[] = [
    {
      title: "Gaming Laptop",
      amount: 3,
      quantity: 3200,
      status: ItemStatus.APPROVED,
      id: 1
    },
    {
      title: "Desktop Tower",
      amount: 7,
      quantity: 2500,
      status: ItemStatus.PENDING,
      id: 2
    },
    {
      title: "Mechanical Keyboard",
      amount: 6,
      quantity: 750,
      status: ItemStatus.REJECTED,
      id: 3
    }
  ];
  isSmallTable = false;
}
