import React from 'react'

const LoadingScreenStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
}

export default function LoadingScreen() {
    return (
        <div style={LoadingScreenStyle}>
            <div className="spn"></div>
        </div>
    )
}
