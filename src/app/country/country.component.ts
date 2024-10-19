import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Country } from './country';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [],
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent implements OnInit{

  public countries: Country[] = [];
 
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.http.get<Country[]>(`${environment.baseUrl}api/countries`).subscribe(
      {
        next: result => this.countries = result,
        error: e => console.error(e)
      }
    );
  }
}
