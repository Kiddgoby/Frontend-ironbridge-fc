import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

interface Ticket {
  id: number;
  name: string;
  price: number;
  capacity: number;
  available: number;
  description: string;
  image: string;
}

interface Activity {
  id: number;
  name: string;
  price: number;
  capacity: number;
  available: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [Header, Footer, CommonModule],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tickets {
  selectedTeam = signal<'primer-equipo' | 'filial'>('primer-equipo');
  
  visibleTickets = computed(()=>
    this.selectedTeam() === 'primer-equipo' 
    ? this.primerEquipoTickets() 
    : this.filialTickets()
  );

  // Memoized availability statuses
  ticketStatuses = computed(() => {
    const tickets = this.visibleTickets();
    return new Map(tickets.map(ticket => [
      ticket.id,
      this.getAvailabilityStatus(ticket)
    ]));
  });

  activityStatuses = computed(() => {
    const acts = this.activities();
    return new Map(acts.map(activity => [
      activity.id,
      this.getAvailabilityStatus(activity)
    ]));
  });


  primerEquipoTickets = signal<Ticket[]>([
    {
      id: 1,
      name: 'Entrada General',
      price: 15,
      capacity: 500,
      available: 245,
      description: 'Entrada estándar para ver al primer equipo en 4ª División',
      image: 'assets/img/ticket-general.png',
    },
    {
      id: 2,
      name: 'Entrada VIP',
      price: 30,
      capacity: 100,
      available: 42,
      description: 'Asiento preferente con mejor vista del terreno de juego',
      image: 'assets/img/ticket-vip.png',
    },
    {
      id: 3,
      name: 'Abonos (10 partidos)',
      price: 120,
      capacity: 150,
      available: 78,
      description: 'Abono para 10 partidos de la temporada. Mejor precio.',
      image: 'assets/img/ticket-abono.png',
    },
    {
      id: 4,
      name: 'Familia (2 Adultos + 2 Niños)',
      price: 45,
      capacity: 200,
      available: 89,
      description: 'Pack familiar con descuento. Perfecto para llevar a los pequeños.',
      image: 'assets/img/ticket-familia.png',
    },
  ]);

  filialTickets = signal<Ticket[]>([
    {
      id: 5,
      name: 'Entrada General Filial',
      price: 8,
      capacity: 300,
      available: 156,
      description: 'Entrada para apoyar al filial del IRONBRIDGE FC',
      image: 'assets/img/ticket-filial.png',
    },
    {
      id: 6,
      name: 'Abonos Filial (10 partidos)',
      price: 60,
      capacity: 100,
      available: 45,
      description: 'Abono para 10 partidos del filial. Disfruta del futuro del club.',
      image: 'assets/img/ticket-abono-filial.png',
    },
  ]);

  activities = signal<Activity[]>([
    {
      id: 1,
      name: 'Visita al Museo',
      price: 10,
      capacity: 50,
      available: 28,
      description: 'Descubre la historia del IRONBRIDGE FC en nuestro museo. Incluye guía especializado.',
      image: 'assets/img/museo.png',
    },
  ]);

  selectTeam(team: 'primer-equipo' | 'filial'): void {
    this.selectedTeam.set(team);
  }

  getTicketStatus(ticketId: number): 'high' | 'medium' | 'low' {
    return this.ticketStatuses().get(ticketId) || 'high';
  }

  getActivityStatus(activityId: number): 'high' | 'medium' | 'low' {
    return this.activityStatuses().get(activityId) || 'high';
  }

  getAvailabilityStatus(ticket: Ticket | Activity): 'high' | 'medium' | 'low' {
    const percentage = (ticket.available / ticket.capacity) * 100;
    if (percentage > 50) return 'high';
    if (percentage > 20) return 'medium';
    return 'low';
  }

  buyTicket(ticket: Ticket | Activity): void {
    if (ticket.available <= 0) {
      alert('Lo sentimos, esta entrada está agotada.');
      return;
    }

    alert(`¡Entradas de "${ticket.name}" compradas! Precio: €${ticket.price}`);

    const updateTickets = (tickets: Ticket[]) =>
      tickets.map(t => t.id === ticket.id ? { ...t, available: t.available - 1 } : t);

    if (this.selectedTeam() === 'primer-equipo') {
      this.primerEquipoTickets.update(tickets => updateTickets(tickets));
    } else {
      this.filialTickets.update(tickets => updateTickets(tickets));
    }
  }
}
