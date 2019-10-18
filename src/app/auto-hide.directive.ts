import { Directive, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appAutoHide]',
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class AutoHideDirective {

  // tslint:disable-next-line: no-input-rename
  @Input('fab') fab: any;
  private lastY = 0;

  constructor(
    private renderer: Renderer2,
    private domCtrl: DomController
  ) {}

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.fab = this.fab.el;

    this.domCtrl.write(() => {
      this.renderer.setStyle(this.fab, 'webkitTransition', 'transform 400ms, opacity 400ms');
    });
  }

  onContentScroll(event: any) {
    if (event.detail.scrollTop > this.lastY) {
      this.renderer.setStyle(this.fab, 'opacity', '0');
      this.renderer.setStyle(this.fab, 'webkitTransform', 'scale3d(.1,.1,.1)');
    } else {
      this.renderer.setStyle(this.fab, 'opacity', '1');
      this.renderer.setStyle(this.fab, 'webkitTransform', 'scale3d(1,1,1)');
    }

    this.lastY = event.detail.scrollTop;
  }
}
