import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css']
})
export class Wishlist {
  wishlistItems = [
    {
      title: 'Smallfoot',
      details: 'Descrierea filmului...',
      imageUrl: 'smallfoot.jpg'
    },
    {
      title: 'Dune: Part Two',
      details: '',
      imageUrl: 'dune2.jpg'
    },
    {
      title: 'Despicable Me 4',
      details: '',
      imageUrl: 'despicable4.jpg'
    }
  ];

  showNotification: boolean = false;
  notificationMessage: string = '';
  removedItem: any = null;
  notificationTimeout: any;

  // Metoda de eliminare din wishlist
  removeFromWishlist(itemToRemove: any) {
    this.removedItem = itemToRemove;
    this.wishlistItems = this.wishlistItems.filter(item => item !== itemToRemove);
    
    // Setăm mesajul de notificare
    this.notificationMessage = `Ai eliminat filmul '${itemToRemove.title}' din wishlist.`;

    // Arată notificarea
    this.showNotification = true;

    // Setează timeout pentru a închide notificarea automat după 5 secunde
    clearTimeout(this.notificationTimeout);
    this.notificationTimeout = setTimeout(() => {
      this.showNotification = false;
    }, 5000);
  }

  // Metoda pentru a anula eliminarea
  undoRemove() {
    if (this.removedItem) {
      this.wishlistItems.push(this.removedItem); // Adăugăm filmul înapoi în wishlist
      this.showNotification = false; // Ascundem notificarea
    }
  }

  // Închide notificarea manual
  closeNotification() {
    this.showNotification = false;
  }
}
