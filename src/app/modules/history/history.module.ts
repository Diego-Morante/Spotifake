import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';

import { SharedModule } from '@shared/shared.module';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { HistoryPageComponent } from './pages/history-page/history-page.component';


@NgModule({
  declarations: [
    HistoryPageComponent,
    SearchComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    HistoryRoutingModule,
    FormsModule
  ]
})
export class HistoryModule { }