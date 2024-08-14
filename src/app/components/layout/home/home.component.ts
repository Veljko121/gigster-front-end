import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../env/environment';

@Component({
  selector: 'gig-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private http: HttpClient
  ) { }

  demo() {
    this.http.get<string>(environment.apiHost + 'demo').subscribe({
      next: (result) => {
        alert('valjda radi jbg');
      },
      error: () => {
        alert('API error')
      }
    })
  }

}
