import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  tracksTrending: Array<TrackModel> = []
  listObservers$: Array<Subscription> = []

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    this.loadDataAll() //TODO 📌📌
  }

  async loadDataAll(): Promise<any> {
    this.tracksTrending = await firstValueFrom(this.trackService.getAllTracks$());
  }

  searchText: string = '';
  @Output() searchEvent = new EventEmitter<string>();

  onSearchChange(): void {
    this.searchEvent.emit(this.searchText);
  }
}
