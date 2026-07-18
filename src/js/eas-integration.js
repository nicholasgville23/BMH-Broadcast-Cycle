/**
 * EAS/SAME Alert Integration Module
 * Handles Emergency Alert System and SAME (Specific Area Message Encoding) data
 */

class EASIntegration {
    constructor() {
        this.alerts = [];
        this.activeAlerts = [];
        this.eventCodes = this.loadEventCodes();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.fetchAlerts();
        console.log('EAS/SAME Integration Module initialized');
    }

    setupEventListeners() {
        const refreshBtn = document.getElementById('btn-refresh-alerts');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.fetchAlerts());
        }
    }

    /**
     * Load standard EAS event codes
     */
    loadEventCodes() {
        return {
            'TOR': { name: 'Tornado Warning', severity: 'Extreme', color: '#ef4444' },
            'SVR': { name: 'Severe Thunderstorm Warning', severity: 'Severe', color: '#f97316' },
            'FFW': { name: 'Flash Flood Warning', severity: 'Severe', color: '#3b82f6' },
            'FLW': { name: 'Flood Warning', severity: 'Moderate', color: '#0ea5e9' },
            'WND': { name: 'High Wind Warning', severity: 'Moderate', color: '#eab308' },
            'WNT': { name: 'Winter Storm Warning', severity: 'Moderate', color: '#06b6d4' },
            'HZW': { name: 'Hazardous Weather Outlook', severity: 'Low', color: '#8b5cf6' },
            'REC': { name: 'Record Set', severity: 'Low', color: '#10b981' },
            'WXA': { name: 'Weather Alert', severity: 'Low', color: '#6366f1' }
        };
    }

    /**
     * Fetch alerts from AWIPS or mock data
     */
    async fetchAlerts() {
        try {
            if (window.awipsIntegration && window.awipsIntegration.isConnected()) {
                console.log('Fetching alerts from AWIPS...');
                await window.awipsIntegration.refreshSevereWeatherAlerts();
            } else {
                // Use mock data for demonstration
                this.generateMockAlerts();
            }
        } catch (error) {
            console.error('Error fetching alerts:', error);
            this.generateMockAlerts();
        }
    }

    /**
     * Generate mock EAS alerts for demonstration
     */
    generateMockAlerts() {
        const mockAlerts = [
            {
                eventCode: 'SVR',
                description: 'Severe Thunderstorm Warning',
                area: 'Porter County, IN',
                issued: new Date(Date.now() - 600000).toISOString(),
                expires: new Date(Date.now() + 1800000).toISOString(),
                headline: 'Severe Thunderstorm Warning issued',
                description: 'Strong gusty winds and large hail expected',
                sameCode: 'WSVR-051161',
                urgency: 'Immediate'
            },
            {
                eventCode: 'WND',
                description: 'High Wind Warning',
                area: 'Lake County, IN',
                issued: new Date(Date.now() - 1200000).toISOString(),
                expires: new Date(Date.now() + 3600000).toISOString(),
                headline: 'High Wind Warning',
                description: 'Winds 35-45 mph with gusts up to 60 mph',
                sameCode: 'WWIND-101701',
                urgency: 'Expected'
            }
        ];

        this.alerts = mockAlerts;
        this.activeAlerts = mockAlerts.filter(alert => new Date(alert.expires) > new Date());
        this.displayAlerts();
    }

    /**
     * Parse SAME code
     */
    parseSAMECode(sameCode) {
        // Format: WXXX-SSSCCC where XXX=event, SSS=state, CCC=county
        const match = sameCode.match(/([A-Z]{1,3})([A-Z])(\d{3})(\d{3})/);
        if (match) {
            return {
                event: match[1],
                subdivision: match[2],
                stateCode: match[3],
                countyCode: match[4]
            };
        }
        return null;
    }

    /**
     * Display alerts in UI
     */
    displayAlerts() {
        const alertsList = document.getElementById('weather-alerts-list');
        if (!alertsList) return;

        alertsList.innerHTML = '';

        if (this.activeAlerts.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No active alerts';
            alertsList.appendChild(li);
            return;
        }

        this.activeAlerts.forEach(alert => {
            const eventInfo = this.eventCodes[alert.eventCode] || {};
            const li = document.createElement('li');
            li.style.borderLeftColor = eventInfo.color || '#6366f1';
            
            const issueTime = new Date(alert.issued).toLocaleTimeString();
            const expireTime = new Date(alert.expires).toLocaleTimeString();

            li.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                    <strong style="color: ${eventInfo.color}">${alert.description}</strong>
                    <span style="background-color: ${eventInfo.color}; color: white; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">
                        ${eventInfo.severity}
                    </span>
                </div>
                <div style="font-size: 0.85rem; color: #cbd5e1;">
                    <div>📍 ${alert.area}</div>
                    <div>⏰ Issued: ${issueTime} | Expires: ${expireTime}</div>
                    <div>📡 SAME: ${alert.sameCode}</div>
                    <div style="margin-top: 0.5rem; padding: 0.5rem; background-color: rgba(0,0,0,0.2); border-radius: 4px;">
                        ${alert.headline}
                    </div>
                </div>
            `;
            alertsList.appendChild(li);
        });
    }

    /**
     * Broadcast alert via EAS
     */
    broadcastAlert(alertIndex) {
        const alert = this.activeAlerts[alertIndex];
        if (!alert) return;

        console.log(`Broadcasting alert: ${alert.eventCode} - ${alert.description}`);
        
        // Text-to-speech announcement
        if (window.ttsEngine) {
            const announcement = `This is an alert from the National Weather Service. ${alert.headline}. ${alert.description}`;
            window.ttsEngine.speak(announcement);
        }

        // Send confirmation to AWIPS
        if (window.awipsIntegration) {
            window.awipsIntegration.sendBroadcastConfirmation('eas-alert', {
                eventCode: alert.eventCode,
                description: alert.description,
                area: alert.area,
                sameCode: alert.sameCode
            });
        }
    }

    /**
     * Get alert statistics
     */
    getStatistics() {
        return {
            totalAlerts: this.alerts.length,
            activeAlerts: this.activeAlerts.length,
            byEventCode: this.groupAlertsByEvent(),
            bySeverity: this.groupAlertsBySeverity()
        };
    }

    /**
     * Group alerts by event code
     */
    groupAlertsByEvent() {
        const grouped = {};
        this.activeAlerts.forEach(alert => {
            grouped[alert.eventCode] = (grouped[alert.eventCode] || 0) + 1;
        });
        return grouped;
    }

    /**
     * Group alerts by severity
     */
    groupAlertsBySeverity() {
        const grouped = {};
        this.activeAlerts.forEach(alert => {
            const eventInfo = this.eventCodes[alert.eventCode] || {};
            const severity = eventInfo.severity || 'Unknown';
            grouped[severity] = (grouped[severity] || 0) + 1;
        });
        return grouped;
    }

    /**
     * Get alerts for specific area
     */
    getAlertsForArea(area) {
        return this.activeAlerts.filter(alert => alert.area.includes(area));
    }

    /**
     * Check if area has active alerts
     */
    hasActiveAlerts(area) {
        return this.getAlertsForArea(area).length > 0;
    }
}

// Initialize EAS Integration Module
let easIntegration;
document.addEventListener('DOMContentLoaded', () => {
    easIntegration = new EASIntegration();
    window.easIntegration = easIntegration;
});
