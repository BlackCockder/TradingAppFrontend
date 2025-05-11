import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class MessageDisplayService {

  constructor(private messageService: MessageService) { }

  public triggerToastMessage(severity: string, summary: string, detail: string, life: number): void {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life
    })
  }
}
