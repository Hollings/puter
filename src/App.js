import React, { useState } from 'react';
import axios from 'axios';
import MapComponent from './components/MapComponent';
import SearchForm from './components/SearchForm';
import Results from './components/Results';
import './App.css';

function App() {
  const [observationId, setObservationId] = useState('');
  const [radius, setRadius] = useState(10);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let params = {};
      
      if (observationId) {
        // If ID is provided, search by ID
        params.id = observationId;
      } else if (selectedPosition) {
        // If position is selected, search by location and radius
        params = {
          lat: selectedPosition[0],
          lng: selectedPosition[1],
          radius: radius,
          order_by: 'observed_on',
          per_page: 10,
          photos: true
        };
      } else {
        setError('Please enter an observation ID or select a location on the map');
        setLoading(false);
        return;
      }

      const response = await axios.get(`https://api.inaturalist.org/v1/observations`, {
        params,
        headers: {
          'Accept': 'application/json',
          'Authorization': `JWT ${process.env.REACT_APP_INAT_TOKEN}`
        }
      });

      if (response.data.results && response.data.results.length > 0) {
        setObservations(response.data.results);
        
        // If searching by ID, center map on the observation
        if (observationId && response.data.results[0].location) {
          const [lat, lng] = response.data.results[0].location.split(',').map(Number);
          setSelectedPosition([lat, lng]);
        }
      } else {
        setError('No observations found');
      }
    } catch (err) {
      setError('Error fetching observations: ' + err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1 style={{ color: '#4CAF50', marginBottom: '30px', textAlign: 'center' }}>🌿 iNaturalist Explorer</h1>
      
      <div style={{ display: 'flex', gap: '20px', height: 'calc(100vh - 120px)' }}>
        {/* Left Column - Map and Form */}
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', minWidth: '500px' }}>
          <SearchForm
            observationId={observationId}
            radius={radius}
            onIdChange={setObservationId}
            onRadiusChange={setRadius}
            onSubmit={handleSearch}
            style={{ marginBottom: '20px' }}
          />

          <MapComponent
            selectedPosition={selectedPosition}
            onPositionChange={setSelectedPosition}
            observations={observations}
          />

          {error && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              {error}
            </div>
          )}
        </div>

        {/* Right Column - Results */}
        <div style={{ flex: '1', overflowY: 'auto', paddingRight: '10px' }}>
          {loading ? (
            <div>Loading observations...</div>
          ) : (
            <Results observations={observations} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
