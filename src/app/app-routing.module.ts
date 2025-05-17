import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { KundaliComponent } from './kundali/kundali/kundali.component';
import { MatchmakingComponent } from './matchmaking/matchmaking/matchmaking.component';
import { KundaliResultComponent } from './kundali/kundali-result/kundali-result.component';
import { PanchangHomeComponent } from './Panchang/PanchangHome/panchang-home/panchang-home.component';
import { DailyPanchangComponent } from './Panchang/daily-panchang/daily-panchang.component';
import { DailyHoroscopeComponent } from './horoscope/daily-horoscope/daily-horoscope.component';
import { HoroscopeDetailComponent } from './horoscope/horoscope-detail/horoscope-detail.component';
import { HoraComponent } from './Panchang/hora/hora.component';
import { ChogdiaComponent } from './Panchang/chogdia/chogdia.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'kundali', component: KundaliComponent
  },
  {
    path: 'matchmaking', component: MatchmakingComponent
  },
  {
    path: 'kundali-result', component: KundaliResultComponent
  },
  {
    path: 'panchang-home', component: PanchangHomeComponent
  },
  {
    path: 'daily-panchang', component: DailyPanchangComponent
  },
  {
    path: 'daily-horoscope', component: DailyHoroscopeComponent
  },
  {
    path: 'horoscope-detail', component: HoroscopeDetailComponent
  },
  {
    path: 'hora', component: HoraComponent
  },
  {
    path: 'chogdia', component: ChogdiaComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
