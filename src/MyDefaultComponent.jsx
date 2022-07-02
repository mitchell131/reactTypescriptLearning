import React from 'react';

export const NamedComponent = () => {
    return (
        <React.Fragment>
            Named Component
        </React.Fragment>
    )
}

const MyDefaultComponent = () => {
    return (
        <div>
            <h2>My default component</h2>
        </div>
    );
}

export default MyDefaultComponent;
