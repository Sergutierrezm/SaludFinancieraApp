import { Component } from '@angular/core';
import { TabsComponent } from './components/tabs/tabs.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TabsComponent],
  template: `<app-tabs></app-tabs>`, // renderiza las pestañas directamente
  styleUrls: ['./app.css']
})
export class App {}
