import React from 'react';

const Results = ({ observations }) => {
    if (!observations || observations.length === 0) {
        return <div>No observations found</div>;
    }

    return (
        <div style={{ marginTop: '20px' }}>
            <h2>Observations</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {observations.map(obs => (
                    <div 
                        key={obs.id} 
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '15px',
                            backgroundColor: '#f9f9f9'
                        }}
                    >
                        {obs.photos && obs.photos[0] && (
                            <img 
                                src={obs.photos[0].url} 
                                alt={obs.species_guess || 'Observation photo'} 
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover',
                                    borderRadius: '4px',
                                    marginBottom: '10px'
                                }}
                            />
                        )}
                        <h3>{obs.species_guess || 'Unknown Species'}</h3>
                        <p>Date: {new Date(obs.created_at).toLocaleDateString()}</p>
                        <p>Location: {obs.place_guess || 'Unknown location'}</p>
                        <a 
                            href={`https://www.inaturalist.org/observations/${obs.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: '#4CAF50',
                                textDecoration: 'none',
                                fontWeight: 'bold'
                            }}
                        >
                            View on iNaturalist
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Results;