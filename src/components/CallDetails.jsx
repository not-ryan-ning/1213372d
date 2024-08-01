import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css"

const CallDetails = ({ call }) => {
    const formattedDate = new Date(call.created_at).toLocaleString();
    const duration = `${Math.floor(call.duration / 60)}m ${call.duration % 60}s`;
    
    return (
        <div className="card mb-2">
            <div className="card-body">
                <h5 className="card-title">{`From: +${call.from}`}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{`To: +${call.to}`}</h6>
                <p className="card-text">{`Via: +${call.via}`}</p>
                <p className="card-text">{`Duration: ${duration}`}</p>
                <p className="card-text">{`Call Type: ${call.call_type}`}</p>
                <p className="card-text">{`Direction: ${call.direction}`}</p>
                <p className="card-text">{`Date: ${formattedDate}`}</p>
                <p className="card-text">{`Archived: ${call.is_archived ? 'Yes' : 'No'}`}</p>
            </div>
        </div>

    );

};

export default CallDetails