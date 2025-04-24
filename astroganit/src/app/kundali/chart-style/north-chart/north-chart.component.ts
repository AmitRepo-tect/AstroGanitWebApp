import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-north-chart',
  templateUrl: './north-chart.component.html',
  styleUrl: './north-chart.component.scss'
})
export class NorthChartComponent implements AfterViewInit {
  browserWidth: number = window.innerWidth;
  @ViewChild('canvasElement', { static: false }) canvasElement!: ElementRef;
  @Input() planets!: number[];  // Input property for planets' positions
  @Input() lagna!: number;
  @Input() title!: string;
  x = 0; // X coordinate of the rectangle
  y = 0; // Y coordinate of the rectangle
  rxaxis: number[] = [];
  ryaxis: number[] = [];
  pxaxis!: number[][];
  pyaxis!: number[][];
  plaName = ["su", "mo", "ma", "me", "ju", "ve", "sa", "ra", "ke", "ur", "ne", "pl"]
  colors: string[] = [
    'rgb(165, 42, 42)', // Brown
    'rgb(220, 20, 60)', // Crimson
    'rgb(0, 100, 0)',   // Dark Green
    'rgb(139, 0, 139)', // Dark Magenta
    'rgb(30, 144, 255)', // Dodger Blue
    'rgb(255, 0, 255)', // Fuchsia
    'rgb(165, 42, 42)', // Brown
    'rgb(220, 20, 60)', // Crimson
    'rgb(0, 100, 0)',   // Dark Green
    'rgb(139, 0, 139)', // Dark Magenta
    'rgb(30, 144, 255)', // Dodger Blue
    'rgb(255, 0, 255)', // Fuchsia
    'rgb(165, 42, 42)', // Brown
    'rgb(220, 20, 60)', // Crimson
    'rgb(0, 100, 0)',   // Dark Green
    'rgb(139, 0, 139)', // Dark Magenta
    'rgb(30, 144, 255)', // Dodger Blue
    'rgb(255, 0, 255)'  // Fuchsia
  ];
  myMap = new Map<string, string>();
  width!: number; // Width of the rectangle
  height!: number; // Height of the rectangle
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.browserWidth = event.target.innerWidth;
    // this.width = (this.browserWidth - 300) / 3
    // this.height = (this.browserWidth - 300) / 3
  }

  ngAfterViewInit(): void {
    this.width = 360//(this.browserWidth - 300) / 3
    this.height = 360//(this.browserWidth - 300) / 3
    this.drawChart()
    this.printRashi()
    this.printBhav()

  }
  drawChart() {
    // Wait for the view to be initialized before drawing
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    canvas.width = this.width;
    canvas.height = this.height;

    // Draw line
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = .5;
    ctx.stroke();

    // Draw line
    ctx.beginPath();
    ctx.moveTo(this.x, this.y); // Starting point (top-left corner)
    ctx.lineTo(this.x + this.width, this.y + this.height); // Ending point (bottom-right corner)
    ctx.strokeStyle = 'black';
    ctx.lineWidth = .5;
    ctx.stroke();

    // Draw line
    ctx.beginPath();
    ctx.moveTo(this.x + this.width, this.y); // Starting point (top-right corner)
    ctx.lineTo(this.x, this.y + this.height); // Ending point (bottom-left corner)
    ctx.strokeStyle = 'black';
    ctx.lineWidth = .5;
    ctx.stroke();
    // Draw line
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y); // Starting point (top-right corner)
    ctx.lineTo(this.x, this.y + this.height / 2); // Ending point (bottom-left corner)
    ctx.strokeStyle = 'black';
    ctx.lineWidth = .5;
    ctx.stroke();

    // Draw line
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height / 2); // Starting point (top-right corner)
    ctx.lineTo(this.x + this.width / 2, this.y + this.height); // Ending point (bottom-left corner)
    ctx.strokeStyle = 'black';
    ctx.lineWidth = .5;
    ctx.stroke();

    // Draw line
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y); // Starting point (top-right corner)
    ctx.lineTo(this.x + this.width, this.y + this.height / 2); // Ending point (bottom-left corner)
    ctx.strokeStyle = 'black';
    ctx.lineWidth = .5;
    ctx.stroke();
    // Draw line
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y + this.height); // Starting point (top-right corner)
    ctx.lineTo(this.x + this.width, this.y + this.height / 2); // Ending point (bottom-left corner)
    ctx.strokeStyle = 'black';
    ctx.lineWidth = .5;
    ctx.stroke();
  }
  printRashi() {

    this.rxaxis =
      [this.x + this.width / 2 - 10,
      this.x + this.width / 4 - 10,
      this.x + this.width / 4 - 30,
      this.x + this.width / 2 - 30,
      this.x + this.width / 4 - 30,
      this.x + this.width / 4 - 10,
      this.x + this.width / 2 - 10,
      this.x + 3 * this.width / 4 - 10,
      this.x + 3 * this.width / 4 + 15,
      this.x + this.width / 2 + 15,
      this.x + 3 * this.width / 4 + 15,
      this.x + 3 * this.width / 4 - 10,
      ]
    this.ryaxis = [
      this.y + this.height / 2 - 15,
      this.y + this.height / 4 - 15,
      this.y + this.height / 4 + 10,
      this.y + this.height / 2 + 10,
      this.y + 3 * this.height / 4 + 10,
      this.y + 3 * this.height / 4 + 30,
      this.y + this.height / 2 + 30,
      this.y + 3 * this.height / 4 + 30,
      this.y + 3 * this.height / 4 + 10,
      this.y + this.height / 2 + 10,
      this.y + this.height / 4 + 10,
      this.y + this.height / 4 - 15,]
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    let lagna = this.lagna
    for (let i = 0; i < 12; i++) {
      ctx.font = '15px Arial';  // Set font size and family
      ctx.fillStyle = 'black';   // Set text color
      ctx.fillText(lagna, this.rxaxis[i], this.ryaxis[i]);
      lagna++;
      if (lagna > 12) {
        lagna = 1
      }
    }
  }
  printBhav() {
    this.pxaxis = [
      [
        this.x + this.width / 2 - 10,
        this.x + this.width / 2 - 60,
        this.x + this.width / 2 + 30,
        this.x + this.width / 2 - 35,
        this.x + this.width / 2 + 20,
        this.x + this.width / 2 - 35
      ],
      [
        (this.x + this.width / 2) / 2 + 10,
        (this.x + this.width / 2) / 2 - 40,
        (this.x + this.width / 2) / 2 + 50,
        (this.x + this.width / 2) / 2 - 10,
        (this.x + this.width / 2) / 2 + 35,
        (this.x + this.width / 2) / 2 + 10,
      ],
      [
        this.x + 5,
        this.x + 5,
        this.x + 5,
        this.x + 30,
        this.x + 30,
        this.x + 50,
      ],
      [
        (this.x + this.width / 2) / 2 + 15,
        (this.x + this.width / 2) / 2 + 15,
        (this.x + this.width / 2) / 2 + 15,
        (this.x + this.width / 2) / 2 - 30,
        (this.x + this.width / 2) / 2 - 30,
        (this.x + this.width / 2) / 2 + 50,
      ],
      [
        this.x + 5,
        this.x + 5,
        this.x + 5,
        this.x + 30,
        this.x + 30,
        this.x + 50,
      ], [
        (this.x + this.width / 2) / 2 + 10,
        (this.x + this.width / 2) / 2 - 40,
        (this.x + this.width / 2) / 2 + 50,
        (this.x + this.width / 2) / 2 - 10,
        (this.x + this.width / 2) / 2 + 35,
        (this.x + this.width / 2) / 2 + 10,
      ], [
        this.x + this.width / 2 - 10,
        this.x + this.width / 2 - 60,
        this.x + this.width / 2 + 30,
        this.x + this.width / 2 - 35,
        this.x + this.width / 2 + 20,
        this.x + this.width / 2 - 35
      ], [
        (this.x + 3 * this.width / 4) - 10,
        (this.x + 3 * this.width / 4) - 50,
        (this.x + 3 * this.width / 4) + 30,
        (this.x + 3 * this.width / 4) - 35,
        (this.x + 3 * this.width / 4) + 20,
        (this.x + 3 * this.width / 4) - 10
      ], [
        (this.x + this.width) - 35,
        (this.x + this.width) - 35,
        (this.x + this.width) - 35,
        (this.x + this.width) - 60,
        (this.x + this.width) - 60,
        (this.x + this.width) - 80
      ], [
        (this.x + 3 * this.width / 4) - 10,
        (this.x + 3 * this.width / 4) - 10,
        (this.x + 3 * this.width / 4) - 10,
        (this.x + 3 * this.width / 4) + 30,
        (this.x + 3 * this.width / 4) + 30,
        (this.x + 3 * this.width / 4) - 50
      ], [
        (this.x + this.width) - 35,
        (this.x + this.width) - 35,
        (this.x + this.width) - 35,
        (this.x + this.width) - 60,
        (this.x + this.width) - 60,
        (this.x + this.width) - 80
      ], [
        (this.x + 3 * this.width / 4) - 10,
        (this.x + 3 * this.width / 4) - 50,
        (this.x + 3 * this.width / 4) + 30,
        (this.x + 3 * this.width / 4) - 35,
        (this.x + 3 * this.width / 4) + 20,
        (this.x + 3 * this.width / 4) - 10
      ],
    ]
    this.pyaxis = [
      [
        this.y + this.height / 4,
        this.y + this.height / 4,
        this.y + this.height / 4,
        this.y + this.height / 4 - 30,
        this.y + this.height / 4 - 30,
        this.y + this.height / 4 + 30
      ],
      [
        this.y + 25,
        this.y + 25,
        this.y + 25,
        this.y + 50,
        this.y + 50,
        this.y + 60
      ],
      [
        (this.y + this.height / 2) / 2 - 10,
        (this.y + this.height / 2) / 2 + 30,
        (this.y + this.height / 2) / 2 + 70,
        (this.y + this.height / 2) / 2 + 10,
        (this.y + this.height / 2) / 2 + 50,
        (this.y + this.height / 2) / 2 + 30
      ], [
        (this.y + this.height / 2) + 5,
        (this.y + this.height / 2) - 35,
        (this.y + this.height / 2) + 45,
        (this.y + this.height / 2) - 15,
        (this.y + this.height / 2) + 25,
        (this.y + this.height / 2) - 15,
      ], [
        (this.y + 3 * this.height / 4),
        (this.y + 3 * this.height / 4) - 40,
        (this.y + 3 * this.height / 4) + 40,
        (this.y + 3 * this.height / 4) - 20,
        (this.y + 3 * this.height / 4) + 20,
        (this.y + 3 * this.height / 4),
      ]
      , [
        (this.y + this.height) - 10,
        (this.y + this.height) - 10,
        (this.y + this.height) - 10,
        (this.y + this.height) - 30,
        (this.y + this.height) - 30,
        (this.y + this.height) - 50,
      ], [
        (this.y + 3 * this.height / 4),
        (this.y + 3 * this.height / 4),
        (this.y + 3 * this.height / 4),
        (this.y + 3 * this.height / 4) - 30,
        (this.y + 3 * this.height / 4) - 30,
        (this.y + 3 * this.height / 4) + 40,
      ], [
        (this.y + this.height) - 10,
        (this.y + this.height) - 10,
        (this.y + this.height) - 10,
        (this.y + this.height) - 30,
        (this.y + this.height) - 30,
        (this.y + this.height) - 50,
      ], [
        (this.y + 3 * this.height / 4),
        (this.y + 3 * this.height / 4) - 40,
        (this.y + 3 * this.height / 4) + 40,
        (this.y + 3 * this.height / 4) - 20,
        (this.y + 3 * this.height / 4) + 20,
        (this.y + 3 * this.height / 4),
      ], [
        (this.y + this.height / 2) + 5,
        (this.y + this.height / 2) - 35,
        (this.y + this.height / 2) + 45,
        (this.y + this.height / 2) - 15,
        (this.y + this.height / 2) + 25,
        (this.y + this.height / 2) - 15,
      ], [
        (this.y + this.height / 2) / 2 - 10,
        (this.y + this.height / 2) / 2 + 30,
        (this.y + this.height / 2) / 2 + 70,
        (this.y + this.height / 2) / 2 + 10,
        (this.y + this.height / 2) / 2 + 50,
        (this.y + this.height / 2) / 2 + 30
      ], [
        this.y + 25,
        this.y + 25,
        this.y + 25,
        this.y + 50,
        this.y + 50,
        this.y + 60
      ],]
    for (let i = 0; i < this.plaName.length; i++) {
      this.myMap.set(this.plaName[i], this.colors[i]);
    }
    const canvas = this.canvasElement.nativeElement;
    const ctx = canvas.getContext('2d');
    // for (let i = 0; i < 6; i++) {
    //   ctx.font = '15px Arial';
    //   ctx.fillStyle = 'blue';
    //   ctx.fillText(this.plaName[i], this.pxaxis[11][i], this.pyaxis[11][i]);
    // }
    //let arrayLists: string[][] = [];
    let arrayLists: string[][] = Array.from({ length: 12 }, () => []);
    for (let i = 0; i < this.planets.length - 1; i++) {
      let planetBhav = this.getBhavOfPlant(this.lagna, this.planets[i]);
      planetBhav--;
      if (planetBhav >= 12) {
        planetBhav = 0;
      }
      arrayLists[planetBhav].push(this.plaName[i]);
    }
    let innerList: string[] = [];
    let x_axis: number[] = [];
    let y_axis: number[] = [];
    let coordinateIndex: number;
    let mapKeys = this.getMapKeys()
    for (let i = 0; i < arrayLists.length; i++) {
      innerList = arrayLists[i];
      coordinateIndex = 0;
      if (innerList.length > 0) {
        x_axis = this.pxaxis[i];
        y_axis = this.pyaxis[i];
        for (let j = 0; j < innerList.length; j++) {
          if (coordinateIndex > 5) {
            coordinateIndex = 0;
          }
          let plaName = innerList[j]
          ctx.font = '15px Arial';
          ctx.fillStyle = this.myMap.get(plaName);

          ctx.fillText(innerList[j], x_axis[coordinateIndex], y_axis[coordinateIndex]);
          coordinateIndex++;
        }
      }
    }
  }

  getBhavOfPlant(lagnaRashi: number, plntRashi: number): number {
    let bhavNumber: number = plntRashi - lagnaRashi;
    if (bhavNumber < 0) {
      bhavNumber += 12;
    }
    bhavNumber += 1;
    return bhavNumber;
  }
  getMapKeys(): string[] {
    // Convert the iterator returned by `.keys()` to an array
    return Array.from(this.myMap.keys());
  }
}

