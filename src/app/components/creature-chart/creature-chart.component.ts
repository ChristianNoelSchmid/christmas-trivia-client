import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TriviaService } from 'src/app/services/trivia.service';

@Component({
  selector: 'app-creature-chart',
  templateUrl: './creature-chart.component.html',
  styleUrls: ['./creature-chart.component.css']
})
export class CreatureChartComponent implements OnInit, AfterViewInit {

  constructor(private triviaService: TriviaService) { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const chart = (document.getElementById('chart') as HTMLCanvasElement).getContext("2d");

      this.triviaService.trivia.subscribe(trivia => {
        console.log(trivia?.creaturePoints);
        new Chart(chart!, {
          type: 'bar',
          data: {
            labels: [
              'A bubbly, cheerful elf',
              'A hard-working reindeer',
              'A super sweet gingerbread person',
              'A cool, chill snowman'
            ],
            datasets: [{
                label: "Ratings",
                data: trivia?.creaturePoints,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
          options: {
            scales: {
                y: {
                    min: 0,
                    max: 12,
                    beginAtZero: true
                }
            }
          }
        });
      })
    }, 1000);
  }
}
