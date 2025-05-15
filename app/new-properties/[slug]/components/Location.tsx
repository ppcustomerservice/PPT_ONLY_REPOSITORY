import React from 'react';

type LocationProps = {
  latitude: string;
  longitude: string;
  address: string;
};

const Location: React.FC<LocationProps> = ({ latitude, longitude, address }) => {
  if (!latitude || !longitude) {
    return <p>Location not available.</p>;
  }

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAy38hBgh8yUTxn6-n915um1UfJU9X9A4E&q=${latitude},${longitude}`;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Location</h2>
      <p>{address}</p>
      <div style={styles.mapWrapper}>
        <iframe
          src={mapUrl}
          title="Property Location"
          style={styles.map}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 0',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#2c3e50',
    fontWeight: 'bold',
  },
  mapWrapper: {
    width: '85%',
    maxWidth: '1400px',
    height: '400px',
    overflow: 'hidden',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  map: {
    width: '100%',
    height: '100%',
    border: 0,
    borderRadius: '12px',
  },
};

export default Location;
