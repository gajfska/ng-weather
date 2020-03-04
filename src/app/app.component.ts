import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataModel} from './data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  apiKey = 'cd42375949d1ab7850227235693b257d';
  city = 'London';
  loadedData: DataModel[] = [];
  wheaterData: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPost();
  }

  // onSearch() {
  //   this.http.post('api.openweathermap.org/data/2.5/weather?q={' + this.city + '}&appid={' + this.apiKey + '}')
  // }

  onFetchWheater() {
    this.fetchPost();
  }

  private fetchPost() {
    this.http.get<DataModel[]>(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`)
      // .pipe(map(responseData => {
      //   const dataArray = [];
      //   for (const key in responseData) {
      //     dataArray.push(responseData[key]);
      //   }
      // }))
      .subscribe(wheater => {
        this.wheaterData = wheater;
        console.log(wheater);
      });
  }
}
