

// alert.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../_services';

@Component({
  selector: 'alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
})

export class AlertComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  alert: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.onAlert()
      .subscribe(alert => {
        switch (alert?.type) {
          case 'success':
            alert.cssClass = 'alert alert-success';
            break;
          case 'error':
            alert.cssClass = 'alert alert-danger';
            break;
        }

        this.alert = alert;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

