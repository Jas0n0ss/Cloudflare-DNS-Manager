const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 5000;

app.use(express.json());

// API token middleware
const getAuthorizationHeader = (req) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return null;
  }
  return `Bearer ${token}`;
};

// Get Cloudflare Zones (Domains)
app.get('/api/zones', async (req, res) => {
  const authorizationHeader = getAuthorizationHeader(req);
  if (!authorizationHeader) {
    return res.status(400).send('Authorization token is required');
  }

  try {
    const response = await fetch('https://api.cloudflare.com/client/v4/zones', {
      headers: {
        Authorization: authorizationHeader,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (data.success) {
      res.json(data.result);
    } else {
      res.status(500).send('Failed to fetch zones');
    }
  } catch (error) {
    res.status(500).send('Error connecting to Cloudflare API');
  }
});

// Get DNS records for a zone
app.get('/api/zones/:zoneId/dns_records', async (req, res) => {
  const authorizationHeader = getAuthorizationHeader(req);
  const zoneId = req.params.zoneId;

  if (!authorizationHeader) {
    return res.status(400).send('Authorization token is required');
  }

  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
      headers: {
        Authorization: authorizationHeader,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (data.success) {
      res.json(data.result);
    } else {
      res.status(500).send('Failed to fetch DNS records');
    }
  } catch (error) {
    res.status(500).send('Error connecting to Cloudflare API');
  }
});

// Add DNS record
app.post('/api/zones/:zoneId/dns_records', async (req, res) => {
  const authorizationHeader = getAuthorizationHeader(req);
  const zoneId = req.params.zoneId;
  const dnsRecord = req.body;

  if (!authorizationHeader) {
    return res.status(400).send('Authorization token is required');
  }

  try {
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
      method: 'POST',
      headers: {
        Authorization: authorizationHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dnsRecord),
    });

    const data = await response.json();
    if (data.success) {
      res.json(data.result);
    } else {
      res.status(500).send('Failed to add DNS record');
    }
  } catch (error) {
    res.status(500).send('Error connecting to Cloudflare API');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

