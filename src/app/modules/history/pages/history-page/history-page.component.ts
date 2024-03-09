import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {
  
  tracksTrending: Array<TrackModel> = [];
  filteredTracks: Array<TrackModel> = [];
  
  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    this.loadDataAll();
  }

  async loadDataAll(): Promise<any> {
    this.tracksTrending = await firstValueFrom(this.trackService.getAllTracks$());
    this.filteredTracks = [...this.tracksTrending]; // Inicialmente muestra todos los tracks
  }

  filterTracks(searchText: string): void {
    if (!searchText) {
      this.filteredTracks = [...this.tracksTrending];
    } else {
      this.filteredTracks = this.tracksTrending.filter(track =>
        track.name.toLowerCase().startsWith(searchText.toLowerCase()) ||
        (track.artist?.name?.toLowerCase().startsWith(searchText.toLowerCase()) ?? false)
      );
    }
  }
  
  
}
