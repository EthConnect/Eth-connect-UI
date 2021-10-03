import { Component, OnInit } from '@angular/core';
import { MetadataService } from '../metadata.service';
import { ContactInfo } from '../models/metadata.model';
import { WakuService } from '../waku.service';
import * as ethers from 'ethers';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  public lookupContactInfo: ContactInfo | undefined;
  public lookupMetadataError?: string;
  public receivedMessages: Array<any> = [];
  public provider: any;

  constructor(private metadataService: MetadataService, private wakuService: WakuService) {
    // this.provider = new ethers.providers.Web3Provider((<any> window).ethereum, "any");

  }

  ngOnInit(): void {
    // this.loadMessages();
  }

  private async loadMessages() {
    const signer = this.provider.getSigner();
    if (signer) {
      const address = await signer.getAddress();
      if (address && localStorage.getItem('PRIVATE_KEY_' + address.toUpperCase())) {
        let privateKey = localStorage.getItem('PRIVATE_KEY_' + address.toUpperCase());
        let fn = (msg: any) => this.getMessage(msg);
        this.wakuService.getEncryptedMessages(address, privateKey as string, fn);
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

  public sendMessage(message: string) {
    console.log(message);
  }

  public getMessage(message: any) {


  }

}
