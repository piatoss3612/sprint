# Sprint

## Common Requirements

1. node.js
2. npm

## 01.getTransactionsByAccount

### Setup

```sh
$ cd 01.getTransactionsByAccount
```

```sh
$ npm install
```

### Infura + Web3.js

#### Requirements

1. infura.io API key
2. account address

```sh
$ make infura
```

or

```sh
$ node infura.js
```

### Etherscan API

#### Requirements

1. etherscan.io API key
2. account address

```sh
$ make etherscan
```

or

```sh
$ node etherscan.js
```

---

## 02.server

### Requirements

1. truffle
2. ganache

### Setup

```sh
$ cd 02.server
```

```sh
$ npm install
```

### Run ganache

```sh
$ ganache --chain.networkId=1337
```

### Compile contracts

```sh
$ truffle compile
```

### Deploy contracts

```sh
$ truffle deploy --network development
```

### Run server

```sh
$ npm start
```