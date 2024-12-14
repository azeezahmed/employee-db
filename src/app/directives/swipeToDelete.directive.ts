import { Directive, ElementRef, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import * as Hammer from 'hammerjs';
@Directive({
    selector: '[swipeToDelete]'
})
export class SwipeToDeleteDirective implements AfterViewInit {
    @Output() onDelete = new EventEmitter();
    hammerInitialized = false;
    isDragging: boolean = false
    maxLeft = 0
    minLeft = -80;
    lastPosX = '';
    constructor(private el: ElementRef) { }
    ngAfterViewInit(): void {
        if (!this.hammerInitialized) {

            let hammnerManager = new Hammer(this.el.nativeElement);
            hammnerManager.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 0 });
            hammnerManager.on("pan", (ev) => {
                // for convience, let's get a reference to our object
                let elem = this.el.nativeElement;

                if (!this.isDragging) {
                    this.isDragging = true;
                    this.lastPosX = elem.offsetLeft;
                }

                let posX = ev.deltaX + this.lastPosX;

                // move our element to that position
                if (Number(posX) > this.maxLeft)
                    posX = this.maxLeft.toString()
                else if (Number(posX) < this.minLeft) {
                    posX = this.minLeft.toString()
                }

                elem.style.left = posX + "px";

                // DRAG ENDED
                // this is where we simply forget we are dragging
                if (ev.isFinal) {
                    this.isDragging = false;
                    elem.style.left = '0px'
                    Number(posX) <= this.minLeft && this.onDelete.emit();
                }
                // this.onGesture.emit("swiped left");
            });
            // hammnerManager.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: Math.abs(this.maxLeft) - 10 })
            // hammnerManager.on('swipeLeft', (ev) => {

            // })
            this.hammerInitialized = true;
        }
    }
}