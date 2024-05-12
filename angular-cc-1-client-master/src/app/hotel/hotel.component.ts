import { Component } from '@angular/core';
import { Hotel } from '../Model/hotel';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.scss'
})
export class HotelComponent {
  hotels!: Hotel[];
  /*hotelsTmp?: [{Id: 1, Name: 'Hotel 1', ExtraServices: 'Extra Services 1'},
  {Id: 2, Name: 'Hotel 2', ExtraServices: 'Extra Services 1'},
  {Id: 3, Name: 'Hotel 3', ExtraServices: 'Extra Services 1'}];*/

  constructor(private hotelService: ProductsService) { }

  ngOnInit(): void {
    this.hotelService.getHotel('http://localhost:3000/hotels').subscribe((data: Hotel[]) => {
      this.hotels = data;
    });
  }

  bookHotel(hotel: Hotel) {
    console.log(hotel);
  }
}
