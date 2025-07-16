import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from './app.translate-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { KundaliComponent } from './kundali/kundali/kundali.component';
import { KundaliResultComponent } from './kundali/kundali-result/kundali-result.component';
import { MatchmakingComponent } from './matchmaking/matchmaking/matchmaking.component';
import { MatchmakingResultComponent } from './matchmaking/matchmaking-result/matchmaking-result.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PanchangHomeComponent } from './Panchang/PanchangHome/panchang-home/panchang-home.component';
import { DailyPanchangComponent } from './Panchang/daily-panchang/daily-panchang.component';
import { DailyHoroscopeComponent } from './horoscope/daily-horoscope/daily-horoscope.component';
import { HoroscopeDetailComponent } from './horoscope/horoscope-detail/horoscope-detail.component';
import { DatePickerComponent } from './dialog/date-picker/date-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HoraComponent } from './Panchang/hora/hora.component';
import { ChogdiaComponent } from './Panchang/chogdia/chogdia.component';
import { KundliBasicComponent } from './kundali/kundali-result/basic/kundli-basic/kundli-basic.component';
import { DashaBasicComponent } from './kundali/kundali-result/dasha/dasha-basic/dasha-basic.component';
import { KpBasicComponent } from './kundali/kundali-result/kp/kp-basic/kp-basic.component';
import { ShodasvargaBasicComponent } from './kundali/kundali-result/shodasvarga/shodasvarga-basic/shodasvarga-basic.component';
import { VarshfalBasicComponent } from './kundali/kundali-result/varshfal/varshfal-basic/varshfal-basic.component';
import { BasicDetailComponent } from './kundali/kundali-result/basic/kundli-basic/basic-detail/basic-detail/basic-detail.component';
import { NorthChartComponent } from './kundali/chart-style/north-chart/north-chart.component';
import { KundliChartComponent } from './kundali/kundali-result/basic/kundli-basic/charts/kundli-chart/kundli-chart.component';
import { KundliPlanetPositionComponent } from './kundali/kundali-result/basic/kundli-basic/planet-position/kundli-planet-position/kundli-planet-position.component';
import { AshatakvargaComponent } from './kundali/kundali-result/basic/kundli-basic/ashatakvarga/ashatakvarga/ashatakvarga.component';
import { VimshotriDashaComponent } from './kundali/kundali-result/dasha/dasha-basic/vimshotri-dasha/vimshotri-dasha/vimshotri-dasha.component';
import { CharDashaComponent } from './kundali/kundali-result/dasha/dasha-basic/char-dasha/char-dasha/char-dasha.component';
import { CharAnterDashaComponent } from './kundali/kundali-result/dasha/dasha-basic/char-anter-dasha/char-anter-dasha/char-anter-dasha.component';
import { YoginiDashaComponent } from './kundali/kundali-result/dasha/dasha-basic/yogini-dasha/yogini-dasha/yogini-dasha.component';
import { VarshfalDetailComponent } from './kundali/kundali-result/varshfal/varshfal-basic/varshfal-detail/varshfal-detail/varshfal-detail.component';
import { VarshfalChartComponent } from './kundali/kundali-result/varshfal/varshfal-basic/varshfal-chart/varshfal-chart/varshfal-chart.component';
import { VarshfalTableComponent } from './kundali/kundali-result/varshfal/varshfal-basic/varshfal-table/varshfal-table/varshfal-table.component';
import { VarshfalPredictionComponent } from './kundali/kundali-result/varshfal/varshfal-basic/varshfal-prediction/varshfal-prediction/varshfal-prediction.component';
import { VividhBasicComponent } from './kundali/kundali-result/vividh/component/vividh-basic/vividh-basic.component';
import { KarakComponent } from './kundali/kundali-result/vividh/component/karak/karak/karak.component';
import { AvasthaComponent } from './kundali/kundali-result/vividh/component/avastha/avastha/avastha.component';
import { NavtaraComponent } from './kundali/kundali-result/vividh/component/navtara/navtara/navtara.component';
import { RogandNidanComponent } from './kundali/kundali-result/vividh/component/rogandnidan/rogand-nidan/rogand-nidan.component';
import { DatePlaceComponent } from './Panchang/date-place/date-place/date-place.component';
import { DoGhatiComponent } from './Panchang/do-ghati/do-ghati/do-ghati.component';
import { RahukaalComponent } from './Panchang/rahukaal/rahukaal/rahukaal.component';
import { LagnaMuhuratComponent } from './Panchang/lagna-muhurat/lagna-muhurat/lagna-muhurat.component';
import { VratComponent } from './Panchang/vrat/vrat/vrat.component';
import { FestivalComponent } from './Panchang/festival/festival/festival.component';
import { HolidaysComponent } from './Panchang/Holidays/holidays/holidays.component';
import { PanchakComponent } from './Panchang/panchak/panchak/panchak.component';
import { BhadraComponent } from './Panchang/bhadra/bhadra/bhadra.component';
import { MuhuratsComponent } from './Panchang/sub-component/muhurat/muhurats/muhurats.component';
import { PanchangSubComponent } from './Panchang/sub-component/panchang-sub/panchang-sub/panchang-sub.component';
import { VivahMuhuratComponent } from './Panchang/muhurats/vivah-muhurat/vivah-muhurat/vivah-muhurat.component';
import { VahanMuhuratComponent } from './Panchang/muhurats/vahan_muhurat/vahan-muhurat/vahan-muhurat.component';
import { NaamkaranMuhuratComponent } from './Panchang/muhurats/naamkaran_muhurat/naamkaran-muhurat/naamkaran-muhurat.component';
import { GrahPraveshMuhuratComponent } from './Panchang/muhurats/grah_pravesh_muhurat/grah-pravesh-muhurat/grah-pravesh-muhurat.component';
import { AnnprasanMuhuratComponent } from './Panchang/muhurats/annprasaran_muhurat/annprasan-muhurat/annprasan-muhurat.component';
import { MundanMuhuratComponent } from './Panchang/muhurats/mundan_muhurat/mundan-muhurat/mundan-muhurat.component';
import { BhumiPujanComponent } from './Panchang/muhurats/bhumi_pujan_muhurat/bhumi-pujan/bhumi-pujan.component';
import { VratFestHoldaySubComponent } from './Panchang/sub-component/vrat-fest-holiday-sub/vrat-fest-holday-sub/vrat-fest-holday-sub.component';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    KundaliComponent,
    KundaliResultComponent,
    MatchmakingComponent,
    MatchmakingResultComponent,
    PanchangHomeComponent,
    DailyPanchangComponent,
    DailyHoroscopeComponent,
    HoroscopeDetailComponent,
    DatePickerComponent,
    HoraComponent,
    ChogdiaComponent,
    KundliChartComponent,
    KundliBasicComponent,
    DashaBasicComponent,
    KpBasicComponent,
    ShodasvargaBasicComponent,
    VarshfalBasicComponent,
    BasicDetailComponent,
    NorthChartComponent,
    KundliPlanetPositionComponent,
    AshatakvargaComponent,
    VimshotriDashaComponent,
    CharDashaComponent,
    CharAnterDashaComponent,
    YoginiDashaComponent,
    VarshfalDetailComponent,
    VarshfalChartComponent,
    VarshfalTableComponent,
    VarshfalPredictionComponent,
    VividhBasicComponent,
    KarakComponent,
    AvasthaComponent,
    NavtaraComponent,
    RogandNidanComponent,
    DatePlaceComponent,
    DoGhatiComponent,
    RahukaalComponent,
    LagnaMuhuratComponent,
    VratComponent,
    FestivalComponent,
    HolidaysComponent,
    PanchakComponent,
    BhadraComponent,
    MuhuratsComponent,
    PanchangSubComponent,
    VivahMuhuratComponent,
    VahanMuhuratComponent,
    NaamkaranMuhuratComponent,
    GrahPraveshMuhuratComponent,
    AnnprasanMuhuratComponent,
    MundanMuhuratComponent,
    BhumiPujanComponent,
    VratFestHoldaySubComponent
  ],
  imports: [
    MatAutocompleteModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([
      {
        path: 'daily-panchang', component: DailyPanchangComponent
      },
      {
        path: 'hora', component: HoraComponent
      },
      {
        path: 'chogdia', component: ChogdiaComponent
      }
    ])
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync('noop'),
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

