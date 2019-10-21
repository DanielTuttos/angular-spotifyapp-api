import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify service listo');
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQAjG10IW6Upi8zvq7Y3iHNqD_g34ytRTNX_qPF2FgLEHcsKWliP-_paTldlMouWS4iAEJRuXSaztJfdD9s'
    });

    return this.http.get(url, { headers });


  }

  getNewReleases() {

    return this.getQuery('browse/new-releases?limit=50')
      .pipe(map(data => data['albums'].items));

  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=30`)
      .pipe(map(data => data['artists'].items));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
      //.pipe(map(data => data['artists'].items));
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=es`)
      .pipe(map(data => data['tracks']));
  }


}
