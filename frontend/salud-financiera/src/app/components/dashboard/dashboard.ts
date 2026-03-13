import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Balance } from '../../services/balance';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard implements OnInit {
  @Input() month!: number;
  @Input() year!: number;

  ingresos = 0;
  gastos = 0;
  saldo = 0;

  constructor(private balanceService: Balance) {}

  ngOnInit() {
    // Datos de prueba antes de conectar al backend
    this.ingresos = 1561;
    this.gastos = 902;
    this.saldo = this.ingresos - this.gastos;

    // Para usar el backend real:
    // this.balanceService.getBalance(this.year, this.month).subscribe((data: any) => {
    //   this.ingresos = data.ingresos;
    //   this.gastos = data.gastos;
    //   this.saldo = data.saldo;
    // });
  }
}