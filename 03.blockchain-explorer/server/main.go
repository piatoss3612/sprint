package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"math/big"
	"time"

	"github.com/ethereum/go-ethereum/ethclient"
)

func main() {
	network := flag.String("network", "", "Ethereum network")
	infura := flag.String("infura", "", "Infura API key")
	flag.Parse()

	var rpcURL string

	if *network == "" {
		rpcURL = "http://localhost:8545"
	} else {
		rpcURL = fmt.Sprintf("https://%s.infura.io/v3/%s", *network, *infura)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	client, err := ethclient.DialContext(ctx, rpcURL)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()

	blockNumber, err := client.BlockNumber(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("Latest block number: %d\n", blockNumber)

	block, err := client.BlockByNumber(context.Background(), big.NewInt(int64(blockNumber)))
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("Block number: %d\n", block.Number())
	log.Printf("Block hash: %s\n", block.Hash().Hex())
	log.Printf("Block time: %s\n", time.Unix(int64(block.Time()), 0))
	log.Printf("Block gas limit: %d\n", block.GasLimit())
	log.Printf("Block gas used: %d\n", block.GasUsed())
	log.Printf("Block nonce: %d\n", block.Nonce())
	log.Printf("Block difficulty: %d\n", block.Difficulty())
	log.Printf("Block transactions: %d\n", len(block.Transactions()))
}
