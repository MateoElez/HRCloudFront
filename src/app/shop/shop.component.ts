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
  //itemToAdd: Item | undefined;

  constructor(public itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.refreshList();
    this.itemService.getItems().subscribe(res => this.items = res);
  }

  addItem(itemId: any) {
    //korsitit cemo localStorage za CART
    //const itemToAdd: Item = new Item;
    /*this.itemService.getItem(itemId).subscribe(res => {
      this.itemToAdd = res;
    });*/
    //console.log("ITEM STISNUT JE: " + this.itemToAdd + " i njegov ID je " + itemId);
    //gledas jel postoji vec u kosarici taj proizvod
    //if(this.itemToAdd !== null && this.itemToAdd !== undefined) {
      let trenutnaKolicina = localStorage.getItem(itemId);
      if(trenutnaKolicina == null)
        localStorage.setItem(itemId, JSON.stringify(1));
      else {
        //ode ide ako vec postoji u kosarici, povecaj za 1
        let novaKolicina = parseInt(trenutnaKolicina) + 1;
        localStorage.setItem(itemId, JSON.stringify(novaKolicina));
    }
    //} 
    console.log("Kupi" + itemId)
  }
}
