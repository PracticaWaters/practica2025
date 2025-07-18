import { Component, OnInit } from '@angular/core';
import { Seat } from '../app-logic/seat';
import { ScreeningRoomData } from '../app-logic/screening-room-data';

//Interfete utilizate pentru teste
interface MovieInfo {
  title: string;
  duration: string;
  genre: string;
  rating: string;
}

interface DateOption {
  date: string;
  day: string;
  dayNum: string;
}

@Component({
  selector: 'app-screening-room',
  standalone: false,
  templateUrl: './screening-room.html',
  styleUrl: './screening-room.css',
})
export class ScreeningRoom implements OnInit {
  screeningRoom: ScreeningRoomData;
  seatsGrid: Seat[][] = [];

  movieInfo: MovieInfo = {
    title: 'Avatar: The Way of Water',
    duration: '192 min',
    genre: 'Sci-Fi, Adventure',
    rating: '8.1',
  };

  dates: DateOption[] = [
    { date: '2025-07-11', day: 'Vin', dayNum: '11' },
    { date: '2025-07-12', day: 'Sâm', dayNum: '12' },
    { date: '2025-07-13', day: 'Dum', dayNum: '13' },
    { date: '2025-07-14', day: 'Lun', dayNum: '14' },
    { date: '2025-07-15', day: 'Mar', dayNum: '15' },
  ];

  times: string[] = ['15:30', '18:00', '19:00', '20:30', '22:00'];
  selectedDate: string = '2025-07-11';
  selectedTime: string = '19:00';

  constructor() {
    this.screeningRoom = {
      id: 1,
      name: 'Sala Premium 1',
      numOfRow: 10,
      numOfSeatsPerRow: 16,
      seatList: [
        'J-8',
        'J-9',
        'H-9',
        'H-10',
        'H-11',
        'C-4',
        'C-5',
        'G-12',
        'G-13',
        'F-3',
        'F-4',
        'F-5',
        'F-6',
        'F-7',
        'F-8',
      ],
    };
  }

  ngOnInit(): void {
    this.generateSeats();
  }

  generateSeats(): void {
    for (let row = 1; row <= this.screeningRoom.numOfRow; row++) {
      const rowLetter = String.fromCharCode(64 + row);
      const rowSeats: Seat[] = [];
      for (let col = 1; col <= this.screeningRoom.numOfSeatsPerRow; col++) {
        const isOccupied = this.screeningRoom.seatList?.includes(`${rowLetter}-${col}`) ?? false;
        rowSeats.push(new Seat(rowLetter, col, isOccupied));
      }
      this.seatsGrid.push(rowSeats);
    }
  }


  toggle(seat: Seat): void {
    seat.toggleSelection();
  }

  get selectedSeats(): string[] {
    return this.seatsGrid
      .flat()
      .filter((seat) => seat.selected)
      .map((seat) => seat.id);
  }

  onDateSelect(date: string): void {
    this.deselectAllSeats();
    this.selectedDate = date;
  }

  onTimeSelect(time: string): void {
    this.deselectAllSeats();
    this.selectedTime = time;
  }

  getFormatsText(): string {
    return '2D, 3D, 4DX, IMAX';
  }

  getTotalPrice(): number {
    return this.selectedSeats.length * 25;
  }

  onContinueToPayment(): void {
    console.log('Continuând către plată:', {
      selectedSeats: this.selectedSeats,
      selectedDate: this.selectedDate,
      selectedTime: this.selectedTime,
      totalPrice: this.getTotalPrice(),
    });
  }

  getSeatClass(seat: Seat): string {
    if (seat.occupied) return 'seat occupied';
    if (seat.selected) return 'seat selected';
    return 'seat available';
  }

  onSeatClick(seat: Seat): void {
    seat.toggleSelection();
  }

   getRowLetter(rowNumber: number): string {
    return String.fromCharCode(64 + rowNumber);
}


  deselectAllSeats(): void {
    this.seatsGrid.forEach(row => {
      row.forEach(seat => {
        seat.selected = false;
      });
    });
  }
}