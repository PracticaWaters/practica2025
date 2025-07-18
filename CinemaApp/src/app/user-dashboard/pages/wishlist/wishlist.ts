import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-wishlist',
  standalone: false,
  templateUrl: './wishlist.html',
  styleUrls: ['./wishlist.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
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

  notifications: { id: string, message: string, timeoutId: any, item: any }[] = [];
  removedItem: any = null; // salveaza elementul sters pt UNDO

  removeFromWishlist(itemToRemove: any) {
    this.wishlistItems = this.wishlistItems.filter(item => item !== itemToRemove);
    
    const notificationId = itemToRemove.title + Date.now();
    
    const notification = {
      id: notificationId,
      message: `Ai eliminat filmul '${itemToRemove.title}' din wishlist.`,
      timeoutId: setTimeout(() => this.removeNotification(notificationId), 5000),
      item: itemToRemove 
    };

    this.notifications.push(notification);
  }

  undoRemove(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      const itemToRestore = notification.item;
      
      const alreadyExists = this.wishlistItems.some(item => item.title === itemToRestore.title);
      if (!alreadyExists) {
        this.wishlistItems.push(itemToRestore);
      }

      this.removeNotification(notificationId);
    }
  }

  removeNotification(notificationId: string) {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
  }
}
