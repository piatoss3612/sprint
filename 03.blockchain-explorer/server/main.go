package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/ethereum/go-ethereum/ethclient"
)

func main() {
	port := flag.Int("port", 8080, "HTTP port")
	network := flag.String("network", "", "Ethereum network")
	infura := flag.String("infura", "", "Infura API key")
	flag.Parse()

	if *port < 1 || *port > 65535 {
		log.Fatal("Invalid port number")
	}

	var rpcURL string

	if *network == "" {
		rpcURL = "http://localhost:8545"
	} else {
		if *infura == "" {
			log.Fatal("Infura API key is required")
		}
		rpcURL = fmt.Sprintf("https://%s.infura.io/v3/%s", *network, *infura)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	client, err := ethclient.DialContext(ctx, rpcURL)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()

	srv := &http.Server{
		Addr: fmt.Sprintf(":%d", *port),
	}

	stop := make(chan bool)
	shutdown := make(chan os.Signal, 1)

	signal.Notify(shutdown,
		syscall.SIGHUP,
		syscall.SIGINT,
		syscall.SIGTERM,
		syscall.SIGQUIT,
	)

	go func() {
		log.Printf("Server started on port %d", *port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal(err)
		}
	}()

	go func() {
		defer func() {
			close(stop)
			close(shutdown)
		}()

		<-shutdown

		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()

		if err := srv.Shutdown(ctx); err != nil {
			log.Println(err)
		}

		log.Println("Server stopped")
	}()

	<-stop
}
