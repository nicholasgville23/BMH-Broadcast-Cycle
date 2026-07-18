/**
 * Broadcast Cycle Manager
 * Manages WNG689 broadcast scheduling and execution
 */

class BroadcastCycleManager {
    constructor() {
        this.stationId = 'WNG689';
        this.isRunning = false;
        this.isPaused = false;
        this.broadcastQueue = [];
        this.currentBroadcastIndex = 0;
        this.cycleInterval = null;
        this.init();
    }

    init() {
        this.setupDefaultQueue();
        this.attachEventListeners();
        console.log(`Broadcast Cycle Manager initialized for ${this.stationId}`);
    }

    setupDefaultQueue() {
        this.broadcastQueue = [
            {
                id: 1,
                name: 'Station Identification',
                type: 'station-id',
                duration: 5,
                priority: 1,
                enabled: true
            },
            {
                id: 2,
                name: 'Current Time Announcement',
                type: 'time',
                duration: 3,
                priority: 2,
                enabled: true
            },
            {
                id: 3,
                name: 'Hazardous Weather Outlook (KLOT/LOT)',
                type: 'hazard',
                duration: 30,
                priority: 3,
                enabled: true
            },
            {
                id: 4,
                name: 'Severe Weather Alerts',
                type: 'severe-weather',
                duration: 15,
                priority: 4,
                enabled: true
            }
        ];
    }

    attachEventListeners() {
        // Already handled in app.js, but can add specific event listeners here
    }

    start() {
        if (this.isRunning) {
            console.warn('Broadcast cycle already running');
            return;
        }

        this.isRunning = true;
        this.isPaused = false;
        this.currentBroadcastIndex = 0;
        this.updateCycleStatus('Running');
        
        console.log(`Starting broadcast cycle for ${this.stationId}`);
        this.executeCycle();
    }

    pause() {
        if (!this.isRunning) {
            console.warn('Broadcast cycle not running');
            return;
        }

        this.isPaused = true;
        this.updateCycleStatus('Paused');
        console.log('Broadcast cycle paused');
    }

    resume() {
        if (!this.isPaused) {
            console.warn('Broadcast cycle not paused');
            return;
        }

        this.isPaused = false;
        this.updateCycleStatus('Running');
        console.log('Broadcast cycle resumed');
        this.executeCycle();
    }

    stop() {
        this.isRunning = false;
        this.isPaused = false;
        this.currentBroadcastIndex = 0;
        
        if (this.cycleInterval) {
            clearInterval(this.cycleInterval);
            this.cycleInterval = null;
        }

        this.updateCycleStatus('Stopped');
        console.log('Broadcast cycle stopped');
    }

    executeCycle() {
        if (!this.isRunning || this.isPaused) {
            return;
        }

        if (this.currentBroadcastIndex < this.broadcastQueue.length) {
            const broadcast = this.broadcastQueue[this.currentBroadcastIndex];
            
            if (broadcast.enabled) {
                this.executeBroadcast(broadcast);
            }

            this.currentBroadcastIndex++;
            
            // Schedule next broadcast
            const nextBroadcast = this.broadcastQueue[this.currentBroadcastIndex];
            if (nextBroadcast) {
                const delay = (broadcast.duration || 5) * 1000;
                setTimeout(() => this.executeCycle(), delay);
            }
        } else {
            // Cycle complete, restart
            this.currentBroadcastIndex = 0;
            const cycleDelay = 60000; // 60 second cycle
            setTimeout(() => this.executeCycle(), cycleDelay);
        }
    }

    executeBroadcast(broadcast) {
        console.log(`Executing broadcast: ${broadcast.name}`);
        this.updateBroadcastQueue(broadcast);

        // Call TTS engine if available
        if (window.ttsEngine) {
            window.ttsEngine.playAnnouncement(broadcast.type);
        }
    }

    updateBroadcastQueue(activeBroadcast) {
        const queueList = document.getElementById('broadcast-queue');
        if (!queueList) return;

        const items = queueList.querySelectorAll('li');
        items.forEach((item, index) => {
            if (this.broadcastQueue[index] && this.broadcastQueue[index].id === activeBroadcast.id) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    updateCycleStatus(status) {
        const statusEl = document.getElementById('cycle-status');
        if (!statusEl) return;

        statusEl.textContent = status;
        
        if (status === 'Running') {
            statusEl.style.backgroundColor = '#00aa00';
            this.updateNextBroadcastTime();
        } else if (status === 'Paused') {
            statusEl.style.backgroundColor = '#ffaa00';
        } else if (status === 'Stopped') {
            statusEl.style.backgroundColor = '#cc0000';
        }
    }

    updateNextBroadcastTime() {
        const nextBroadcastEl = document.getElementById('next-broadcast');
        if (!nextBroadcastEl) return;

        const now = new Date();
        const nextTime = new Date(now.getTime() + 5000); // 5 seconds from now
        nextBroadcastEl.textContent = nextTime.toLocaleTimeString('en-US', { hour12: false });
    }

    addBroadcast(broadcast) {
        this.broadcastQueue.push(broadcast);
        console.log(`Added broadcast: ${broadcast.name}`);
    }

    removeBroadcast(broadcastId) {
        this.broadcastQueue = this.broadcastQueue.filter(b => b.id !== broadcastId);
        console.log(`Removed broadcast ID: ${broadcastId}`);
    }

    updateBroadcast(broadcastId, updates) {
        const broadcast = this.broadcastQueue.find(b => b.id === broadcastId);
        if (broadcast) {
            Object.assign(broadcast, updates);
            console.log(`Updated broadcast: ${broadcastId}`);
        }
    }

    getStationInfo() {
        return {
            stationId: this.stationId,
            callSign: 'WNG',
            transmitterNumber: 689,
            frequency: 162.5500,
            coverage: ['Valparaiso, IN', 'Hebron, IN'],
            county: 'Porter County, Indiana',
            region: 'Chicago/Romeoville NWS'
        };
    }
}

// Initialize Broadcast Cycle Manager
let broadcastCycleManager;
document.addEventListener('DOMContentLoaded', () => {
    broadcastCycleManager = new BroadcastCycleManager();
    window.broadcastCycleManager = broadcastCycleManager;
});
