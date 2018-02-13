import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { AccountModule } from './account.module';

export function main() {
  describe('Account component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [AccountModule]
      });
    });

    it(
      'should work',
      async(() => {
        TestBed.compileComponents().then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          let accountDOMEl = fixture.debugElement.children[0].nativeElement;

          expect(accountDOMEl.querySelectorAll('h2')[0].textContent).toEqual(
            'Features'
          );
        });
      })
    );
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-account></sd-account>'
})
class TestComponent {}
