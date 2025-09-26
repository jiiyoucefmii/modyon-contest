'use client';

import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  referralCode: string;
  entries: number;
  referredBy?: string;
  createdAt: Date;
}

interface AdminStats {
  totalUsers: number;
  totalEntries: number;
  totalReferrals: number;
  users: User[];
}

export default function AdminPanel() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedWinner, setSelectedWinner] = useState<User | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/giveaway/admin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectRandomWinner = () => {
    if (!stats?.users.length) return;

    // Create weighted array based on entries
    const weightedUsers: User[] = [];
    stats.users.forEach(user => {
      for (let i = 0; i < user.entries; i++) {
        weightedUsers.push(user);
      }
    });

    const randomIndex = Math.floor(Math.random() * weightedUsers.length);
    setSelectedWinner(weightedUsers[randomIndex]);
  };

  const exportData = () => {
    if (!stats) return;

    const csvContent = [
      ['Email', 'Referral Code', 'Entries', 'Referred By', 'Created At'],
      ...stats.users.map(user => [
        user.email,
        user.referralCode,
        user.entries.toString(),
        user.referredBy || '',
        user.createdAt.toString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'giveaway-participants.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return <div style={{ padding: '2rem', color: '#fff' }}>Loading admin panel...</div>;
  }

  if (!stats) {
    return <div style={{ padding: '2rem', color: '#fff' }}>Failed to load stats</div>;
  }

  return (
    <div style={{ 
      padding: '2rem', 
      background: 'rgba(0, 0, 0, 0.8)', 
      color: '#fff',
      minHeight: '100vh'
    }}>
      <h1>Giveaway Admin Panel</h1>
      
      {/* Stats Overview */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '1rem', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>Total Participants</h3>
          <p style={{ fontSize: '2rem', margin: 0, color: '#00d4ff' }}>{stats.totalUsers}</p>
        </div>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '1rem', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>Total Entries</h3>
          <p style={{ fontSize: '2rem', margin: 0, color: '#00d4ff' }}>{stats.totalEntries}</p>
        </div>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '1rem', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>Total Referrals</h3>
          <p style={{ fontSize: '2rem', margin: 0, color: '#00d4ff' }}>{stats.totalReferrals}</p>
        </div>
      </div>

      {/* Actions */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          onClick={selectRandomWinner}
          style={{
            background: '#00d4ff',
            color: '#000',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Select Random Winner
        </button>
        <button
          onClick={exportData}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Export Data (CSV)
        </button>
      </div>

      {/* Winner Display */}
      {selectedWinner && (
        <div style={{
          background: 'rgba(0, 212, 255, 0.2)',
          border: '2px solid #00d4ff',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <h2>🎉 Selected Winner!</h2>
          <p><strong>Email:</strong> {selectedWinner.email}</p>
          <p><strong>Entries:</strong> {selectedWinner.entries}</p>
          <p><strong>Referral Code:</strong> {selectedWinner.referralCode}</p>
        </div>
      )}

      {/* Participants Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          background: 'rgba(255, 255, 255, 0.05)'
        }}>
          <thead>
            <tr style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Email</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Referral Code</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Entries</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Referred By</th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {stats.users.map((user, index) => (
              <tr key={user.id} style={{ 
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.02)' : 'transparent'
              }}>
                <td style={{ padding: '0.75rem' }}>{user.email}</td>
                <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: '#00d4ff' }}>{user.referralCode}</td>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{user.entries}</td>
                <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.9rem' }}>{user.referredBy || '-'}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.9rem' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}