import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';
import { Products } from '../products';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from  '@angular/material/sort';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
 
  constructor( public productsService: ProductsService) { }

  products: any;

  columns: string[] = ['imageart', 'designation', 'marque', 'prix' , '_id'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static:  true }) sort!: MatSort;

  ngOnInit(): void {

    this.productsService.getAll().subscribe((data: Products[]) => {

      this.products = new MatTableDataSource<any>(data);
      this.products.paginator = this.paginator;
      this.products.sort = this.sort;
    })

  }
  
  filter(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    this.products.filter = filter.trim().toLowerCase();
  } 
  
  deleteProduct(_id: object) {
    this.productsService.delete(_id).subscribe(
      (res) => {
        // Delete was successful
        if (Array.isArray(this.products)) {
          this.products = this.products.filter((item: { _id: object }) => item._id !== _id); 
        } else {
          
        }
        console.log('Post deleted successfully!');
      },
      (error) => {
        console.error('Error deleting the product:', error);
        // Handle the error, e.g., display an error message to the user.
      }
    );
  }
  

 


}