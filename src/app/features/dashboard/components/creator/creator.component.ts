import {Component} from '@angular/core';
import {ListingPayload} from "./interfaces/listing.interface";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {serverIP} from "../../../../../main";
import {AuthService} from "../../../../auth/Auth.service";

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss'
})
export class CreatorComponent {
  protected listingFormGroup!: FormGroup;
  protected offerDescription!: any;
  private listingPayload!: ListingPayload;
  private selectedFile!: File | null;

  constructor(private http: HttpClient, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.selectedFile = null;
    this.offerDescription = '';
    this.listingPayload = {
      title: 'Monnr challenger account cheap',
      description: '',
      quantity: 1,
      price: 220,
      isForTrade: false,
      isForSale: true,
      isNegotiable: true,
      isQuickBuy: true,
      photosAsMultipart: null,
      gameName: 'game1',
      categoryName: 'category1'
    };
    this.listingFormGroup = new FormGroup<any>({
    })
  }

  protected submitCreation(): void {
    if(this.selectedFile) {
      this.listingPayload.description = this.offerDescription;
      this.listingPayload.photosAsMultipart = [this.selectedFile];
      let formDataToSend: FormData = new FormData();
      formDataToSend.append('title', this.listingPayload.title);
      formDataToSend.append('description', this.listingPayload.description);
      formDataToSend.append('quantity', JSON.stringify(this.listingPayload.quantity));
      formDataToSend.append('price', JSON.stringify(this.listingPayload.price));
      formDataToSend.append('isForTrade', JSON.stringify(this.listingPayload.isForTrade));
      formDataToSend.append('isForSale', JSON.stringify(this.listingPayload.isForSale));
      formDataToSend.append('isNegotiable', JSON.stringify(this.listingPayload.isNegotiable));
      formDataToSend.append('isQuickBuy', JSON.stringify(this.listingPayload.isQuickBuy));
      formDataToSend.append('images', this.listingPayload.photosAsMultipart[0], this.selectedFile.name);
      formDataToSend.append('gameName', this.listingPayload.gameName);
      formDataToSend.append('categoryName', this.listingPayload.categoryName);
      this.http.post(`${serverIP}api/listings/create`, formDataToSend, {headers: this.authService.authorizationNeeded(), responseType: 'text'}).subscribe(value => {
        console.log(value);
      })
    }

  }

  protected onFileSelected(event: any): void {
    console.log("File updated");
    this.selectedFile = event.target.files[0];
  }
}
