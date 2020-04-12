import {AfterViewInit, Component} from '@angular/core';
import { MakerService} from '../services/maker.service';
import * as L from 'leaflet';
import {WheaterService} from '../wheater/wheater.service';
import {LatLngTuple} from 'leaflet';
import {tap} from 'rxjs/operators';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
    private map;

    constructor(private makerService: MakerService,
                private wheaterService: WheaterService) {
        wheaterService.coordObservable
            .pipe(tap( data => {
                console.log(data);
            }))
            // .subscribe({
            //     next(response) { console.log(response); },
            //     error(err) { console.error('Error: ' + err); },
            //     complete() { console.log('Completed'); }
            // });
            .subscribe( coord => {
            // const niewiem = LatLngTuple()
            L.circle([coord[1], coord[0]],
                {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 2000
                }).addTo(this.map);
        });
    }

    ngAfterViewInit(): void {
        this.initMap();
        // this.makerService.makeCapitalMarkers(this.map);

    }

    private initMap(): void {
        this.map = L.map('map', {
            center: [ 54.3520, 18.6466 ],
            zoom: 9
        });
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        tiles.addTo(this.map);
    }
}