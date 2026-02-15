const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const twilio = require('twilio');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Twilio Configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

let twilioClient;
if (accountSid && authToken) {
    twilioClient = twilio(accountSid, authToken);
} else {
    console.warn('⚠️  Twilio credentials not configured. SMS sending will not work.');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'FirstHelp Backend Server is running',
        twilioConfigured: !!twilioClient
    });
});

// Send SOS SMS endpoint
app.post('/api/send-sos', async (req, res) => {
    try {
        const {
            userName,
            emergencyContact,
            location,
            customMessage
        } = req.body;

        // Validate required fields
        if (!emergencyContact) {
            return res.status(400).json({
                success: false,
                error: 'Emergency contact number is required'
            });
        }

        if (!twilioClient) {
            return res.status(500).json({
                success: false,
                error: 'Twilio is not configured. Please set up environment variables.'
            });
        }

        // Build the SOS message
        const timestamp = new Date().toLocaleString();
        let sosMessage = `🚨 EMERGENCY ALERT 🚨\n`;

        if (userName) {
            sosMessage += `From: ${userName}\n\n`;
        }

        sosMessage += `I NEED HELP!\n\n`;

        if (customMessage) {
            sosMessage += `Message: ${customMessage}\n\n`;
        }

        if (location && location.latitude && location.longitude) {
            const mapsLink = `https://maps.google.com/?q=${location.latitude},${location.longitude}`;
            sosMessage += `📍 Location:\n`;
            sosMessage += `Lat: ${location.latitude}\n`;
            sosMessage += `Long: ${location.longitude}\n`;
            sosMessage += `View on Map: ${mapsLink}\n\n`;
        } else {
            sosMessage += `Location: Unavailable\n\n`;
        }

        sosMessage += `Time: ${timestamp}\n\n`;
        sosMessage += `This is an automated emergency message from FirstHelp.`;

        // Send SMS via Twilio
        const message = await twilioClient.messages.create({
            body: sosMessage,
            from: twilioPhoneNumber,
            to: emergencyContact
        });

        console.log(`✅ SOS SMS sent successfully! Message SID: ${message.sid}`);

        res.json({
            success: true,
            messageSid: message.sid,
            sentTo: emergencyContact,
            message: 'SOS message sent successfully'
        });

    } catch (error) {
        console.error('❌ Error sending SOS SMS:', error);

        res.status(500).json({
            success: false,
            error: error.message || 'Failed to send SOS message',
            details: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
});

// Test endpoint to send a test SMS
app.post('/api/test-sms', async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({
                success: false,
                error: 'Phone number is required'
            });
        }

        if (!twilioClient) {
            return res.status(500).json({
                success: false,
                error: 'Twilio is not configured'
            });
        }

        const message = await twilioClient.messages.create({
            body: 'This is a test message from FirstHelp. Your emergency SMS system is working! 🚨',
            from: twilioPhoneNumber,
            to: phoneNumber
        });

        res.json({
            success: true,
            messageSid: message.sid,
            message: 'Test SMS sent successfully'
        });

    } catch (error) {
        console.error('❌ Error sending test SMS:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 FirstHelp Backend Server running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🆘 SOS endpoint: http://localhost:${PORT}/api/send-sos\n`);

    if (!twilioClient) {
        console.log('⚠️  WARNING: Twilio not configured. Please set up .env file with:');
        console.log('   - TWILIO_ACCOUNT_SID');
        console.log('   - TWILIO_AUTH_TOKEN');
        console.log('   - TWILIO_PHONE_NUMBER\n');
    } else {
        console.log('✅ Twilio configured and ready to send SMS\n');
    }
});

module.exports = app;
