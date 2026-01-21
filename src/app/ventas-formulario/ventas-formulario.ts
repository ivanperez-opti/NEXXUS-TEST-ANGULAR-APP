import { Component, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ventas-formulario',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ventas-formulario.html',
  styleUrl: './ventas-formulario.css',
})

export class VentasFormulario {
  API_URL = "https://7udods6ojbdjznexn2fcdf6rwi.appsync-api.us-east-1.amazonaws.com/graphql"
  API_KEY = "da2-3iisacj5dzgkxb7fyucbpn3xhq"

  formCreate = {
    month: '',
    year: 0,
    total: 0,
    items: 0
  };

  formUpdate = {
    id: '',
    month: '',
    year: null,
    total: null,
    items: null
  };

  formDelete = {
    id: ''
  };

  result: any;

  mutationCreate = `
  mutation Create($input: CreateSalesInput!) {
    createSales(input: $input) {
      id
      month
      year
      total
      items
      createdAt
      updatedAt
    }
  }
  `;

  constructor(private http: HttpClient) {}

  createSales() {
    const headers = new HttpHeaders({
      'x-api-key': this.API_KEY,
      'Content-Type': 'application/json'
    });

    const body = {
      query: this.mutationCreate,
      variables: { input: this.formCreate }
    };

    this.http.post(this.API_URL, body, { headers })
      .subscribe(res => this.result = res);
  }

  mutationDelete = `
    mutation Delete($input: DeleteSalesInput!) {
        deleteSales(input: $input) {
        id
        month
        year
        total
        items
        createdAt
        updatedAt
      }
    }
  `;

  deleteSales() {
    const headers = new HttpHeaders({
      'x-api-key': this.API_KEY,
      'Content-Type': 'application/json'
    });

    const body = {
      query: this.mutationDelete,
      variables: { input: this.formDelete }
    };

    this.http.post(this.API_URL, body, { headers })
      .subscribe(res => this.result = res);
  }

  mutationUpdate = `
    mutation Update($input: UpdateSalesInput!) {
        updateSales(input: $input) {
        id
        month
        year
        total
        items
        createdAt
        updatedAt
      }
    }
  `;

  updateSales() {
    const headers = new HttpHeaders({
      'x-api-key': this.API_KEY,
      'Content-Type': 'application/json'
    });

    // PATCH real: solo enviar campos con valor
    const input = Object.fromEntries(
      Object.entries(this.formUpdate).filter(
        ([_, value]) =>
          value !== '' &&
          value !== null &&
          value !== undefined
      )
    );

    const body = {
      query: this.mutationUpdate,
      variables: { input }
    };

    this.http.post(this.API_URL, body, { headers })
      .subscribe(res => this.result = res);
  }
}
