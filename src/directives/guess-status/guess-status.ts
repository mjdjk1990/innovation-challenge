import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[guess-status]' // Attribute selector
})
export class GuessStatusDirective {
  @Input('guess-status') guessStatus: string;

  constructor() {
    console.log(this.guessStatus);
  }

}
