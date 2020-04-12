import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { WeatherRootObject} from './data.model';
import {HttpClient} from '@angular/common/http';
import {WheaterService} from './wheater.service';

@Component({
    selector: 'app-wheater',
    templateUrl: './wheater.component.html',
    styleUrls: ['./wheater.component.css']
})
export class WheaterComponent {
    @ViewChild('f', {static: false}) singForm: NgForm;
    city = '';
    wheaterData: WeatherRootObject;
    coordinateData: any;
    isFetching = false;
    latitude: number;
    longitude: number;

    constructor( private http: HttpClient,
                 private wheaterService: WheaterService) {
        // this.wheaterService.wheaterObservable.subscribe(wheater => {
        //     this.wheaterData = wheater;
        // });
    }

    onSubmit() {
        console.log('!');
        this.isFetching = true;
        this.city = this.singForm.value.simpleCity;
        console.log(this.city)
        this.wheaterService.citySubject.next(this.city);

        this.wheaterService.fetchWheater(this.city);
        this.wheaterData = this.wheaterService.testWeatherDataFlag;

        // this.wheaterService.fetchWheater(this.city, this.apiKey);
        // this.wheaterService.fetchCoordinate(this.city).subscribe();
        // console.log(this.wheaterService.takeData(this.city));

    }
}