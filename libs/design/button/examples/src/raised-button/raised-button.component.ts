import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'raised-button',
  templateUrl: './raised-button.component.html',
  styles: [`
    button[daff-raised-button],
    a[daff-raised-button] {
      margin: 4px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaisedButtonComponent {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
}
