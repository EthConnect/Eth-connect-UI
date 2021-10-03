import { Injectable } from '@angular/core';
import { ConnectionInfo } from '@ethersproject/web';
import * as ethers from 'ethers';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  public isConnected: boolean = false;


  public readonly provider: any;
  public onConnected: Subject<any> = new Subject();

  constructor() {
    this.provider = new ethers.providers.Web3Provider((<any> window).ethereum, "any");

    try {
      let signer = this.provider.getSigner();
      signer.getAddress().then((addr: any) => {
        console.log('getAddres', addr);
        this.connect();
      });
    }
    catch { }

    if ((<any> window).ethereum?.isConnected()) {
      this.provider.getSigner();
    }

    (<any> window).ethereum.on('connect', (connectInfo: ConnectionInfo) => {
      console.log('connected');
    });

    (<any> window).ethereum.on('accountsChanged', (accounts: any) => {
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
    });

    (<any> window).ethereum.on('chainChanged', (chainId: any) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      window.location.reload();
    });

  }

  public async connect() {
    if (!this.isConnected) {
      await this.provider.send("eth_requestAccounts", []);
      this.isConnected = true;
      this.onConnected.next();
    }
  }

  public async getSigner() {
    if (!this.isConnected) {
      await this.connect();
    }
    return await this.provider.getSigner();
  }

}
