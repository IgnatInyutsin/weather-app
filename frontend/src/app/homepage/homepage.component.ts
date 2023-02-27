import { Component, OnInit } from '@angular/core';
declare var ymaps:any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  public map :any;
  public myPolygon: any;
  stateMonitor: any;

  drawCardPoint(newValue: any): void {
    this.myPolygon.options.set("strokeColor", newValue ? '#FF0000' : '#0000FF');
  }
  constructor() { }
  ngOnInit(): void {
    ymaps.ready().then(() => {
      this.map = new ymaps.Map('map', {
        center: [53.2001, 50.15],
        zoom: 12
      });
      // Создаем многоугольник без вершин.
      this.myPolygon = new ymaps.Polygon([], {}, {
        // Курсор в режиме добавления новых вершин.
        editorDrawingCursor: "crosshair",
        // Максимально допустимое количество вершин.
        editorMaxPoints: 1,
        // Цвет заливки.
        fillColor: '#00FF00',
        // Цвет обводки.
        strokeColor: '#0000FF',
        // Ширина обводки.
        strokeWidth: 5
      });
      this.map.geoObjects.add(this.myPolygon);
      // В режиме добавления новых вершин меняем цвет обводки многоугольника.
      this.stateMonitor = new ymaps.Monitor(this.myPolygon.editor.state);
      this.stateMonitor.add("drawing", this.drawCardPoint);

      // Включаем режим редактирования с возможностью добавления новых вершин.
      this.myPolygon.editor.startDrawing();
    });
  }

}
