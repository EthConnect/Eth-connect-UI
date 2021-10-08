# Eth-Connect

An look-up system for contact-info metadata mapped to an Ethereum addresses - [Eth-Connect]

Creating a no-cost address mapped metadata(currently limited to encryption public-key) will allow all eth-address-owners to publish their info and connect.

While ENS enables an option to set text-records which can have metadata contact info for an ens name, this might not be possible for everyone and a lot of people might find this unnecessary.


## Features:
- Allow a different private key for all non-financial uses (Safety, Convenience)
- Mapping multiple Eth-address to a single contact-info metadata (Single Point of Contact)

## Concept:
This is enabled by signatures. The user is asked to sign typed metadata with the info. 

```sh
{
    "content": "Mapping contact-info for wallet-address defined by Eth-connect protocol",
    "walletAddress": "0x.."
    "publicKey": "0x"
    "Date": "2021.."
}
```
The signed data is verified and stored. This can be hosted by multiple public providers(for example - infura, alchemy, others) so its readily available for public.
Since the metadata is signed by the eth address owners, its easily verifiable and the providers can be trusted.
There is no transaction, no blockchain use-case for this, and hence no expense to the user.

For v1, the info is only the user's public key. This can be used by other clients to enable easy encryption.
```sh
 Metadata: [
    { name: 'content', type: 'string' },                -- Standard message
    { name: 'walletAddress', type: 'address' },         -- Signing address
    { name: 'publicKey', type: 'string' },              -- New public key to be used for encryption
    { name: 'date', type: 'string' },                   -- Signing date
    
    // { name: 'statusChatKey', type: 'string' },       -- WIP (Need reverse verification. Also spam privacy concerns)
    // { name: 'pgp', type: 'string' },                 -- WIP
    // { name: 'discord', type: 'string' },             -- Need reverse verification. Also spam privacy concerns
    // { name: 'email', type: 'string' },               -- Need reverse verification. Also spam privacy concerns
],
```

## Public key generation:
For onboarding, the entropy for the private key is the signature of a standard message.
Next steps:
- Ask the user for a seed phrase(password) to be signed. This is to avoid other sites asking the user to sign a trivial message and recover the private key.
- Ask user to generate a new account/address from their wallet(eg: Create new account in Metamask) and provide the public key for registration.


 [Eth-Connect]: <https://ethconnect.github.io/Eth-connect-UI/>

