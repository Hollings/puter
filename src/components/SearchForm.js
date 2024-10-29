import React from 'react';

const SearchForm = ({ observationId, radius, onIdChange, onRadiusChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                <div style={{ marginBottom: '5px', color: '#666' }}>
                    Search by ID or click on the map to find nearby observations
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div>
                        <label htmlFor="observationId" style={{ marginRight: '10px', display: 'inline-block', width: '120px' }}>
                            Observation ID:
                        </label>
                        <input
                            type="text"
                            id="observationId"
                            value={observationId}
                            onChange={(e) => onIdChange(e.target.value)}
                            placeholder="Optional"
                            style={{ width: '150px', padding: '5px' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="radius" style={{ marginRight: '10px', display: 'inline-block', width: '100px' }}>
                            Search Radius:
                        </label>
                        <input
                            type="number"
                            id="radius"
                            value={radius}
                            onChange={(e) => onRadiusChange(e.target.value)}
                            min="0"
                            step="1"
                            style={{ width: '80px', padding: '5px' }}
                        />
                    </div>
                </div>
            </div>
            </div>

            <button 
                type="submit"
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Search
            </button>
        </form>
    );
};

export default SearchForm;