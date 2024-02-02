# bun-https-transfer-closed-bug

### Set up
```bash
bun install
mkcert -cert-file cert.pem -key-file key.pem localhost
toxiproxy-server &
toxiproxy-cli create -l localhost:26379 -u localhost:3000 buntest
```

### Run
```bash
bun index.ts
```

### Reproduce the bug
```bash
curl -X POST https://localhost:26379/test-streaming
```

### Expected
- curl should finish successfully

### Observed
```
curl: (18) transfer closed with outstanding read data remaining
```
### Additional info
- macOS Sonoma 14.2.1
- bun 1.0.23

### Preinstalled software
- https://github.com/FiloSottile/mkcert
- https://github.com/Shopify/toxiproxy