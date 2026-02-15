import { useState, useEffect, useRef } from 'react';
import './CPRTimer.css';

function CPRTimer({ onClose }) {
    const [isRunning, setIsRunning] = useState(false);
    const [phase, setPhase] = useState('compressions'); // 'compressions' or 'breaths'
    const [count, setCount] = useState(0); // Current count in phase
    const [cycleCount, setCycleCount] = useState(0); // Total cycles completed
    const [totalTime, setTotalTime] = useState(0); // Total elapsed seconds
    const [compressionRate] = useState(110); // BPM (beats per minute)

    const audioContextRef = useRef(null);
    const intervalRef = useRef(null);
    const timeIntervalRef = useRef(null);

    // Calculate beat interval in milliseconds (for metronome)
    const beatInterval = (60 / compressionRate) * 1000;

    // Play beep sound
    const playBeep = (frequency = 800, duration = 50) => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        const ctx = audioContextRef.current;
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration / 1000);
    };

    // Handle phase transitions and counting
    useEffect(() => {
        if (!isRunning) return;

        if (phase === 'compressions') {
            // Compression phase: count to 30
            intervalRef.current = setInterval(() => {
                setCount(prevCount => {
                    const newCount = prevCount + 1;
                    playBeep(800, 50); // Regular beep for compressions

                    if (newCount >= 30) {
                        // Switch to breath phase
                        setPhase('breaths');
                        playBeep(1200, 200); // Higher, longer beep for phase change
                        return 0;
                    }
                    return newCount;
                });
            }, beatInterval);
        } else {
            // Breath phase: count to 2 (slower)
            intervalRef.current = setInterval(() => {
                setCount(prevCount => {
                    const newCount = prevCount + 1;
                    playBeep(400, 300); // Lower, longer beep for breaths

                    if (newCount >= 2) {
                        // Complete cycle, return to compressions
                        setCycleCount(prev => prev + 1);
                        setPhase('compressions');
                        playBeep(1000, 400); // Different beep for cycle completion
                        return 0;
                    }
                    return newCount;
                });
            }, 3000); // 3 seconds per breath
        }

        return () => clearInterval(intervalRef.current);
    }, [isRunning, phase, beatInterval]);

    // Track total time
    useEffect(() => {
        if (!isRunning) return;

        timeIntervalRef.current = setInterval(() => {
            setTotalTime(prev => prev + 1);
        }, 1000);

        return () => clearInterval(timeIntervalRef.current);
    }, [isRunning]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setIsRunning(false);
        setPhase('compressions');
        setCount(0);
        setCycleCount(0);
        setTotalTime(0);
    };

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Calculate progress percentage for visual bar
    const progressPercentage = phase === 'compressions'
        ? (count / 30) * 100
        : (count / 2) * 100;

    return (
        <div className="cpr-timer-overlay" onClick={onClose}>
            <div className="cpr-timer-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✕</button>

                <div className="cpr-timer-header">
                    <h2>🚨 CPR Emergency Timer</h2>
                    <p className="timer-subtitle">Follow the audio and visual cues</p>
                </div>

                <div className="timer-display">
                    <div className="elapsed-time">
                        <span className="time-label">Elapsed Time</span>
                        <span className="time-value">{formatTime(totalTime)}</span>
                    </div>

                    <div className="cycle-counter">
                        <span className="cycle-label">Cycles Completed</span>
                        <span className="cycle-value">{cycleCount}</span>
                    </div>
                </div>

                <div className={`phase-indicator ${phase}`}>
                    <div className="phase-content">
                        {phase === 'compressions' ? (
                            <>
                                <div className="phase-icon">🫸</div>
                                <h3>COMPRESSIONS</h3>
                                <p className="phase-instruction">Push hard and fast on chest center</p>
                                <div className="count-display">{count} / 30</div>
                            </>
                        ) : (
                            <>
                                <div className="phase-icon">💨</div>
                                <h3>RESCUE BREATHS</h3>
                                <p className="phase-instruction">Give 2 rescue breaths</p>
                                <div className="count-display">{count} / 2</div>
                            </>
                        )}
                    </div>

                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>

                <div className="info-panel">
                    <div className="info-item">
                        <span className="info-icon">⚡</span>
                        <span className="info-text">Rate: {compressionRate} bpm</span>
                    </div>
                    <div className="info-item">
                        <span className="info-icon">📏</span>
                        <span className="info-text">Depth: 5-6 cm (2-2.4 in)</span>
                    </div>
                </div>

                <div className="timer-controls">
                    {!isRunning ? (
                        <button className="control-btn start-btn" onClick={handleStart}>
                            ▶ Start CPR
                        </button>
                    ) : (
                        <button className="control-btn pause-btn" onClick={handlePause}>
                            ⏸ Pause
                        </button>
                    )}
                    <button className="control-btn reset-btn" onClick={handleReset}>
                        ↻ Reset
                    </button>
                </div>

                <div className="emergency-notice">
                    ⚠️ Call emergency services (911) immediately before starting CPR
                </div>
            </div>
        </div>
    );
}

export default CPRTimer;
