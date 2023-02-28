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
  weatherData: any = {
    count: 7,
    next: "",
    previous: "",
    results: [
      {
        "day": "2022-02-28",
        "city": "Samara",
        "pressure": 280,
        "humidity": 50,
        "wind": "N",
        "wind_speed": 6,
        "temperature": 0
      },
      {
        "day": "2022-03-01",
        "city": "Samara",
        "pressure": 280,
        "humidity": 50,
        "wind": "N",
        "wind_speed": 6,
        "temperature": 0
      },
      {
        "day": "2022-03-02",
        "city": "Samara",
        "pressure": 280,
        "humidity": 50,
        "wind": "N",
        "wind_speed": 6,
        "temperature": 0
      },
      {
        "day": "2022-03-03",
        "city": "Samara",
        "pressure": 280,
        "humidity": 50,
        "wind": "N",
        "wind_speed": 6,
        "temperature": 0
      },
      {
        "day": "2022-03-04",
        "city": "Samara",
        "pressure": 280,
        "humidity": 50,
        "wind": "N",
        "wind_speed": 6,
        "temperature": 0
      },

    ]
  };


  drawCardPoint(newValue: any): void {
    this.myPolygon.options.set("strokeColor", newValue ? '#FF0000' : '#0000FF');
  }
  constructor() { }
  ngOnInit(): void {
    // инициализируем яндекс карты
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
