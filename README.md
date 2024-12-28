1. Deposit collatral: ETH / WETH  (Wrapping the ETH)
2. Borrow another asset: DAI
3. Repay the DAI

4. # Getting Started

## Requirements

### Git

You'll know you did it right if you can run:

```bash
git --version
```

and see a response like:

```plaintext
git version x.x.x
```

### Node.js

You'll know you've installed Node.js correctly if you can run:

```bash
node --version
```

and get an output like:

```plaintext
vx.x.x
```

### Yarn instead of npm

You'll know you've installed Yarn correctly if you can run:

```bash
yarn --version
```

and get an output like:

```plaintext
x.x.x
```

You might need to install it with npm:

```bash
npm install --global yarn
```

## Quickstart

```bash
git clone https://github.com/your-github-username/your-repo-name
cd your-repo-name
yarn
```

## Typescript

For the TypeScript edition, run:

```bash
git checkout typescript
```

## Optional Gitpod

If you can't or don't want to run and install locally, you can work with this repo in Gitpod. If you do this, you can skip the "clone this repo" part.



## Usage

This repo requires a mainnet RPC provider, but don't worry! You won't need to spend any real money. We are going to be forking mainnet and pretending as if we are interacting with mainnet contracts.

All you'll need is to set a `MAINNET_RPC_URL` environment variable in a `.env` file that you create. You can get set up with one for free from [Alchemy](https://www.alchemy.com/).

Run:

```bash
yarn hardhat run scripts/aaveBorrow.js
```

## Testing

We didn't write any tests for this, sorry!

## Running on a Testnet or Mainnet

### Setup Environment Variables

You'll want to set your `GOERLI_RPC_URL` and `PRIVATE_KEY` as environment variables. You can add them to a `.env` file, similar to what you see in `.env.example`.

- `PRIVATE_KEY`: The private key of your account (like from MetaMask). **NOTE: FOR DEVELOPMENT, PLEASE USE A KEY THAT DOESN'T HAVE ANY REAL FUNDS ASSOCIATED WITH IT.**
  You can learn how to export it [here](https://metamask.zendesk.com/hc/en-us/articles/360015289452-How-to-export-an-account-s-private-key).
- `GOERLI_RPC_URL`: This is the URL of the Goerli testnet node you're working with. You can get set up with one for free from [Alchemy](https://www.alchemy.com/).

### Get Testnet ETH

Head over to [faucets.chain.link](https://faucets.chain.link/) and get some testnet ETH. You should see the ETH show up in your MetaMask.

### Run

```bash
yarn hardhat run scripts/aaveBorrow.js --network goerli
```

## Linting

To check linting and code formatting:

```bash
yarn lint
```

To fix linting issues:

```bash
yarn lint:fix
```

## Formatting

To format your code:

```bash
yarn format
```

---

Thank you!

