import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/nav-bar/navbar.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { ItemListComponent } from './components/item-list/item-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FontAwesomeModule, NavbarComponent,SidePanelComponent, ItemListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TutorialTrueValue';
}
