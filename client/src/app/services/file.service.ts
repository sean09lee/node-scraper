import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class FileService {
    private baseEndpoint: string;
    private savingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private successSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public saving: Observable<boolean> = this.savingSubject.asObservable();
    public success: Observable<boolean> = this.successSubject.asObservable();

    constructor(private httpClient: HttpClient, ) {
        this.baseEndpoint = environment.apiBaseUrl;
    }

    public async save(site: string): Promise<void> {
      this.savingSubject.next(true);
      const endpoint = `${this.baseEndpoint}files`;
      const body = {"site": site};
      this.httpClient.post(endpoint, body)
        .toPromise()
        .then((response) => {
          if (response) {
            this.successSubject.next(true);
          } else {
            
            this.successSubject.next(false);
          }
        })
        .catch(() => {
          this.successSubject.next(false);
        })
        .finally(() => {
          this.savingSubject.next(false);
        });
    }
}
