import {Injectable, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, filter, flatMap, map, share, tap} from 'rxjs/operators';
import {RootObject} from './coordinate.model';
import {Observable, of, Subject, throwError} from 'rxjs';
import {WeatherRootObject} from './data.model';


@Injectable({providedIn: 'root'})
export class WheaterService {

    citySubject = new Subject<string>();
    apiKey = 'cd42375949d1ab7850227235693b257d';

    coordObservable: Observable<number[]> = this.citySubject.pipe(
        flatMap(city => {
            return this.http.get<RootObject>(`https://nominatim.openstreetmap.org/search?city=${city}&format=geojson&accept-language=PL`);
        }), filter(undefinedData => {
            return undefinedData.features[0] !== undefined;
        }),
        map(data => {
            return data.features[0].geometry.coordinates;
        }));

    wheaterObservable: Observable<WeatherRootObject> = this.citySubject.pipe(
        flatMap(city => {
            console.log('Request');
            return this.http.get<WeatherRootObject>(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}&lang=pl`)
                .pipe(
                    catchError(err => {
                        console.log(err);
                        return of(undefined);
                    }));
        }), filter(data => {
            return data !== undefined;
        }), share());


    constructor(private http: HttpClient) {
    }

}
