# Good Bounties

GoodBounties is a platform where small actions compound into real-world impact. Create or fund public goods bounties and make a difference in your local community. The bounty reward can be claimed by anyone who provides a valid proof of completing the bounty.

## Project Description

- GoodBounties is an alternative way for individuals to contribute to public goods. The opaque nature of traditional charitable donations often leaves donors unsure of where their contributions are actually used. GoodBounties eliminates this ambiguity by empowering you to choose the exact impact you wish to make.
- The platform allows any user to create a public goods bounty, attaching a reward to the task. Other users can then increase the reward by contributing additional funds to the reward pool. The bounty can then be claimed by any individual who can provide proof of completion, thus ensuring that their contribution directly results in the desired impact.
- GoodBounties is where small actions compound into real world impact. The platform offers an innovative way to drive change – permissionless, transparent, and empowering for everyone involved.

### How it's Made

- From a technical perspective, GoodBounties is built to provide a seamless user experience to a non-crypto audience. Users can quickly sign up using their social media accounts or emails, thanks to Safe’s AuthKit together with Web3Auth. The use of Safe{Core}SDK enables account abstraction, adding another layer of convenience for our users.
- Once registration is completed, we utilize TheGraph's capabilities to index the diverse range of bounties that users can create via our intuitive interface. This indexing enables efficient querying of bounty data and related fields.
- The bounties are created as NFTs (ERC721), and we store the token's metadata on IPFS.
- Other users can stake on any NFT to increase the bounty reward and incentivize someone to complete it. This mechanism is governed by our smart contract, capable of handling staking across any NFT collection.
- Contributors can submit proofs of their work via the Ethereum Attestation Service (EAS), generating attestations that verify their claims of completed tasks. The bounty owner can subsequently review these proofs, and either approve or reject them.
- Upon acceptance of the proof, we incorporate Safe's relayKit, enabling gasless transactions. This means contributors can receive funds without the burden of transaction fees or the need to procure funds, significantly simplifying the process.
- To further our mission of making the platform as accessible as possible, GoodBounties is deployed on various networks including Polygon, Celo, Gnosis Chain, and Linea.

## Smart Contracts adresses

- Polygon 
  - BountyStakeContract.sol => 0x89733314f5466780E59516f4fb88B7d9B2044704 [Polygonscan](https://polygonscan.com/address/0x89733314f5466780E59516f4fb88B7d9B2044704)
  - PGBountiesManager.sol => 0x03F1639eDc4F11fe7e028E9622B2e5d7B4b010Ac [Polygonscan](https://polygonscan.com/address/0x03F1639eDc4F11fe7e028E9622B2e5d7B4b010Ac)
- Celo 
  - BountyStakeContract.sol => 0x146B4E0aC6C4A9dF94b8Da9E61886C68DbBC4140 [Celo Explorer](https://explorer.celo.org/mainnet/address/0x146B4E0aC6C4A9dF94b8Da9E61886C68DbBC4140)
  - PGBountiesManager.sol => 0x629d4fa0D07c7e9Db1888fCE4acD4e159f3a9cB1 [Celo Explorer](https://explorer.celo.org/mainnet/address/0x629d4fa0D07c7e9Db1888fCE4acD4e159f3a9cB1)
- Gnosis
  - BountyStakeContract.sol => 0x75D7185C5C0a5F39b7c1560eDE56943a91bF2568 [Gnosisscan](https://gnosisscan.io/address/0x75D7185C5C0a5F39b7c1560eDE56943a91bF2568)
  - PGBountiesManager.sol => 0xc8BBCEF15C9666AfEDA5f07A18885494f961da11 [Gnosisscan](https://gnosisscan.io/address/0xc8BBCEF15C9666AfEDA5f07A18885494f961da11)
- Linea 
  - BountyStakeContract.sol => TBD [Linea](https://explorer.goerli.linea.build/)
  - PGBountiesManager.sol => TBD [Linea](https://explorer.goerli.linea.build/)