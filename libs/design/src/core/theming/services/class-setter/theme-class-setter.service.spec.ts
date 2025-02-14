import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { DaffThemingService } from '../theming.service';
import { DaffThemeClassSetterService } from './theme-class-setter.service';

describe('DaffThemeClassSetterService', () => {
  let service: DaffThemeClassSetterService;
  let doc: Document;
  let themeService: DaffThemingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DaffThemeClassSetterService,
        {
          provide: DaffThemingService, useValue: {
            theme: new BehaviorSubject('dark'),
            getTheme() {
              return this.theme;
            },
            darkMode() {
              this.theme.next('dark');
            },
            lightMode() {
              this.theme.next('light');
            },
          },
        },
      ],
    });
    themeService = TestBed.inject(DaffThemingService);
    service = TestBed.inject(DaffThemeClassSetterService);
    doc = TestBed.inject(DOCUMENT);
  });

  afterEach(() => {
    service.destroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not modify classes upon initial injection', () => {
    expect(doc.body.className).toEqual('');
  });

  it('should set the class on the body', () => {
    service.beginThemeSync();
    expect(doc.body.className).toContain('daff-theme-dark');
  });

  it('should only set one theme class on the body at a time', () => {
    service.beginThemeSync();
    expect(doc.body.className).toEqual('daff-theme-dark');
    themeService.lightMode();
    expect(doc.body.className).toEqual('daff-theme-light');
    themeService.darkMode();
    expect(doc.body.className).toEqual('daff-theme-dark');
  });
});
