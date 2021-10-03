export interface ContactInfo {
    address: string;
    metadata: Metadata;
    signature: string;
}

export interface Metadata {
    content: string;
    walletAddress: string;
    publicKey: string;
    date: string;
}
