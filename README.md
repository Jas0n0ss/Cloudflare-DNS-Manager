### Cloudflare-DNS-Manager

### Deploy
```
docker run -d -it\
    -p 8080:8080 \
    --name=cloudflare-dns \
    -e PUBLIC_IP_POLL_RATE_SEC=90 \
    ghcr.io/jas0n0ss/cloudflare-dns-manager:latest
```
