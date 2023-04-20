import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public totalItem : any;
  public totalProducts :any;
  searchTerm: string = '';
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
   this.totalItem = localStorage.getItem("_count");
   console.log(this.totalItem);
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
    console.log(this.searchTerm);
  }

}
