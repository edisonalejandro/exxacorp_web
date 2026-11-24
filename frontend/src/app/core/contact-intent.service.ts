import { Injectable, signal } from '@angular/core';

/**
 * Lets any CTA preselect the "Servicio de interés" option in the contact form.
 * Holds the option index (in `contact.form.serviceOptions`) so it survives a
 * language switch.
 */
@Injectable({ providedIn: 'root' })
export class ContactIntentService {
  readonly serviceIndex = signal<number | null>(null);

  select(index: number): void {
    this.serviceIndex.set(index);
  }
}
