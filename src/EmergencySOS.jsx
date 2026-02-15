import { useState, useEffect, useRef } from 'react';
import './EmergencySOS.css';

function EmergencySOS({ onClose }) {
    const [countdown, setCountdown] = useState(5);
    const [isActivated, setIsActivated] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const audioRef = useRef(null);

    // Load user profile data
    useEffect(() => {
        const savedProfile = localStorage.getItem('firsthelp_user_profile');
        if (savedProfile) {
            setUserProfile(JSON.parse(savedProfile));
        }
    }, []);

    // Get user's current location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    console.log('Location access denied:', error);
                }
            );
        }
    }, []);

    // Countdown timer before activation
    useEffect(() => {
        if (!isActivated && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (!isActivated && countdown === 0) {
            activateSOS();
        }
    }, [countdown, isActivated]);

    // Play alarm sound
    const playAlarm = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(err => console.log('Audio play failed:', err));
        }
    };

    const activateSOS = async () => {
        setIsActivated(true);
        playAlarm();

        // Automatically send SOS message via backend API
        if (userProfile?.emergencyContact) {
            try {
                // Send request to backend
                const response = await fetch('http://localhost:5000/api/send-sos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userName: userProfile.name,
                        emergencyContact: userProfile.emergencyContact,
                        location: currentLocation,
                        customMessage: ''
                    })
                });

                const data = await response.json();

                if (data.success) {
                    console.log('✅ SOS SMS sent automatically via backend!');
                } else {
                    console.error('❌ Backend SMS failed:', data.error);
                    // Fallback to browser SMS
                    setTimeout(() => {
                        sendSOSMessage();
                    }, 500);
                }
            } catch (error) {
                console.error('❌ Error calling backend:', error);
                // Fallback to browser SMS
                setTimeout(() => {
                    sendSOSMessage();
                }, 500);
            }
        }
    };

    const cancelSOS = () => {
        setCountdown(5);
        setIsActivated(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        onClose();
    };

    const call911 = () => {
        window.location.href = 'tel:911';
    };

    const callEmergencyContact = () => {
        if (userProfile?.emergencyContact) {
            window.location.href = `tel:${userProfile.emergencyContact}`;
        }
    };

    const sendSOSMessage = () => {
        if (userProfile?.emergencyContact) {
            const message = `EMERGENCY! I need help. My location: ${currentLocation
                ? `https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`
                : 'Location unavailable'
                }`;

            // Open SMS app with pre-filled message
            window.location.href = `sms:${userProfile.emergencyContact}?body=${encodeURIComponent(message)}`;
        } else {
            alert('No emergency contact registered. Please register your emergency contact in the Login section.');
        }
    };

    const shareLocation = () => {
        if (currentLocation) {
            const mapsUrl = `https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`;
            window.open(mapsUrl, '_blank');
        } else {
            alert('Location not available. Please enable location services.');
        }
    };

    return (
        <div className="sos-overlay" onClick={isActivated ? null : cancelSOS}>
            <div className="sos-modal" onClick={(e) => e.stopPropagation()}>
                {/* Alarm audio element */}
                <audio ref={audioRef} loop>
                    <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiO1PLMe..." />
                </audio>

                {!isActivated ? (
                    // Countdown Screen
                    <div className="sos-countdown">
                        <div className="countdown-circle">
                            <div className="countdown-number">{countdown}</div>
                        </div>
                        <h2>🚨 Emergency SOS Activating...</h2>
                        <p className="countdown-message">
                            Emergency services will be contacted in {countdown} seconds
                        </p>
                        <button className="cancel-btn" onClick={cancelSOS}>
                            Cancel Emergency Call
                        </button>
                    </div>
                ) : (
                    // Active SOS Screen
                    <div className="sos-active">
                        <button className="sos-close-btn" onClick={cancelSOS}>✕</button>

                        <div className="sos-header">
                            <div className="sos-pulse">🚨</div>
                            <h2>EMERGENCY SOS ACTIVATED</h2>
                            <p className="sos-status">Help is on the way</p>

                            {/* Auto-send notification */}
                            {userProfile?.emergencyContact && (
                                <div className="auto-send-notice">
                                    ✅ SOS message automatically sent to emergency contact
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="sos-actions">
                            <button className="sos-action-btn primary" onClick={call911}>
                                <span className="action-icon">📞</span>
                                <span className="action-label">Call 911</span>
                            </button>

                            {userProfile?.emergencyContact && (
                                <>
                                    <button className="sos-action-btn secondary" onClick={callEmergencyContact}>
                                        <span className="action-icon">👤</span>
                                        <span className="action-label">Call Emergency Contact</span>
                                    </button>

                                    <button className="sos-action-btn secondary" onClick={sendSOSMessage}>
                                        <span className="action-icon">💬</span>
                                        <span className="action-label">Send SOS Message</span>
                                    </button>
                                </>
                            )}

                            <button className="sos-action-btn tertiary" onClick={shareLocation}>
                                <span className="action-icon">📍</span>
                                <span className="action-label">Share Location</span>
                            </button>
                        </div>

                        {/* User Information */}
                        {userProfile && (
                            <div className="user-info-card">
                                <h3>Emergency Contact Information</h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <span className="info-label">Name:</span>
                                        <span className="info-value">{userProfile.name}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Phone:</span>
                                        <span className="info-value">{userProfile.phone}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Emergency Contact:</span>
                                        <span className="info-value">{userProfile.emergencyContact}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Location Info */}
                        {currentLocation && (
                            <div className="location-info">
                                <p className="location-label">📍 Current Location:</p>
                                <p className="location-coords">
                                    Lat: {currentLocation.lat.toFixed(6)}, Lng: {currentLocation.lng.toFixed(6)}
                                </p>
                            </div>
                        )}

                        {/* Safety Instructions */}
                        <div className="sos-instructions">
                            <h4>While waiting for help:</h4>
                            <ul>
                                <li>Stay calm and in a safe location if possible</li>
                                <li>Keep your phone nearby and charged</li>
                                <li>Do not hang up if you called emergency services</li>
                                <li>Follow dispatcher instructions carefully</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmergencySOS;
