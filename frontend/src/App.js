import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Input, Select, MenuItem } from '@material-ui/core';

function App() {
  const [apiToken, setApiToken] = useState('');
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [dnsRecords, setDnsRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ type: 'A', name: '', content: '' });

  // Fetch the list of zones (domains) when the API token is set
  useEffect(() => {
    if (apiToken) {
      fetchZones();
    }
  }, [apiToken]);

  const fetchZones = async () => {
    const res = await fetch('/api/zones', {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    const data = await res.json();
    setDomains(data);
  };

  const fetchDNSRecords = async (zoneId) => {
    const res = await fetch(`/api/zones/${zoneId}/dns_records`, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });
    const data = await res.json();
    setDnsRecords(data);
  };

  const addDNSRecord = async () => {
    const zoneId = selectedDomain; // Assume selectedDomain is the zone ID
    const res = await fetch(`/api/zones/${zoneId}/dns_records`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRecord),
    });
    const data = await res.json();
    setDnsRecords([...dnsRecords, data]);
  };

  return (
    <div className="App">
      <h1>Cloudflare DNS Manager</h1>
      <div>
        <Input
          type="password"
          placeholder="Enter your Cloudflare API Token"
          onChange={(e) => setApiToken(e.target.value)}
        />
      </div>
      <div>
        <Select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
        >
          {domains.map((domain) => (
            <MenuItem key={domain.id} value={domain.id}>
              {domain.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div>
        <Input
          placeholder="Record Name"
          onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
        />
        <Input
          placeholder="Record Content"
          onChange={(e) => setNewRecord({ ...newRecord, content: e.target.value })}
        />
        <Button onClick={addDNSRecord}>Add Record</Button>
      </div>
      <ul>
        {dnsRecords.map((record) => (
          <li key={record.id}>
            {record.type} - {record.name} - {record.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

