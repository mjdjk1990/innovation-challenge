import { Component, Input } from '@angular/core';
import { Drawing } from '../../models/drawing/drawing.interface';
import { DataService } from '../../providers/data.service';

/**
 * Generated class for the DrawingsListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'drawings-list',
  templateUrl: 'drawings-list.component.html'
})
export class DrawingsListComponent {

  @Input('drawings') drawings: Drawing[];

  constructor(private data: DataService) {
    
  }

  

}
