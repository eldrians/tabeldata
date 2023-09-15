import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productList: any[] = [];
  cartObj: any = {
    CartId: 0,
    CustId: 1,
    ProductId: 0,
    Quantity: 2,
    AddedDate: '2023-09-15T04:21:36.765Z',
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.productService.getAllProducts().subscribe((result: any) => {
      this.productList = result.data;
    });
  }

  addItemToCart(productId: number) {
    this.cartObj.ProductId = productId;
    console.log(productId);
    this.productService.addToCart(this.cartObj).subscribe((result: any) => {
      console.log(result);
      if (result.result) {
        alert('Product Added To Cart');
        this.productService.cartAddedSubject.next(true);
      }
    });
  }
}
