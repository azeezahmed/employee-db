import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Directive, ElementRef, AfterViewInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Hammer from 'hammerjs';
@Directive({
    selector: '[swipeToDelete]'
})
export class SwipeToDeleteDirective implements AfterViewInit, OnChanges {
    @Input() isEnabled: boolean = false;
    @Output() onDelete = new EventEmitter();
    hammerInitialized = false;
    isDragging: boolean = false
    maxLeft = 0
    minLeft = -80;
    lastPosX = 0;
    hammerManager: HammerManager = new Hammer(this.el.nativeElement, { touchAction: "auto" });
    constructor(private el: ElementRef) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isEnabled'])
            this.hammerManager?.get('pan').set({ direction: Hammer.DIRECTION_ALL, enable: this.isEnabled })
    }

    isSwipeValidAndComplete(posX: number, event: HammerInput & { additionalEvent: string }) {
        return Number(posX) <= this.minLeft && !['pandown', 'panup'].includes(event.additionalEvent) && event.srcEvent.type != 'pointercancel'
    }

    ngAfterViewInit(): void {
        if (!this.hammerInitialized) {
            // this.hammerManager = new Hammer(this.el.nativeElement, { touchAction: "auto" });
            const swipeButton: HTMLElement = this.el.nativeElement.parentElement.querySelector('.swipe-delete-box')
            if (swipeButton)
                this.minLeft = -1 * (swipeButton.getBoundingClientRect().width)

            this.hammerManager.on("pan", (ev: HammerInput) => {
                let elem: HTMLElement = this.el.nativeElement;
                elem.classList.add('dragging');

                if (!this.isDragging) {
                    this.isDragging = true;
                    this.lastPosX = elem.offsetLeft;
                }
                let posX = ev.deltaX + this.lastPosX;

                // keep swipeable within range
                if (Number(posX) > this.maxLeft)
                    posX = this.maxLeft
                else if (Number(posX) < this.minLeft)
                    posX = this.minLeft

                elem.style.left = posX + "px";

                if (this.isSwipeValidAndComplete(posX, ev as HammerInput & { additionalEvent: string }))
                    this.onDelete.emit();

                // DRAG ENDED
                if (ev.isFinal) {
                    this.isDragging = false;
                    elem.classList.remove('dragging')
                    elem.style.left = '0px'
                }
            });
            this.hammerInitialized = true;
        }
    }
}