import { Component } from '@angular/core';
import * as ethers from 'ethers';
import { ProviderService } from './provider.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eth-connect-ui';
  public account: any;
  public userSecret: string = '';
  public privateKey: string = '';
  public pubKey: string = '';
  public mainAccountAddress?: string;
  public mappedAccountAddress?: string;
  public mappedAccountError?: string;
  public signature?: string;

  constructor(private providerService: ProviderService) {

    providerService.onConnected.subscribe(res => {
      this.connectToMetamask();
    });
    if(providerService.isConnected) {
      this.connectToMetamask();
    }
  }

  public connectToWallet() {
    if (this.isMetaMaskInstalled()) {
      this.connectToMetamask();
    } else {
      // some message
      alert("no metamask");
    }
  }

  //Created check function to see if the MetaMask extension is installed
  public isMetaMaskInstalled() {
    //Have to check the ethereum binding on the window object to see if it's installed
    let ethereum = (<any> window).ethereum;
    return Boolean(ethereum && ethereum.isMetaMask);
  };


  public async connectToMetamask() {
    try {
      await this.providerService.connect();
      let signer = await this.providerService.getSigner();

      console.log("Account:", await signer.getAddress());
      this.account = await signer.getAddress();

    } catch (error) {
      console.error(error);
    }
  };

  public async signSecretAndGenerateKeyPair(secretKey: string) {
    this.userSecret = secretKey;
    let message = "This is just a message signature to generate entropy. Your secretKey is " + secretKey;
    const provider = new ethers.providers.Web3Provider((<any> window).ethereum, "any");

    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    let signature = await signer.signMessage(message);
    console.log({ signature });

    let verification = await ethers.utils.verifyMessage(message, signature);
    console.log({ verification });

    let msgHash = await ethers.utils.hashMessage(message)
    let msgHashBytes = await ethers.utils.arrayify(msgHash);

    let recoveredPubKey = await ethers.utils.recoverPublicKey(msgHashBytes, signature);
    console.log({ recoveredPubKey });

    this.privateKey = signature.substr(0, 66);
    this.pubKey = ethers.utils.computeAddress(this.privateKey);

    (<any> window).ethers = ethers;

  }


  private async signMessage(secret: string) {
    const provider = new ethers.providers.Web3Provider((<any> window).ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    this.account = await signer.getAddress();

    // To sign a simple string, which are used for
    // logging into a service, such as CryptoKitties,
    // pass the string in.
    let signature = await signer.signMessage(secret);
    // '0x73b37bfdf259cef9f20a6745b5f2f421abbe02b98346cc3e357ba8065a9fd85e410f093ba285a186311ba0e98c31ad30d27d440722cc2f4589f1d70dd141ccfe1b'
    console.log(signature);
    return signature;
    // //
    // // A common case is also signing a hash, which is 32
    // // bytes. It is important to note, that to sign binary
    // // data it MUST be an Array (or TypedArray)
    // //

    // // This string is 66 characters long
    // let message = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"

    // // This array representation is 32 bytes long
    // let messageBytes = ethers.utils.arrayify(message);
    // // Uint8Array [ 221, 242, 82, 173, 27, 226, 200, 155, 105, 194, 176, 104, 252, 55, 141, 170, 149, 43, 167, 241, 99, 196, 161, 22, 40, 245, 90, 77, 245, 35, 179, 239 ]

    // // To sign a hash, you most often want to sign the bytes
    // signature = await signer.signMessage(messageBytes)
    // // '0x40191f5a913d82bde511379a07884329dd8ad3d00e7966ad
    // return signature;
  }

  private async signTypedData(secret: string) {
    const provider = new ethers.providers.Web3Provider((<any> window).ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    this.account = await signer.getAddress();

    const domain = {
      name: 'Ether Mail',
      version: '1',
      chainId: 4,
      verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC'
    };

    // The named list of all type definitions
    const types = {
      Person: [
        { name: 'name', type: 'string' },
        { name: 'wallet', type: 'address' }
      ],
      Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person' },
        { name: 'contents', type: 'string' }
      ],
    };

    // The data to sign
    const value = {
      from: {
        name: 'Cow',
        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826'
      },
      to: {
        name: 'Bob',
        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB'
      },
      contents: 'Hello, Bob!'
    };

    let sig = await signer._signTypedData(domain, types, value);
    console.log('sig', sig);
    return sig;
  }


  public async connectMainAccount() {
    const provider = new ethers.providers.Web3Provider((<any> window).ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    this.mainAccountAddress = await signer.getAddress();
    console.log({ mainAccountAddress: this.mainAccountAddress });
  }


  public async connectMappedAccountAddress() {
    const provider = new ethers.providers.Web3Provider((<any> window).ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    if ((await signer.getBalance()).toNumber() > 0) {
      this.mappedAccountError = 'Your mail address has currency. Its advised to use only empty accounts for this';
    }

    this.mappedAccountAddress = await signer.getAddress();
    console.log({ mappedAccountAddress: this.mappedAccountAddress });
  }

  public async confirmWithSignature() {
    const provider = new ethers.providers.Web3Provider((<any> window).ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    let message = "Eth-connect: I confirm that my communication address is " +  this.mappedAccountAddress;
    this.signature = await signer.signMessage(message);
    console.log({ signature: this.signature });

  }

}
