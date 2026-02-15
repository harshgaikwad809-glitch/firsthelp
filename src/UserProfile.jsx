
import { useState, useEffect } from 'react';
import './UserProfile.css';

function UserProfile({ onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        emergencyContact: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [hasProfile, setHasProfile] = useState(false);

    // Load saved profile data on mount
    useEffect(() => {
        const savedProfile = localStorage.getItem('firsthelp_user_profile');
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            setFormData(profile);
            setHasProfile(true);
            setIsEditing(false); // Show profile view by default
        } else {
            setHasProfile(false);
            setIsEditing(true); // Show registration form if no profile
        }
    }, []);

    // Validation functions
    const validateName = (name) => {
        if (!name.trim()) return 'Name is required';
        if (name.length < 2) return 'Name must be at least 2 characters';
        return '';
    };

    const validatePhone = (phone) => {
        if (!phone.trim()) return 'Phone number is required';
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
            return 'Please enter a valid 10-digit phone number';
        }
        return '';
    };

    const validateEmail = (email) => {
        if (!email.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    const validateEmergencyContact = (contact) => {
        if (!contact.trim()) return 'Emergency contact is required';
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(contact.replace(/[\s-]/g, ''))) {
            return 'Please enter a valid 10-digit emergency contact';
        }
        return '';
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {
            name: validateName(formData.name),
            phone: validatePhone(formData.phone),
            email: validateEmail(formData.email),
            emergencyContact: validateEmergencyContact(formData.emergencyContact)
        };

        // Remove empty error messages
        Object.keys(newErrors).forEach(key => {
            if (!newErrors[key]) delete newErrors[key];
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Save to localStorage
        localStorage.setItem('firsthelp_user_profile', JSON.stringify(formData));

        // Update states
        setHasProfile(true);
        setIsEditing(false);

        // Show success message
        setIsSubmitted(true);

        // Auto-close after 2 seconds
        setTimeout(() => {
            setIsSubmitted(false);
        }, 2000);
    };

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout and clear your profile?')) {
            localStorage.removeItem('firsthelp_user_profile');
            setFormData({
                name: '',
                phone: '',
                email: '',
                emergencyContact: ''
            });
            setHasProfile(false);
            setIsEditing(true);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    if (isSubmitted) {
        return (
            <div className="profile-overlay" onClick={() => setIsSubmitted(false)}>
                <div className="profile-modal success-modal" onClick={(e) => e.stopPropagation()}>
                    <div className="success-icon">✓</div>
                    <h2>Profile Saved!</h2>
                    <p>Your information has been securely saved.</p>
                </div>
            </div>
        );
    }

    // Profile View Mode (when user is logged in)
    if (hasProfile && !isEditing) {
        return (
            <div className="profile-overlay" onClick={onClose}>
                <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                    <button className="close-btn" onClick={onClose}>✕</button>

                    <div className="profile-header">
                        <div className="profile-avatar">
                            {formData.name.charAt(0).toUpperCase()}
                        </div>
                        <h2>👤 Profile</h2>
                        <p className="profile-subtitle">Your emergency information</p>
                    </div>

                    <div className="profile-info-display">
                        <div className="profile-info-item">
                            <span className="profile-info-label">Full Name</span>
                            <span className="profile-info-value">{formData.name}</span>
                        </div>

                        <div className="profile-info-item">
                            <span className="profile-info-label">Phone Number</span>
                            <span className="profile-info-value">{formData.phone}</span>
                        </div>

                        <div className="profile-info-item">
                            <span className="profile-info-label">Email Address</span>
                            <span className="profile-info-value">{formData.email}</span>
                        </div>

                        <div className="profile-info-item">
                            <span className="profile-info-label">Emergency Contact</span>
                            <span className="profile-info-value">{formData.emergencyContact}</span>
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button className="edit-profile-btn" onClick={handleEdit}>
                            ✏️ Edit Profile
                        </button>
                        <button className="logout-btn" onClick={handleLogout}>
                            🚪 Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Registration/Edit Form Mode
    return (
        <div className="profile-overlay" onClick={onClose}>
            <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✕</button>

                <div className="profile-header">
                    <h2>👤 {hasProfile ? 'Edit Profile' : 'User Profile'}</h2>
                    <p className="profile-subtitle">
                        {hasProfile ? 'Update your emergency information' : 'Register your information for emergency situations'}
                    </p>
                </div>

                <form className="profile-form" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="form-group">
                        <label htmlFor="name">
                            Full Name <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    {/* Phone Field */}
                    <div className="form-group">
                        <label htmlFor="phone">
                            Phone Number <span className="required">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="10-digit phone number"
                            className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>

                    {/* Email Field */}
                    <div className="form-group">
                        <label htmlFor="email">
                            Email Address <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    {/* Emergency Contact Field */}
                    <div className="form-group">
                        <label htmlFor="emergencyContact">
                            Emergency Contact Number <span className="required">*</span>
                        </label>
                        <input
                            type="tel"
                            id="emergencyContact"
                            name="emergencyContact"
                            value={formData.emergencyContact}
                            onChange={handleChange}
                            placeholder="Emergency contact phone number"
                            className={errors.emergencyContact ? 'error' : ''}
                        />
                        {errors.emergencyContact && <span className="error-message">{errors.emergencyContact}</span>}
                    </div>

                    {/* Privacy Notice */}
                    <div className="privacy-notice">
                        🔒 Your information is stored locally on your device and is never shared.
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-btn">
                        💾 {hasProfile ? 'Update Profile' : 'Save Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserProfile;
