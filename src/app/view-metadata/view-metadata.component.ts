import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as ethers from 'ethers';
import { MetadataService } from '../metadata.service';
import { ContactInfo } from '../models/metadata.model';
import { ProviderService } from '../provider.service';

@Component({
  selector: 'app-view-metadata',
  templateUrl: './view-metadata.component.html',
  styleUrls: ['./view-metadata.component.css']
})
export class ViewMetadataComponent implements OnInit {
  public userContactInfo: ContactInfo | undefined;
  public lookupContactInfo: ContactInfo | undefined;
  public lookupMetadataError?: string;

  constructor(private http: HttpClient, private metadataService: MetadataService, private providerService: ProviderService) { }

  public ngOnInit(): void {
    this.refreshData();
  }

  public refreshData() {
    if (this.providerService.isConnected) {
      this.getUserMetadata();
    }
  }

  public async getUserMetadata() {
    const signer = this.providerService.provider.getSigner();
    if (signer) {
      const address = await signer.getAddress();
      let res = await this.metadataService.fetchMetadataForAddressAsync(address);
      if (res && res.metadata) {
        this.userContactInfo = res;
      }
    }
  }

  public async lookupMetadataForAddress(address: string) {
    this.lookupMetadataError = undefined;
    let metadata = await this.metadataService.fetchMetadataForAddressAsync(address);
    if (!metadata || metadata.address == undefined) {
      this.lookupMetadataError = 'No metadata found for the address';
    } else {
      this.lookupContactInfo = metadata;
    }
  }

}
