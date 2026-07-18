/**
 * Analytics and Monitoring Module
 * Tracks broadcast statistics, performance metrics, and alert history
 */

class AnalyticsModule {
    constructor() {
        this.stats = {
            broadcastsToday: 0,
            totalBroadcasts: 0,
            uptime: null,
            alertsBroadcast: 0,
            averagePlaybackDuration: 0,
            systemHealth: 'Good'
        };
        this.eventLog = [];
        this.performanceMetrics = {};
        this.init();
    }

    init() {
        this.startupTime = new Date();
        this.recordEvent('system', 'Application started');
        console.log('Analytics Module initialized');
    }

    /**
     * Record an event in the log
     */
    recordEvent(category, description, data = {}) {
        const event = {
            timestamp: new Date(),
            category: category,
            description: description,
            data: data
        };

        this.eventLog.push(event);

        // Keep only last 500 events
        if (this.eventLog.length > 500) {
            this.eventLog = this.eventLog.slice(-500);
        }

        console.log(`[${category.toUpperCase()}] ${description}`);
    }

    /**
     * Record broadcast
     */
    recordBroadcast(broadcastType, duration, success = true) {
        this.stats.totalBroadcasts++;
        
        if (new Date().toDateString() === new Date().toDateString()) {
            this.stats.broadcastsToday++;
        }

        this.recordEvent('broadcast', `${broadcastType} broadcast ${success ? 'succeeded' : 'failed'}`, {
            type: broadcastType,
            duration: duration,
            success: success
        });

        // Update average duration
        if (success) {
            const totalDuration = (this.stats.averagePlaybackDuration * (this.stats.broadcastsToday - 1)) + duration;
            this.stats.averagePlaybackDuration = totalDuration / this.stats.broadcastsToday;
        }
    }

    /**
     * Record alert broadcast
     */
    recordAlertBroadcast(eventCode, area, success = true) {
        this.stats.alertsBroadcast++;
        
        this.recordEvent('alert', `${eventCode} alert broadcast for ${area}`, {
            eventCode: eventCode,
            area: area,
            success: success
        });
    }

    /**
     * Record error
     */
    recordError(errorType, message, stack = '') {
        this.recordEvent('error', `${errorType}: ${message}`, {
            type: errorType,
            message: message,
            stack: stack
        });

        // Update system health if critical
        if (errorType === 'CRITICAL') {
            this.stats.systemHealth = 'Degraded';
        }
    }

    /**
     * Record performance metric
     */
    recordPerformanceMetric(metric, value, unit = 'ms') {
        if (!this.performanceMetrics[metric]) {
            this.performanceMetrics[metric] = [];
        }

        this.performanceMetrics[metric].push({
            timestamp: new Date(),
            value: value,
            unit: unit
        });

        // Keep only last 100 measurements per metric
        if (this.performanceMetrics[metric].length > 100) {
            this.performanceMetrics[metric] = this.performanceMetrics[metric].slice(-100);
        }
    }

    /**
     * Get system uptime
     */
    getUptime() {
        const uptimeMs = Date.now() - this.startupTime.getTime();
        const uptimeSeconds = Math.floor(uptimeMs / 1000);
        const hours = Math.floor(uptimeSeconds / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = uptimeSeconds % 60;

        return `${hours}h ${minutes}m ${seconds}s`;
    }

    /**
     * Get statistics summary
     */
    getStatistics() {
        return {
            ...this.stats,
            uptime: this.getUptime(),
            eventsLogged: this.eventLog.length,
            systemHealth: this.calculateSystemHealth()
        };
    }

    /**
     * Calculate system health status
     */
    calculateSystemHealth() {
        const recentErrors = this.eventLog
            .filter(e => e.category === 'error')
            .filter(e => Date.now() - e.timestamp.getTime() < 300000) // Last 5 minutes
            .length;

        if (recentErrors > 5) {
            return 'Critical';
        } else if (recentErrors > 2) {
            return 'Degraded';
        } else {
            return 'Good';
        }
    }

    /**
     * Get performance average for a metric
     */
    getPerformanceAverage(metric) {
        const measurements = this.performanceMetrics[metric];
        if (!measurements || measurements.length === 0) return null;

        const sum = measurements.reduce((acc, m) => acc + m.value, 0);
        return sum / measurements.length;
    }

    /**
     * Get event log filtered by category
     */
    getEventsByCategory(category) {
        return this.eventLog.filter(e => e.category === category);
    }

    /**
     * Get event log for specific time range
     */
    getEventsByTimeRange(startTime, endTime) {
        return this.eventLog.filter(e => 
            e.timestamp >= startTime && e.timestamp <= endTime
        );
    }

    /**
     * Export statistics report
     */
    exportReport() {
        return {
            timestamp: new Date(),
            statistics: this.getStatistics(),
            recentEvents: this.eventLog.slice(-50),
            performanceMetrics: this.performanceMetrics,
            systemHealth: this.calculateSystemHealth()
        };
    }

    /**
     * Get dashboard data
     */
    getDashboardData() {
        return {
            stats: this.getStatistics(),
            recentBroadcasts: this.getEventsByCategory('broadcast').slice(-10),
            recentAlerts: this.getEventsByCategory('alert').slice(-10),
            recentErrors: this.getEventsByCategory('error').slice(-5),
            systemHealth: this.calculateSystemHealth()
        };
    }
}

// Initialize Analytics Module
let analyticsModule;
document.addEventListener('DOMContentLoaded', () => {
    analyticsModule = new AnalyticsModule();
    window.analyticsModule = analyticsModule;
});
