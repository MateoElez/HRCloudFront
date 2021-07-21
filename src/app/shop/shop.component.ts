import { Component, OnInit } from '@angular/core';
import { Item } from '../_models/item.model';
import { ItemService } from '../_services/item.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: []
})
export class ShopComponent implements OnInit {

  items : Item[] = [];

  constructor(public itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.refreshList();
    this.itemService.getItems().subscribe(res => this.items = res);
  }

  addItem(itemId: any) {
    //korsitit cemo localStorage za CART
    const itemToAdd = this.itemService.getItem(itemId);
    //gledas jel postoji vec u kosarici taj proizvod
    if(itemToAdd !== null && itemToAdd !== undefined) {
      let trenutnaKolicina = localStorage.getItem(itemId);
      if(trenutnaKolicina == null)
        localStorage.setItem(itemId, JSON.stringify(1));
      else {
        //ode ide ako vec postoji u kosarici, povecaj za 1
        let novaKolicina = parseInt(trenutnaKolicina) + 1;
        localStorage.setItem(itemId, JSON.stringify(novaKolicina));
    }
    } 
    console.log("Kupi" + itemId)
  }
}
