import { Component, ViewChild, Renderer, EventEmitter, Output, Input } from '@angular/core';
import { Platform, Loading, ToastController, LoadingController } from 'ionic-angular';
import { StorageService } from '../../providers/storage.service';
import { Drawing } from '../../models/drawing/drawing.interface';

@Component({
  selector: 'canvas-draw',
  templateUrl: 'canvas-draw.component.html'
})
export class CanvasDrawComponent {

  @ViewChild('myCanvas') canvas: any;
  @Input('name') name: string;
  @Output() saveCanvas: EventEmitter<string> = new EventEmitter<string>();
  
  canvasElement: any;
  lastX: number;
  lastY: number;

  currentColour: string = '#000';
  availableColours: any;

  brushSize: number = 5;

  mouseDown: boolean;

  constructor(
    public platform: Platform,
    public renderer: Renderer
  ) {
    this.availableColours = [
      '#000',
      '#1abc9c',
      '#3498db',
      '#9b59b6',
      '#e67e22',
      '#e74c3c',
      '#fff'
    ];
  }

  ngAfterViewInit() {

    this.canvasElement = this.canvas.nativeElement;

    this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
    this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');

  }

  ngOnChanges() {
    if(this.canvasElement) {
      this.clearCanvas();
    }
  }

  changeColour(colour) {
    this.currentColour = colour;
  }

  changeSize(size) {
    this.brushSize = size;
  }

  handleStart(ev) {

    // this.startedDrawing = true;

    this.lastX = ev.touches ? ev.touches[0].pageX : ev.pageX;
    this.lastY = ev.touches ? ev.touches[0].pageY : ev.pageY;

    this.mouseDown = true;
  }

  handleMove(ev) {
    if (this.mouseDown) {

      let ctx = this.canvasElement.getContext('2d');
      let currentX = ev.touches ? ev.touches[0].pageX : ev.pageX;
      let currentY = ev.touches ? ev.touches[0].pageY : ev.pageY;

      ctx.beginPath();
      ctx.lineJoin = "round";
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(currentX, currentY);
      ctx.closePath();
      ctx.strokeStyle = this.currentColour;
      ctx.lineWidth = this.brushSize;
      ctx.stroke();

      this.lastX = currentX;
      this.lastY = currentY;
    }
  }

  clearCanvas() {
    // this.startedDrawing = false;
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }

  async save() {
    this.saveCanvas.emit(this.canvasElement.toDataURL());
  }
}
