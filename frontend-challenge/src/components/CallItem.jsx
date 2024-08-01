import React from 'react';

import inboundCallIcon from '../assets/inbound-call.svg';
import outboundCallIcon from '../assets/outbound-call.svg';

import "bootstrap/dist/css/bootstrap.min.css";

const CallItem = ({ call, onArchive, onSelect }) => {
    // handle individual call archiving
    const handleArchive = (e) => {
        // prevent triggering the card click event
        e.stopPropagation(); 
        onArchive(call.id, !call.is_archived);
    }

    // handle individual call detail display
    const handleClick = () => {
        onSelect(call);
    };

    // conditionally render outbound / inbound call icon
    const iconSrc = call.direction === 'inbound'
        ? inboundCallIcon
        : outboundCallIcon;

    // mapping call types to Bootstrap text color classes
    const callTypeToClass = {
        missed: 'text-danger',
        voicemail: 'text-secondary',
        answered: 'text'
    };

    // get appropriate class for the call type
    const textColor = callTypeToClass[call.call_type];

    return (
        <div onClick={handleClick} className="card mb-2">
            <div className="row card-body">
                <div className="col-20 d-flex justify-content-center align-items-center content">
                    <img id="phone-icon" src={iconSrc} alt="phone" />
                </div>
                <div className="col-60">
                    <h5 className={`card-title ${textColor}`}>+{call.from}</h5>
                    <div className="col-50">
                        <button type="button" className="btn btn-primary btn-sm" onClick={handleArchive}>
                            {call.is_archived ? "Unarchive" : "Archive"}
                        </button>
                    </div>
                </div>
                <div className="col-20 d-flex justify-content-center align-items-center content border-start">
                    <p className={`card-text ${textColor}`}>{new Date(call.created_at).toLocaleTimeString().slice(0, -3)}</p>
                </div>
            </div>
        </div>
    );
};

export default CallItem;