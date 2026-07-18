/**
 * Broadcast Log and Playback History Module
 * Maintains detailed logs of all broadcasts for compliance and auditing
 */

class BroadcastLogger {
    constructor() {
        this.broadcastLog = [];
        this.maxLogEntries = 1000;
        this.init();
    }

    init() {
        this.loadLogFromStorage();
        console.log('Broadcast Logger initialized with', this.broadcastLog.length, 'entries');
    }

    /**
     * Log a broadcast event
     */
    logBroadcast(broadcastData) {
        const logEntry = {
            id: this.generateLogId(),
            timestamp: new Date(),
            stationId: 'WNG689',
            type: broadcastData.type || 'unknown',
            category: broadcastData.category || 'General',
            duration: broadcastData.duration || 0,
            content: broadcastData.content || '',
            contentHash: this.generateHash(broadcastData.content),
            success: broadcastData.success !== false,
            errorMessage: broadcastData.error || null,
            device: {
                frequency: 162.5500,
                power: 'High',
                modulation: 'Analog FM'
            },
            operator: broadcastData.operator || 'System',
            notes: broadcastData.notes || ''
        };

        this.broadcastLog.unshift(logEntry);

        // Maintain max entries
        if (this.broadcastLog.length > this.maxLogEntries) {
            this.broadcastLog = this.broadcastLog.slice(0, this.maxLogEntries);
        }

        this.saveLogToStorage();
        return logEntry;
    }

    /**
     * Generate unique log ID
     */
    generateLogId() {
        return `LOG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Generate content hash for verification
     */
    generateHash(content) {
        if (!content) return null;
        
        let hash = 0;
        for (let i = 0; i < content.length; i++) {
            const char = content.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(16);
    }

    /**
     * Get broadcast log entries
     */
    getBroadcastLog(filter = {}) {
        let filtered = [...this.broadcastLog];

        // Filter by date range
        if (filter.startDate) {
            filtered = filtered.filter(e => e.timestamp >= new Date(filter.startDate));
        }
        if (filter.endDate) {
            filtered = filtered.filter(e => e.timestamp <= new Date(filter.endDate));
        }

        // Filter by type
        if (filter.type) {
            filtered = filtered.filter(e => e.type === filter.type);
        }

        // Filter by category
        if (filter.category) {
            filtered = filtered.filter(e => e.category === filter.category);
        }

        // Filter by success/failure
        if (filter.success !== undefined) {
            filtered = filtered.filter(e => e.success === filter.success);
        }

        // Limit results
        if (filter.limit) {
            filtered = filtered.slice(0, filter.limit);
        }

        return filtered;
    }

    /**
     * Get log entry by ID
     */
    getLogEntry(logId) {
        return this.broadcastLog.find(e => e.id === logId);
    }

    /**
     * Get today's broadcasts
     */
    getTodaysBroadcasts() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return this.getBroadcastLog({
            startDate: today,
            success: true
        });
    }

    /**
     * Get broadcasts by type
     */
    getBroadcastsByType(type) {
        return this.getBroadcastLog({ type: type });
    }

    /**
     * Get broadcast statistics
     */
    getStatistics(startDate, endDate) {
        const entries = this.getBroadcastLog({
            startDate: startDate,
            endDate: endDate
        });

        const successful = entries.filter(e => e.success).length;
        const failed = entries.filter(e => !e.success).length;
        const totalDuration = entries.reduce((sum, e) => sum + (e.duration || 0), 0);

        return {
            total: entries.length,
            successful: successful,
            failed: failed,
            successRate: entries.length > 0 ? (successful / entries.length * 100).toFixed(2) + '%' : 'N/A',
            totalDuration: totalDuration,
            averageDuration: entries.length > 0 ? (totalDuration / entries.length).toFixed(2) : 0,
            byType: this.groupByType(entries),
            byCategory: this.groupByCategory(entries)
        };
    }

    /**
     * Group broadcasts by type
     */
    groupByType(entries) {
        const grouped = {};
        entries.forEach(e => {
            grouped[e.type] = (grouped[e.type] || 0) + 1;
        });
        return grouped;
    }

    /**
     * Group broadcasts by category
     */
    groupByCategory(entries) {
        const grouped = {};
        entries.forEach(e => {
            grouped[e.category] = (grouped[e.category] || 0) + 1;
        });
        return grouped;
    }

    /**
     * Save log to localStorage
     */
    saveLogToStorage() {
        try {
            const dataToStore = JSON.stringify(this.broadcastLog);
            localStorage.setItem('bmhBroadcastLog', dataToStore);
        } catch (error) {
            console.warn('Failed to save broadcast log to localStorage:', error);
        }
    }

    /**
     * Load log from localStorage
     */
    loadLogFromStorage() {
        try {
            const stored = localStorage.getItem('bmhBroadcastLog');
            if (stored) {
                const parsed = JSON.parse(stored);
                this.broadcastLog = parsed.map(entry => ({
                    ...entry,
                    timestamp: new Date(entry.timestamp)
                }));
            }
        } catch (error) {
            console.warn('Failed to load broadcast log from localStorage:', error);
            this.broadcastLog = [];
        }
    }

    /**
     * Export log as CSV
     */
    exportAsCSV(filter = {}) {
        const entries = this.getBroadcastLog(filter);
        
        let csv = 'Log ID,Timestamp,Station,Type,Category,Duration (s),Success,Operator,Notes\n';
        
        entries.forEach(entry => {
            const timestamp = entry.timestamp.toLocaleString();
            const row = [
                entry.id,
                timestamp,
                entry.stationId,
                entry.type,
                entry.category,
                entry.duration,
                entry.success ? 'Yes' : 'No',
                entry.operator,
                `"${entry.notes}"`
            ].join(',');
            csv += row + '\n';
        });

        return csv;
    }

    /**
     * Export log as JSON
     */
    exportAsJSON(filter = {}) {
        const entries = this.getBroadcastLog(filter);
        return JSON.stringify(entries, null, 2);
    }

    /**
     * Clear old logs
     */
    clearOldLogs(daysOld = 30) {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysOld);

        const initialCount = this.broadcastLog.length;
        this.broadcastLog = this.broadcastLog.filter(e => e.timestamp > cutoffDate);
        const removed = initialCount - this.broadcastLog.length;

        this.saveLogToStorage();
        console.log(`Cleared ${removed} broadcast logs older than ${daysOld} days`);

        return removed;
    }

    /**
     * Get compliance report
     */
    getComplianceReport(startDate, endDate) {
        const stats = this.getStatistics(startDate, endDate);
        const entries = this.getBroadcastLog({
            startDate: startDate,
            endDate: endDate
        });

        return {
            reportDate: new Date(),
            period: {
                start: startDate,
                end: endDate
            },
            station: 'WNG689',
            statistics: stats,
            failedBroadcasts: entries.filter(e => !e.success),
            totalLogEntries: entries.length,
            storageUsage: JSON.stringify(this.broadcastLog).length + ' bytes'
        };
    }
}

// Initialize Broadcast Logger
let broadcastLogger;
document.addEventListener('DOMContentLoaded', () => {
    broadcastLogger = new BroadcastLogger();
    window.broadcastLogger = broadcastLogger;
});
