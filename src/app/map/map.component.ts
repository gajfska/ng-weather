import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {WheaterService} from '../wheater/wheater.service';
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

    constructor(private wheaterService: WheaterService) {
        this.wheaterService.wheaterObservable
            .subscribe( coord => {
                console.log('Coord');
                console.log(coord);
                this.drawCircle(coord.coord.lat, coord.coord.lon);
            });

        // wheaterService.coordObservable
        //     .subscribe( coord => {
        //         this.drawCircle(coord[1], coord[0]);
        // });
    }

    ngAfterViewInit(): void {
        this.initMap();
    }

    private initMap(): void {
        this.map = L.map('map', {
            center: [ 54.3520, 18.6466 ],
            zoom: 10
        });
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        tiles.addTo(this.map);
    }

    drawCircle(lat: number, lng: number) {
        this.map.panTo(new L.LatLng(lat, lng));
        L.circle([lat, lng],
            {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 2000
            }).addTo(this.map);
    }
}
