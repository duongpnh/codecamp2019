import React from 'react';
import './index.scss'

const Loading = () => {
    return (
        <div className="spinner-border text-primary custom-spinner" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
}

export default Loading;
