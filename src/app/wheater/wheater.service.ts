import {Injectable, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {filter, flatMap, map, tap} from 'rxjs/operators';
import {RootObject} from './coordinate.model';
import {Observable, Subject} from 'rxjs';
import { WeatherRootObject} from './data.model';


@Injectable({providedIn: 'root'})
export class WheaterService {
    // @ViewChild('f', {static: false}) singForm: NgForm;

    citySubject = new Subject<string>();
    apiKey = 'cd42375949d1ab7850227235693b257d';

    testWeatherDataFlag: WeatherRootObject;

    coordObservable: Observable<number[]> = this.citySubject.pipe(
        flatMap(city => {
       return this.http.get<RootObject>(`https://nominatim.openstreetmap.org/search?city=${city}&format=geojson&accept-language=PL`)
    }), map(data => {
        return data.features[0].geometry.coordinates;
    }));

    wheaterObservable: Observable<WeatherRootObject> = this.citySubject.pipe(
        flatMap( city => {
       return this.http.get<WeatherRootObject>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}&lang=pl`)
    }));

    constructor(private http: HttpClient) {}

    fetchWheater(city: string) {
        this.http.get<WeatherRootObject>(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}&lang=pl`)
            .subscribe(wheater => {
                this.testWeatherDataFlag = wheater;
                // console.log(wheater);
            });
    }

    fetchCoordinate(city: string): Observable<number[]> {
        return this.http.get<RootObject>(`https://nominatim.openstreetmap.org/search?city=${city}&format=geojson&accept-language=PL`)
            .pipe(map(data => {
               return data.features[0].geometry.coordinates;
            }));
            // .subscribe(coordinate => {
            //     this.coordinateData = coordinate;
            //     console.log(coordinate);
            //     // console.log(this.coordinateData.features[0].geometry.coordinates[0]);
            //     // console.log(this.coordinateData.features[0].geometry.coordinates[1]);
            //     const someArray = [];
            //     someArray.push(this.coordinateData.features[0].geometry.coordinates);
            //     // latlat = this.coordinateData.features[0].geometry.coordinates[0];
            //     // console.log(someArray);
            //     return someArray;
            //     // this.longitude = this.coordinateData.features[0].geometry.coordinates[1];
            // });
    }
}