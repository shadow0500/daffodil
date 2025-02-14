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
  selector: 'basic-button',
  templateUrl: './basic-button.component.html',
  styles: [`
    button[daff-button],
    a[daff-button] {
      margin: 4px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicButtonComponent {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
}
