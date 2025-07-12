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
import { DoGhatiComponent } from './Panchang/do-ghati/do-ghati/do-ghati.component';
import { RahukaalComponent } from './Panchang/rahukaal/rahukaal/rahukaal.component';
import { LagnaMuhuratComponent } from './Panchang/lagna-muhurat/lagna-muhurat/lagna-muhurat.component';
import { VratComponent } from './Panchang/vrat/vrat/vrat.component';
import { FestivalComponent } from './Panchang/festival/festival/festival.component';
import { HolidaysComponent } from './Panchang/Holidays/holidays/holidays.component';
import { PanchakComponent } from './Panchang/panchak/panchak/panchak.component';
import { BhadraComponent } from './Panchang/bhadra/bhadra/bhadra.component';
import { VivahMuhuratComponent } from './Panchang/muhurats/vivah-muhurat/vivah-muhurat/vivah-muhurat.component';
import { VahanMuhuratComponent } from './Panchang/muhurats/vahan_muhurat/vahan-muhurat/vahan-muhurat.component';
import { GrahPraveshMuhuratComponent } from './Panchang/muhurats/grah_pravesh_muhurat/grah-pravesh-muhurat/grah-pravesh-muhurat.component';
import { AnnprasanMuhuratComponent } from './Panchang/muhurats/annprasaran_muhurat/annprasan-muhurat/annprasan-muhurat.component';
import { MundanMuhuratComponent } from './Panchang/muhurats/mundan_muhurat/mundan-muhurat/mundan-muhurat.component';
import { NaamkaranMuhuratComponent } from './Panchang/muhurats/naamkaran_muhurat/naamkaran-muhurat/naamkaran-muhurat.component';

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
  },
  {
    path: 'do-ghati', component: DoGhatiComponent
  },
  {
    path: 'rahukaal', component: RahukaalComponent
  },
  {
    path: 'lagna-muhurat', component: LagnaMuhuratComponent
  },
  {
    path: 'vrat', component: VratComponent
  },
  {
    path: 'festival', component: FestivalComponent
  },
  {
    path: 'holidays', component: HolidaysComponent
  },
  {
    path: 'panchak', component: PanchakComponent
  },
  {
    path: 'bhadra', component: BhadraComponent
  },
  {
    path: 'VivahMuhurat', component: VivahMuhuratComponent
  },
  {
    path: 'VahanMuhurat', component: VahanMuhuratComponent
  },
  {
    path: 'GrahPraveshMuhurat', component: GrahPraveshMuhuratComponent
  },
  {
    path: 'AnnprasanMuhurat', component: AnnprasanMuhuratComponent
  },
  {
    path: 'MundanMuhurat', component: MundanMuhuratComponent
  },
  {
    path: 'NaamkaranMuhurat', component: NaamkaranMuhuratComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
