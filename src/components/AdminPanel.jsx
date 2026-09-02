import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    fetch('/api/admin/stats', {
      headers: { Authorization: `Bearer ${user.token}` }
    })
      .then(async res => {
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setStats(data);
      })
      .catch(err => {
        console.warn('Backend unavailable, using dummy stats for offline mode:', err);
        setStats({ totalUsers: 42, totalVehicles: 15, totalRooms: 28, totalBookings: 8 });
      });
  }, [user, navigate]);

  if (!stats) return <div className="shell" style={{padding: '100px 0'}}>Loading Admin Panel...</div>;

  return (
    <div className="shell" style={{padding: '80px 0'}}>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '30px' }}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', minWidth: '150px' }}>
          <h3>Total Users</h3>
          <p style={{fontSize: '2rem'}}>{stats.totalUsers}</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', minWidth: '150px' }}>
          <h3>Total Vehicles</h3>
          <p style={{fontSize: '2rem'}}>{stats.totalVehicles}</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', minWidth: '150px' }}>
          <h3>Total Rooms</h3>
          <p style={{fontSize: '2rem'}}>{stats.totalRooms}</p>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', minWidth: '150px' }}>
          <h3>Total Bookings</h3>
          <p style={{fontSize: '2rem'}}>{stats.totalBookings}</p>
        </div>
      </div>
    </div>
  );
}
