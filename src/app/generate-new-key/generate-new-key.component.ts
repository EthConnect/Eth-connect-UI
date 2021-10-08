import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import * as ethers from 'ethers';
import { ExportKeyComponent } from '../export-key/export-key.component';
import { MetadataService } from '../metadata.service';
import { ProviderService } from '../provider.service';

@Component({
  selector: 'app-generate-new-key',
  templateUrl: './generate-new-key.component.html',
  styleUrls: ['./generate-new-key.component.css']
})
export class GenerateNewKeyComponent implements OnInit {
  @ViewChild(MatStepper, { static: true }) stepper?: MatStepper;
  public entropyMessageTemplate: string = 'Eth-Connect: This signature is to generate some entropy';
  public authorizingMessageTemplate: string = "Eth-Connect: Authorizing public key for communication: ##PUBLIC_KEY##";
  public privateKey?: string;
  public publicKey?: string;
  public authorizingSignature!: string;
  public finalSignatureObject: any;
  public mode = 1;

  constructor(private http: HttpClient, private metadataService: MetadataService, private providerService: ProviderService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  public async onGenerateEntropySignatureClick() {
    await this.providerService.connect();
    const signer = await this.providerService.getSigner();

    let signature = await signer.signMessage(this.entropyMessageTemplate);

    let privateKey = signature.substr(0, 66);
    this.privateKey = privateKey;
    // let newAddress = ethers.utils.computeAddress(privateKey);
    this.publicKey = ethers.utils.computePublicKey(privateKey);

    console.log('generate-new-key');
    this.mode = 2;
    setTimeout(() => {
      (this.stepper as MatStepper).next();
    });
  }

  public async onGenerateAuthorizingSignatureWithJsonClick() {
    await this.providerService.connect();
    const signer = await this.providerService.getSigner();
    const address = await signer.getAddress();
    const date = new Date().toISOString();

    const domain = {
      name: 'Eth-Connect',
      version: '1',
      // chainId: this.providerService.provider.network.chainId,
      // verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'

    };

    // The named list of all type definitions
    const types = {
      Metadata: [
        { name: 'content', type: 'string' },
        { name: 'walletAddress', type: 'address' },
        { name: 'publicKey', type: 'string' },
        { name: 'date', type: 'string' },
        // { name: 'statusChatKey', type: 'string' },
        // { name: 'pgp', type: 'string' },
        // { name: 'discord', type: 'string' },
        // { name: 'email', type: 'string' },
      ],
    };

    // The data to sign
    const value = {
      content: 'Mapping contact-info for wallet-address defined by Eth-connect protocol',
      publicKey: this.publicKey,
      walletAddress: address,
      date
    };

    let signature = await signer._signTypedData(domain, types, value);

    // Call api with this signature
    this.finalSignatureObject = {
      address: address,
      metadata: value,
      signature: signature
    }
    console.log({ finalSignatureObject: this.finalSignatureObject });

    this.metadataService.saveMetadata(this.finalSignatureObject).subscribe(res => {
      console.log(res)
      this.mode = 3;
      setTimeout(() => {
        (this.stepper as MatStepper).next();
      });
    });

  }

  public openPrivateKeyExportDialog() {
    this.dialog.open(ExportKeyComponent, {
      data: {
        privateKey: this.privateKey
      }
    });
  }

}
