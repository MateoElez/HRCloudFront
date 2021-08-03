import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../_models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  readonly baseURL = "http://localhost:5000/api/Items/";
  public item: Item = new Item;
  public itemList: Item[] = [];

  constructor(private http: HttpClient) { }

  refreshList() {
    this.http.get<Item[]>(this.baseURL).toPromise()
    .then(res => this.itemList = res);
  }

  getItem(id: number) {
    console.log("Iy fje se vraca: " + this.http.get<Item>(this.baseURL + id)
    + " koji je tipa : " + typeof(this.http.get<Item>(this.baseURL + id)))
    return this.http.get<Item>(this.baseURL + id);
  }

  getItems() {
    return this.http.get<Item[]>(this.baseURL);
  }

  postItem() {
    return this.http.post(this.baseURL, this.item);
  }
  deleteItem(id:number) {
    return this.http.delete(this.baseURL + id);
  }
  putItem() {
    return this.http.put(this.baseURL + this.item.itemId, this.item);
  }
}
