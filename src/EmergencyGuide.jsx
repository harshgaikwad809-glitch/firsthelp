import { useState } from 'react';
import './EmergencyGuide.css';
import emergencyData from './emergencyData';

function EmergencyGuide() {
    const [selectedScenario, setSelectedScenario] = useState(null);
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Injury', 'Cardiac Emergency', 'Neurological Emergency', 'Breathing Emergency', 'Allergic Emergency', 'Medical Emergency'];

    const filteredScenarios = filter === 'All'
        ? emergencyData
        : emergencyData.filter(scenario => scenario.category === filter);

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'Critical': return '#E63946';
            case 'High': return '#FF6B6B';
            case 'Medium': return '#FFA500';
            case 'Low': return '#4CAF50';
            default: return '#999';
        }
    };

    return (
        <div className="emergency-guide-section">
            <div className="guide-header">
                <span className="guide-tag">Emergency Guide</span>
                <h2 className="guide-title">Learn First Aid for Common Emergencies</h2>
                <p className="guide-subtitle">
                    Step-by-step instructions with visual guides to help you respond effectively
                </p>
            </div>

            {/* Category Filter */}
            <div className="category-filters">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`filter-btn ${filter === category ? 'active' : ''}`}
                        onClick={() => setFilter(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Scenario Cards Grid */}
            <div className="scenarios-grid">
                {filteredScenarios.map(scenario => (
                    <div
                        key={scenario.id}
                        className="scenario-card"
                        onClick={() => setSelectedScenario(scenario)}
                    >
                        <div className="card-image-container">
                            <img
                                src={scenario.symptomImage}
                                alt={`${scenario.title} symptoms`}
                                className="card-image"
                            />
                            <div
                                className="severity-badge"
                                style={{ background: getSeverityColor(scenario.severity) }}
                            >
                                {scenario.severity}
                            </div>
                        </div>
                        <div className="card-content">
                            <h3>{scenario.title}</h3>
                            <p className="category-label">{scenario.category}</p>
                            <button className="learn-more-btn">
                                View Guide →
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed Modal */}
            {selectedScenario && (
                <div className="scenario-modal-overlay" onClick={() => setSelectedScenario(null)}>
                    <div className="scenario-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={() => setSelectedScenario(null)}>✕</button>

                        <div className="modal-header">
                            <h2>
                                {selectedScenario.title}
                                <span
                                    className="severity-pill"
                                    style={{ background: getSeverityColor(selectedScenario.severity) }}
                                >
                                    {selectedScenario.severity}
                                </span>
                            </h2>
                            <p className="modal-category">{selectedScenario.category}</p>
                        </div>

                        <div className="modal-content">
                            {/* Symptoms Section */}
                            <div className="modal-section">
                                <h3>🔍 Symptoms to Recognize</h3>
                                <div className="content-with-image">
                                    <div className="symptom-image-container">
                                        <img
                                            src={selectedScenario.symptomImage}
                                            alt={`${selectedScenario.title} symptoms`}
                                        />
                                    </div>
                                    <ul className="symptom-list">
                                        {selectedScenario.symptoms.map((symptom, index) => (
                                            <li key={index}>{symptom}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* First Aid Section */}
                            <div className="modal-section">
                                <h3>🚑 First Aid Steps</h3>
                                <div className="content-with-image">
                                    <div className="firstaid-image-container">
                                        <img
                                            src={selectedScenario.firstAidImage}
                                            alt={`${selectedScenario.title} first aid`}
                                        />
                                    </div>
                                    <ol className="firstaid-steps">
                                        {selectedScenario.firstAidSteps.map((step, index) => (
                                            <li key={index}>{step}</li>
                                        ))}
                                    </ol>
                                </div>
                            </div>

                            {/* Emergency Warning */}
                            <div className="emergency-warning">
                                <strong>⚠️ Important:</strong> This guide is for informational purposes only.
                                In serious emergencies, always call 911 or your local emergency number immediately.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmergencyGuide;
