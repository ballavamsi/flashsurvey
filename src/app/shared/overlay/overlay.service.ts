import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';

@Injectable()

export class OverlayService {
    status : boolean;
    progressBarVisibility : Subject<boolean> = new Subject<boolean>();

    constructor(
        private overlay: Overlay
    ) {
      this.progressBarVisibility.subscribe((value) => {
        this.status = value
      });
    }
    createOverlay(config: AppOverlayConfig): OverlayRef {
        return this.overlay.create(config);
    }
    attachTemplatePortal(overlayRef: OverlayRef, templateRef: TemplateRef<any>, vcRef: ViewContainerRef) {
        let templatePortal = new TemplatePortal(templateRef, vcRef);
        overlayRef.attach(templatePortal);
    }
    positionGloballyCenter(): PositionStrategy {
        return this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();
    }

    show() {
      this.progressBarVisibility.next(true);
    }

    hide() {
      this.progressBarVisibility.next(false);
    }
}

export interface AppOverlayConfig extends OverlayConfig { }
