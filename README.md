# Sprint

## Common Requirements

1. node.js
2. npm

## 01.getTransactionsByAccount

```sh
$ cd 01.getTransactionsByAccount
```

### Infura + Web3

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

