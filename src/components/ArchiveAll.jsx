import React from 'react';

const ArchiveAll = ({ onArchiveAll, onUnarchiveAll, isArchivedFeed }) => {
    return (
        <div className="archive-all-container">
            <div className="card d-flex justify-content-center align-items-center p-3">
                <button
                    onClick={isArchivedFeed ? onUnarchiveAll : onArchiveAll}
                    className="btn btn-primary"
                >
                    {isArchivedFeed ? 'Unarchive All Calls' : 'Archive All Calls'}
                </button>
            </div>
        </div>
    );

};

export default ArchiveAll 