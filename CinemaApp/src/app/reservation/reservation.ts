import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation',
  standalone: false,
  templateUrl: './reservation.html',
  styleUrl: './reservation.css'
})

export class Reservation {
  movie = {
    title: 'Avatar 2',
    description: 'O aventură epică pe planeta Pandora care îți va lua răsuflarea cu peisaje incredibile și o poveste captivantă.',
    duration: '2h 45min',
    image: '/despicable4.jpg'
  };

  selectedDate: string = '';
  selectedHour: string = '';
  selectedSeats: string[] = [];
  today: string;
  maxSeats: number = 6;
  ticketPrice: number = 25;

  showNotification: boolean = false;
  notificationMessage: string = '';
  notificationType: string = 'info'; 

  currentStep: number = 1;

  hours = [
    { time: '12:00', availableSeats: 18 },
    { time: '15:00', availableSeats: 12 },
    { time: '18:00', availableSeats: 6 },
    { time: '21:00', availableSeats: 15 }
  ];

  seatLayout = [
    { row: 'A', seats: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'], occupied: ['A4'] },
    { row: 'B', seats: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'], occupied: ['B2', 'B5'] },
    { row: 'C', seats: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'], occupied: [] },
    { row: 'D', seats: ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'], occupied: ['D1', 'D6'] },
    { row: 'E', seats: ['E1', 'E2', 'E3', 'E4', 'E5', 'E6'], occupied: ['E3'] }
  ];

  constructor() {
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
    
    this.updateProgress();
  }

  updateProgress() {
    if (this.selectedDate && this.selectedHour && this.selectedSeats.length > 0) {
      this.currentStep = 3;
    } else if (this.selectedDate && this.selectedHour) {
      this.currentStep = 2;
    } else if (this.selectedDate) {
      this.currentStep = 1;
    } else {
      this.currentStep = 1;
    }
  }

  getStepDescription(): string {
    switch (this.currentStep) {
      case 1:
        return 'Selectează data și ora pentru rezervarea ta';
      case 2:
        return 'Alege locurile dorite din sală';
      case 3:
        return 'Verifică detaliile și confirmă rezervarea';
      default:
        return 'Selectează data, ora și locurile pentru filmul tău favorit';
    }
  }

  showMessage(message: string, type: string = 'info') {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;
    
    setTimeout(() => {
      this.hideNotification();
    }, 5000);
  }

  hideNotification() {
    this.showNotification = false;
    this.notificationMessage = '';
  }
  
  toggleSeat(seat: string) {
    const isOccupied = this.seatLayout.some(row => 
      row.occupied.includes(seat)
    );
    
    if (isOccupied) {
      return; 
    }

    if (this.selectedSeats.includes(seat)) {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
    } else {
      if (this.selectedSeats.length < this.maxSeats) {
        this.selectedSeats.push(seat);
      } else {
        this.showMessage('Poți selecta maximum 6 locuri!', 'warning');
      }
    }
    
    this.updateProgress();
  }

  isSeatOccupied(seat: string): boolean {
    return this.seatLayout.some(row => 
      row.occupied.includes(seat)
    );
  }

  isSeatSelected(seat: string): boolean {
    return this.selectedSeats.includes(seat);
  }

  getAvailableSeatsForTime(time: string): number {
    const hourData = this.hours.find(h => h.time === time);
    return hourData ? hourData.availableSeats : 0;
  }

  getTotalPrice(): number {
    return this.selectedSeats.length * this.ticketPrice;
  }

  getFormattedDate(): string {
    if (!this.selectedDate) return '';
    const date = new Date(this.selectedDate);
    return date.toLocaleDateString('ro-RO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  isFormValid(): boolean {
    return !!(this.selectedDate && this.selectedHour && this.selectedSeats.length > 0);
  }

  goBack() {
    if (confirm('Ești sigur că vrei să părăsești această pagină? Progresul va fi pierdut.')) {
      console.log('Going back...');
    }
  }

  confirmReservation() {
    if (!this.isFormValid()) {
      this.showMessage('Te rog completează toate câmpurile!');
      return;
    }

    const reservationData = {
      movie: this.movie.title,
      date: this.selectedDate,
      hour: this.selectedHour,
      seats: this.selectedSeats,
      total: this.getTotalPrice(),
      timestamp: new Date().toISOString()
    };

    console.log('Reservation confirmed:', reservationData);
    
    this.showMessage(`Rezervarea ta a fost confirmată! Total: ${this.getTotalPrice()} RON`, 'success');
    
    
  }

  resetForm() {
    this.selectedDate = '';
    this.selectedHour = '';
    this.selectedSeats = [];
    this.updateProgress();
  }

  getSeatNumber(seat: string): string {
    return seat.substring(1);
  }

  onDateChange() {
    this.updateProgress();
  }

  onHourChange() {
    this.updateProgress();
  }
}


