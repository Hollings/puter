import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom colored markers
const createIcon = (color) => {
    return L.divIcon({
        className: 'custom-marker',
        html: `<svg width="25" height="41" viewBox="0 0 100 100">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="${color}" stroke="white"/>
        </svg>`,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
    });
};

function LocationMarker({ position, onPositionChange }) {
    useMapEvents({
        click(e) {
            onPositionChange([e.latlng.lat, e.latlng.lng]);
        },
    });

    return position ? (
        <Marker position={position} icon={createIcon('#4CAF50')}>
            <Popup>
                Search Center<br/>
                Click to find observations nearby
            </Popup>
        </Marker>
    ) : null;
}

function MapUpdater({ selectedPosition }) {
    const map = useMap();
    React.useEffect(() => {
        if (selectedPosition) {
            map.flyTo(selectedPosition, 13);
        }
    }, [selectedPosition, map]);
    return null;
}

const MapComponent = ({ selectedPosition, onPositionChange, observations = [] }) => {
    return (
        <div style={{ flex: 1, minHeight: '400px', width: '100%' }}>
            <MapContainer
                center={[40.7128, -74.0060]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker 
                    position={selectedPosition} 
                    onPositionChange={onPositionChange}
                />
                <MapUpdater selectedPosition={selectedPosition} />
                
                {observations.map((obs) => {
                    if (!obs.location) return null;
                    const [lat, lng] = obs.location.split(',').map(Number);
                    return (
                        <Marker 
                            key={obs.id} 
                            position={[lat, lng]}
                            icon={createIcon('#2196F3')}
                        >
                            <Popup>
                                <div style={{ maxWidth: '200px' }}>
                                    <strong>{obs.species_guess || 'Unknown Species'}</strong><br/>
                                    {obs.observed_on_string}<br/>
                                    <a 
                                        href={`https://www.inaturalist.org/observations/${obs.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View on iNaturalist
                                    </a>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

export default MapComponent;