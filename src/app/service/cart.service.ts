import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  public count: number = 0;
  public cartItem: any = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor(private taostr: ToastrService, private http: HttpClient) { }

  getProducts() {
    this.productList.asObservable();
    return this.http.get<any>("http://localhost:3000/AddToCart")
  }

  setProduct(product: any) {
    this.cartItem.push(...product);
    this.productList.next(product);
  }

  addToCart(product: any) {
    console.log(product);
    return this.http.post<any>("http://localhost:3000/AddToCart", product)
      .subscribe(res => {
        this.taostr.success('Added Successfully')
        this.count++;
        localStorage.setItem("_count", this.count.toString());
        console.log(localStorage.getItem("_count"));
      },
        error => {
          this.taostr.warning('Product Already Added')
        })

    // this.productList.next(this.cartItem);
    // this.getTotalPrice();
    // console.log(this.cartItem);
  }

  getTotalPrice() {
    let grandTotal = 0;
    console.log(this.cartItem)
    this.cartItem.map((a: any) => {
      grandTotal += a.price;
    })
    return grandTotal;
  }

  removeProduct(id: number) {
    // console.log(this.cartItem);
    // this.cartItem.map((a: any, index: any) => {
    //   if (product.id === a.id) {
    //     //this.cartItem.splice(index, 1);
    return this.http.delete<any>("http://localhost:3000/AddToCart/" + id);
  }

  removeAll() {
    // this.cartItem = [];
    return this.http.delete<any>("http://localhost:3000/AddToCart")
    this.productList.next(this.cartItem);
  }

}