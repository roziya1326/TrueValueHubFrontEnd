import { Component, Input } from '@angular/core';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-info-icon',
  standalone: true,
  imports: [InfoDialogComponent],
  templateUrl: './info-icon.component.html',
  styleUrl: './info-icon.component.css'
})
export class InfoIconComponent {
  @Input() infoMessage: string = '';
  private overlayRef!: OverlayRef;

  constructor(private overlay: Overlay) {}

  showInfo(event: MouseEvent) {
    if (this.overlayRef) {
      this.overlayRef.dispose(); // Close existing tooltip if already opened
    }

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(event.target as HTMLElement) // Use explicit event target
      .withPositions([{
        originX: 'end',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
      }]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'backdrop',
    });

    const tooltipComponent = this.overlayRef.attach(new ComponentPortal(InfoDialogComponent));
    tooltipComponent.instance.infoMessage = this.infoMessage;

    // Close the tooltip when clicking outside
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.dispose());
  }
}
