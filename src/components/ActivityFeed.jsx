import React, { useState, useEffect } from 'react';
import CallItem from './CallItem';
import CallDetails from './CallDetails';
import ArchiveAll from './ArchiveAll';
import "bootstrap/dist/css/bootstrap.min.css";

const ActivityFeed = ({ archived }) => {
  const [calls, setCalls] = useState([]);
  const [selectedCallId, setSelectedCallId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // fetch new calls when archive button clicked
  useEffect(() => {
    setLoading(true);
    fetchCalls();
  }, [archived]);

  // api call to server to fetch call data 
  const fetchCalls = () => {
    fetch('https://aircall-backend.onrender.com/activities')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const filteredCalls = data.filter(call => call.is_archived === archived);
        setCalls(filteredCalls);
        setLoading(false);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError(error);
        setLoading(false);
      });
  };

  // archive / unarchive call
  const handleArchive = (id, isArchived) => {
    const body = JSON.stringify({ is_archived: isArchived });

    fetch(`https://aircall-backend.onrender.com/activities/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { throw new Error(text) });
        }
        setCalls(prevCalls => prevCalls.filter(call => call.id !== id));
      })
      .catch(error => {
        console.error('Error updating call:', error);
        setError(error);
      });
  };

  // archive all calls 
  const handleArchiveAll = () => {
    const body = { is_archived: true };

    const requests = calls.map(call =>
      fetch(`https://aircall-backend.onrender.com/activities/${call.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    );

    Promise.all(requests)
      .then(responses => {
        if (responses.some(response => !response.ok)) {
          throw new Error('Some requests failed');
        }
        fetchCalls();
      })
      .catch(error => {
        console.error('Error archiving all calls:', error);
        setError(error);
      });
  };

  // unarchive all calls 
  const handleUnarchiveAll = () => {
    const body = { is_archived: false };

    const requests = calls.map(call =>
      fetch(`https://aircall-backend.onrender.com/activities/${call.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
    );

    Promise.all(requests)
      .then(responses => {
        if (responses.some(response => !response.ok)) {
          throw new Error('Some requests failed');
        }
        fetchCalls();
      })
      .catch(error => {
        console.error('Error unarchiving all calls:', error);
        setError(error);
      });
  };

  // display individual call details 
  const handleSelectCall = (call) => {
    setSelectedCallId(prevId => (prevId === call.id ? null : call.id));
  };

  // filter calls based on archived or not
  const groupedCalls = calls.reduce((acc, call) => {
    const date = new Date(call.created_at).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(call);
    return acc;
  }, {});

  return (
    <div className="container">
      {/* conditionally render error messages */}
      {error && <div className="alert alert-danger">{error.message}</div>} 
      <div className="row">
        <div className="col-sm">
          <div className="activity-feed">
            <ArchiveAll onArchiveAll={handleArchiveAll} onUnarchiveAll={handleUnarchiveAll} isArchivedFeed={archived} />
            {/* conditionally render loading message */}
            {loading && <div>Loading...</div>} 
            {Object.keys(groupedCalls).map(date => (
              <div key={date}>
                <div className="date-container">
                  <h2 className="date mb-3 mt-3">{date}</h2>
                </div>
                {groupedCalls[date].map(call => (
                  <div key={call.id}>
                    {/* create a call item for each call */}
                    <CallItem call={call} onArchive={handleArchive} onSelect={handleSelectCall} />
                    {/* conditionally render call details card */}
                    {selectedCallId === call.id && (
                      <div className="call-details-container">
                        <CallDetails call={call} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
