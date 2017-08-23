import {Directive, Input, HostListener, Renderer2, OnInit} from '@angular/core';

/* Directive use for zoom on shapes.
   Required Input() element to be zoommed, width of the zoom-slide if any,
   and a reference to the slide-marker if any
*/
@Directive({
  selector: '[zoom]'
})
export class ZoomDirective implements OnInit{

  constructor(private renderer: Renderer2) {}

  @Input('element')
  element;
  @Input('zoom-limits')
  zoomLimits = {min: 0.5, max: 2};
  @Input('slider-width')
  width = 150;
  @Input('slider-marker')
  slideMarker;
  dragging:boolean;
  zoomFactor = 1;
  slide;
  b;
  m;
  translateValue;


  /*
    Initialize m and b (values for the equation of a line),
    translateValue for the slider-marker and its initial position
  */
  ngOnInit() {
    this.m = this.width / (this.zoomLimits.max - this.zoomLimits.min),
    this.b = (this.width - (this.m * this.zoomLimits.max)) * -1;
    this.translateValue = this.b;
    this.slide = this.renderer.parentNode(this.slideMarker);
    this.renderer.listen(this.slide, 'mouseleave', (event) => {
      this.stopDrag(event.target);
    });
    this.renderer.setStyle(this.slideMarker, 'transform', `translateX(${this.translateValue}px)`);
  }

  /* Click Event just for the zoom-in and
     zoom-out buttons
  */
  @HostListener('click', ['$event.target'])
  onClick(el){
    let max_zoom = this.zoomLimits.max,
        min_zoom = this.zoomLimits.min;

    /* Check if event target was either zoom-in or zoom-out and
       scale by 5% or -5%
    */
    if (el.classList.value == 'zoom-in'){
      this.zoomFactor = Math.floor(this.zoomFactor * 100) / 100;
      if (this.zoomFactor !== max_zoom) this.zoomFactor += 0.05;
      this.translateBar(1);
    }

    else if (el.classList.value == 'zoom-out'){
      this.zoomFactor = Math.ceil(this.zoomFactor * 100) / 100;
      if (this.zoomFactor !== min_zoom) this.zoomFactor -= 0.05;
      this.translateBar(-1);
    }

    /* Scale using css-property transform: scale() on element
      using angular-team-recommended tool Renderer2 for DOM elementproperties
      manipulation
    */
    if (this.zoomFactor <= max_zoom && this.zoomFactor >= min_zoom) {
      this.renderer.setStyle(this.element, 'transform', `scale(${this.zoomFactor})`)
    }
  }

  /* Adds drag functionaltiy by the use of
    mousedown, mouseup, mousemove and mouseleave events
    *** mouseleave event is initialize by the renderer since  ***
    *** HostListener does not support specified targets ***
  */
  @HostListener('mousedown', ['$event.target'])
  startDrag(el){
    if (el.classList.value == 'slide-marker')
    this.dragging = true;
  }

  @HostListener('mouseup', ['$event.target'])
  stopDrag(el){
    if (el.classList.value == 'zoom-slide'
   || el.classList.value == 'slide-marker')
    this.dragging = false;
  }

  @HostListener('mousemove', ['$event, $event.target'])
  onDrag(event, el){
    if ((el.classList.value == 'zoom-slide' || el.classList.value == 'slide-marker')
    && this.dragging == true) {

      let movement = event.layerX;
      this.translateValue = movement;
      this.zoomFactor = (movement+this.b)/this.m;

      if (this.dragging == true && movement < this.width){
        this.translateValue = movement;
        this.renderer.setStyle(this.element, 'transform', `scale(${this.zoomFactor})`)
        this.renderer.setStyle(this.slideMarker, 'transform', `translateX(${this.translateValue}px)`);
      }
    }
  }

  /* Moves the slide-marker as the buttons are clicked
    Takes a number as a parameter either 1 or -1 indicating the
    direction to which the slide-marker is expected to move */
  translateBar(i:number){
    (i == 1) ? this.translateValue = Math.ceil(this.translateValue * 100) / 100 : this.translateValue = Math.floor(this.translateValue * 100) / 100;

    if ((this.translateValue < this.width && this.translateValue > 0) ||
         (this.translateValue >= this.width && i == -1) || (this.translateValue <= 0 && i == 1)) {
      this.translateValue += (this.width/( (this.zoomLimits.max-this.zoomLimits.min)/0.05)) * i;
    }

    if(this.translateValue >= 0 && this.translateValue <= this.width){
      this.renderer.setStyle(this.slideMarker, 'transform', `translateX(${this.translateValue}px)`);
    }
  }
}
