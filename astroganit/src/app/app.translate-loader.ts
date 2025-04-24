import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export class TranslateHttpLoader implements TranslateLoader {
  constructor(private http: HttpClient, private prefix: string = '/assets/i18n/', private suffix: string = '.json') {}

  public getTranslation(lang: string): Observable<any> {
    const header=this.http.get(`${this.prefix}${lang}/header${this.suffix}`)
    return forkJoin([header]).pipe(
      map(response => {
        return Object.assign({}, ...response);
      })
    );
  }
}