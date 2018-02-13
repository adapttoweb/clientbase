import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { GoodiesModule } from './goodies.module';

export function main() {
  describe('Goodies component', () => {
    // Setting module for testing
    // Disable old forms

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [GoodiesModule]
      });
    });

    it(
      'should work',
      async(() => {
        TestBed.compileComponents().then(() => {
          let fixture = TestBed.createComponent(TestComponent);
          let goodiesDOMEl = fixture.debugElement.children[0].nativeElement;

          expect(goodiesDOMEl.querySelectorAll('h2')[0].textContent).toEqual(
            'Features'
          );
        });
      })
    );
  });
}

@Component({
  selector: 'test-cmp',
  template: '<sd-goodies></sd-goodies>'
})
class TestComponent {}
