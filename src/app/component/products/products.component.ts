import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList: any;
  price: any;
  filterCategory: any;
  searchKey: string = "";
  constructor(private apiService: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.apiService.getProduct()
      .subscribe(res => {
        this.productList = res;
        this.filterCategory = res;
        // this.price = res.price 
        // console.log(res);
        this.productList.forEach((a: any) => {
          if (a.category === "men's clothing" || a.category === "women's clothing") {
            a.category = "fashion";
          }
          Object.assign(a, { quantity: 1, total: a.price });
        });
        // console.log(this.productList);
      })

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }

  addToCart(item: any) {
    console.log(item);
    this.cartService.addToCart(item);
    this.cartService.getProducts();
  }

  filter(category: any) {
    this.filterCategory = this.productList
      .filter((a: any) => {
        if (a.category == category || category == '') {
          return a;
        }
      })
  }

}
