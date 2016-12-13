import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>{{title}}</h1>
            <miss-falc></miss-falc>`,
  styleUrls:['./app.component.css']
})

export class AppComponent {
  title : string = "Finding Falcone!";
 }
