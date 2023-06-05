# Sprint

## 00.Common Requirements

1. node.js
2. npm
3. docker (optional)

## 01.getTransactionsByAccount

### 1.Setup

```sh
$ cd 01.getTransactionsByAccount
```

```sh
$ npm install
```

### 2.Infura + Web3.js

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

### 3.Etherscan API

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

### 1.Setup

```sh
$ cd 02.server
```

```sh
$ npm install
```

### 2.Run ganache

```sh
$ ganache --chain.networkId=1337
```

or

```sh
$ docker run -d -p 8545:8545 --name ganache trufflesuite/ganache:latest --chain.networkId=1337
```

### 3.Compile contracts

```sh
$ truffle compile
```

### 4.Deploy contracts

```sh
$ truffle deploy --network development
```

### 5.Run server

```sh
$ npm start
```