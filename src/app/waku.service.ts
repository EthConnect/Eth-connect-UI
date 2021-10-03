import { Injectable } from '@angular/core';
// import { Waku, WakuMessage } from 'js-waku';

@Injectable({
  providedIn: 'root'
})
export class WakuService {
  public readonly topicFormat = "/Eth-connect/v1/EncryptedMessage/[ADDRESS]";

  constructor() { }

  public async sendEncryptedMessage(fromAddress: string, toAddress: string, message: string, publicKey: string) {
    message += `
    
    Message sent from address ${fromAddress}
    sent from Eth-connect App using Status-Waku protocol`;

    // let contentTopic = this.topicFormat.replace('[ADDRESS]', toAddress.toUpperCase());
    // await WakuMessage.fromUtf8String(message, contentTopic, {
    //   encPublicKey: publicKey,
    // });
    return true;
  }

  public async getEncryptedMessages(address: string, privateKey: string, callBackFunc: any) {
    // let waku = await Waku.create({ bootstrap: true });
    // waku.relay.addDecryptionKey(privateKey);
    // let contentTopic = this.topicFormat.replace('[ADDRESS]', address.toUpperCase());
    // waku.relay.addObserver(callBackFunc, [contentTopic]);
  }
}
