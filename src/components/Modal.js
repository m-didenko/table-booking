import React from 'react';
import './Modal.css';

const Modal = ({ title, message, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{title}</h2>
                <p>{message}</p>
                <button onClick={onClose} className="reservations-button">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
