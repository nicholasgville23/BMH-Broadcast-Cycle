/**
 * AWIPS Integration Module
 * Handles integration with AWIPS CAVE D2D and API endpoints
 */

class AWIPSIntegration {
    constructor() {
        this.apiBaseUrl = 'http://localhost:8080/awips'; // Default AWIPS server
        this.connected = false;
        this.stationId = 'WNG689';
        this.init();
    }

    init() {
        this.checkConnection();
        this.setupEventListeners();
        console.log('AWIPS Integration Module initialized');
    }

    checkConnection() {
        // Attempt to connect to AWIPS server
        this.getServerStatus()
            .then(status => {
                this.connected = true;
                console.log('Connected to AWIPS server:', status);
            })
            .catch(error => {
                this.connected = false;
                console.warn('AWIPS server not available:', error);
            });
    }

    setupEventListeners() {
        const updateHazardBtn = document.getElementById('btn-update-hazard');
        const refreshAlertsBtn = document.getElementById('btn-refresh-alerts');

        if (updateHazardBtn) {
            updateHazardBtn.addEventListener('click', () => this.updateHazardOutlook());
        }
        if (refreshAlertsBtn) {
            refreshAlertsBtn.addEventListener('click', () => this.refreshSevereWeatherAlerts());
        }
    }

    /**
     * Get AWIPS server status
     */
    async getServerStatus() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/status`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Failed to get AWIPS server status:', error);
            throw error;
        }
    }

    /**
     * Update Hazardous Weather Outlook from AWIPS
     */
    async updateHazardOutlook() {
        try {
            console.log('Fetching Hazardous Weather Outlook from AWIPS...');
            
            const response = await fetch(`${this.apiBaseUrl}/hazard-outlook`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Station-ID': this.stationId
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.displayHazardOutlook(data);
            console.log('Hazard Outlook updated successfully');

        } catch (error) {
            console.error('Error updating Hazard Outlook:', error);
            this.displayHazardOutlookOffline();
        }
    }

    /**
     * Display Hazard Outlook in UI
     */
    displayHazardOutlook(data) {
        const textArea = document.getElementById('hazard-text');
        if (!textArea) return;

        textArea.value = `
Office: ${data.office || 'Chicago/Romeoville'}
ICAO: ${data.icao || 'KLOT'}
Zone: ${data.zone || 'LOT'}
Issued: ${data.issued || new Date().toISOString()}

${data.text || 'No hazard information available'}
        `.trim();
    }

    /**
     * Display offline Hazard Outlook
     */
    displayHazardOutlookOffline() {
        const textArea = document.getElementById('hazard-text');
        if (!textArea) return;

        textArea.value = `
Office: Chicago/Romeoville (Offline)
ICAO: KLOT
Zone: LOT

(AWIPS server not available - displaying cached/placeholder content)

Sample Hazardous Weather Outlook:
This hazardous weather outlook is issued for the National Weather Service Chicago office area.
        `.trim();
    }

    /**
     * Refresh Severe Weather Alerts from EAS integration
     */
    async refreshSevereWeatherAlerts() {
        try {
            console.log('Fetching severe weather alerts from AWIPS...');
            
            const response = await fetch(`${this.apiBaseUrl}/alerts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Station-ID': this.stationId
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.displayAlerts(data.alerts || []);
            console.log(`Retrieved ${data.alerts.length} alert(s)`);

        } catch (error) {
            console.error('Error refreshing alerts:', error);
            this.displayAlertsOffline();
        }
    }

    /**
     * Display alerts in UI
     */
    displayAlerts(alerts) {
        const alertsList = document.getElementById('weather-alerts-list');
        if (!alertsList) return;

        alertsList.innerHTML = '';

        if (alerts.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No active alerts';
            alertsList.appendChild(li);
            return;
        }

        alerts.forEach(alert => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${alert.type}</strong> - ${alert.area}
                <div style="font-size: 0.85rem; color: #999;">
                    Valid: ${alert.valid} to ${alert.expires}
                </div>
            `;
            alertsList.appendChild(li);
        });
    }

    /**
     * Display offline alerts message
     */
    displayAlertsOffline() {
        const alertsList = document.getElementById('weather-alerts-list');
        if (!alertsList) return;

        alertsList.innerHTML = '<li>AWIPS server not available - no real-time alerts</li>';
    }

    /**
     * Get station information from AWIPS
     */
    async getStationInfo() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/stations/${this.stationId}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Failed to get station info:', error);
            return this.getDefaultStationInfo();
        }
    }

    /**
     * Default station info (fallback)
     */
    getDefaultStationInfo() {
        return {
            stationId: 'WNG689',
            callSign: 'WNG',
            frequency: 162.5500,
            coverage: ['Valparaiso, IN', 'Hebron, IN'],
            county: 'Porter County, Indiana',
            region: 'Chicago/Romeoville NWS',
            nwsOffice: 'LOT'
        };
    }

    /**
     * Send broadcast confirmation to AWIPS
     */
    async sendBroadcastConfirmation(broadcastType, content) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/broadcast/confirm`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Station-ID': this.stationId
                },
                body: JSON.stringify({
                    type: broadcastType,
                    content: content,
                    timestamp: new Date().toISOString()
                })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            console.log(`Broadcast confirmation sent for: ${broadcastType}`);
        } catch (error) {
            console.error('Failed to send broadcast confirmation:', error);
        }
    }

    /**
     * Get connection status
     */
    isConnected() {
        return this.connected;
    }

    /**
     * Set API base URL
     */
    setApiUrl(url) {
        this.apiBaseUrl = url;
        this.checkConnection();
    }
}

// Initialize AWIPS Integration Module
let awipsIntegration;
document.addEventListener('DOMContentLoaded', () => {
    awipsIntegration = new AWIPSIntegration();
    window.awipsIntegration = awipsIntegration;
});
