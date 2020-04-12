import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as L from '../../../node_modules/leaflet';
import {WheaterService} from '../wheater/wheater.service';


@Injectable({
  providedIn: 'root'
})
export class MakerService {

  constructor(private http: HttpClient,
              private wheaterService: WheaterService) {
  }

    makeCapitalMarkers(map: L.map): void {
        const marker = L.circle([54.3520, 18.6466],
            {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 2000
            }).addTo(map);
        // this.http.get('/assets/data/usa-capitals.geojson').subscribe((res: any) => {
        //     for (const c of res.features) {
        //         const lat = c.geometry.coordinates[0];
        //         const lon = c.geometry.coordinates[1];
        //         const circle = L.circleMarker([lon, lat]).addTo(map);
        //     }
        // });
    }
}
