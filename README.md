# 🌩️ Cloudflare DNS Manager

A web-based tool for managing DNS records using the [Cloudflare API](https://developers.cloudflare.com/api).

---

## ✨ Features

- **🗂️ Import & Manage Domain Zones**
- **📝 Manage DNS Records**
- **🔄 Dynamic DNS (DDNS)**  
  Automatically update DNS records when your public IP changes or on a schedule.

---

## 🏷️ Supported DNS Record Types

- `A`
- `AAAA`
- `CNAME`
- `MX`
- `SRV`
- `TXT`

---

## 🚀 Quick Start (Docker)

```bash
docker run -d \
    -p 8080:8080 \
    --name=cloudflare-dns \
    -e PUBLIC_IP_POLL_RATE_SEC=90 \
    evantrow/cloudflare-dns:latest
```

---

## 🐳 Quick Start (Docker Compose)

1. **Build and start the service:**  
    ```bash
    docker-compose up -d
    ```

2. **Access the application:**  
   Open your browser and go to [http://localhost:8080](http://localhost:8080).

3. **Stop the service:**  
    ```bash
    docker-compose down
    ```

> 💾 The database will be stored in the `db` folder in your project directory by default.

![image-20250521112340652](https://p.ipic.vip/hxfp60.png)

![image-20250521112417017](https://p.ipic.vip/v7wbn5.png)

![image-20250521112507978](https://p.ipic.vip/2dauhl.png)

---

### ⚙️ Environment Variables

| Variable                  | Description                                                                                                             |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------|
| `PUBLIC_IP_POLL_RATE_SEC` | Interval (in seconds) to poll public IP for DDNS updates. Uses [ip-monitor](https://github.com/J-Chaniotis/ip-monitor). |

---

## 🔒 Security

API tokens are securely stored in a SQLite database at `/db/database.sqlite`.  
**Important:** Ensure appropriate file permissions are set to protect sensitive data.

---

## 📄 License

MIT License. See [LICENSE](./LICENSE) for details.
