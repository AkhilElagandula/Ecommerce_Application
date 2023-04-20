import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: any = [];
  grandTotal !: number;
  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts()
  {
    this.cart.getProducts().subscribe( _res =>{
      this.products = _res;
    })
  }

  remove(id: any) {
    this.cart.removeProduct(id).subscribe( _res =>{
      if(_res == '')
      {
        this.getAllProducts();
      }
    })
    console.log(id);
  }

  emptyCart() {
    this.cart.removeAll();
  }

}