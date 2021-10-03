import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactInfo } from './models/metadata.model';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  // public baseUrl = 'http://localhost:3000';
  public baseUrl = 'https://ethconnect-api.azurewebsites.net';

  constructor(private http: HttpClient) { }

  public async fetchMetadataForAddressAsync(address: string) {
    let metadata = await this.fetchMetadataForAddress(address).toPromise();
    return metadata;
  }

  public fetchMetadataForAddress(address: string) {
    return this.http.get<ContactInfo>(`${this.baseUrl}/v1/ethconnect/fetchMetadata?address=${address}`);
  }

  public saveMetadata(metadata: any) {
    return this.http.post(`${this.baseUrl}/v1/ethconnect/registerMetadata`, metadata);
  }

  public async saveMetadataAsync(metadata: any) {
    return this.http.post(`${this.baseUrl}/v1/ethconnect/registerMetadata`, metadata).toPromise();
  }



}
