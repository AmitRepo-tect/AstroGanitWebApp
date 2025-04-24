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
    VarshfalPredictionComponent
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

