import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { WeatherRootObject} from './data.model';
import {HttpClient} from '@angular/common/http';
import {WheaterService} from './wheater.service';

@Component({
    selector: 'app-wheater',
    templateUrl: './wheater.component.html',
    styleUrls: ['./wheater.component.css']
})
export class WheaterComponent implements OnInit {
    @ViewChild('f', {static: false}) singForm: NgForm;
    city: string;
    wheaterData: WeatherRootObject;
    isFetching: boolean;
    myDiv: any;
    error: null;

    constructor( private http: HttpClient,
                 private wheaterService: WheaterService) {
        this.wheaterService.wheaterObservable.subscribe(wheater => {
            this.wheaterData = wheater;
            this.isFetching = false;

            if (wheater !== undefined) {
                this.changeColor(this.wheaterData.weather[0].main);
            }

        });
    }

    onSubmit() {
        this.isFetching = true;
        this.city = this.singForm.value.simpleCity;
        this.wheaterService.citySubject.next(this.city);
    }

    ngOnInit() {
        this.myDiv = document.getElementById('lilBack');
    }

    changeColor(desc: string) {
        switch (desc) {
            case 'Thunderstorm':
                this.myDiv.style.backgroundImage = `url('assets/img/thunderstorm.jpg')`;
                break;
            case 'Drizzle':
                this.myDiv.style.backgroundImage = `url('assets/img/rain.jpg')`;
                break;
            case 'Rain':
                this.myDiv.style.backgroundImage = `url('assets/img/rain.jpg')`;
                break;
            case 'Snow':
                this.myDiv.style.backgroundImage = `url('assets/img/snow.jpg')`;
                break;
            case 'Atmosphere':
                this.myDiv.style.backgroundImage = `url('assets/img/drizzle.jpg')`;
                break;
            case 'Clear':
                this.myDiv.style.backgroundImage = `url('assets/img/sunny.jpg')`;
                break;
            case 'Clouds':
                this.myDiv.style.backgroundImage = `url('assets/img/cloudy.jpg')`;
                break;
        }
    }
}
