/**
 * BMH Broadcast Cycle - Main Application
 * AWIPS CAVE D2D Interface
 * 
 * Station: WNG689 (Valparaiso & Hebron, Indiana)
 * NWS Office: Chicago/Romeoville, Illinois/Indiana
 */

class BMHBroadcastCycle {
    constructor() {
        this.currentSection = 'broadcast-cycle-section';
        this.isRunning = false;
        this.stationId = 'WNG689';
        this.init();
    }

    init() {
        this.setupMenuButtons();
        this.setupContentSections();
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
        console.log('BMH Broadcast Cycle initialized');
    }

    setupMenuButtons() {
        const buttons = document.querySelectorAll('.menu-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleMenuClick(e));
        });
    }

    handleMenuClick(event) {
        const button = event.target;
        const buttonId = button.id;
        
        // Map button IDs to section IDs
        const sectionMap = {
            'btn-broadcast-cycle': 'broadcast-cycle-section',
            'btn-current-time': 'current-time-section',
            'btn-hazard-outlook': 'hazard-outlook-section',
            'btn-severe-weather': 'severe-weather-section',
            'btn-warngen': 'warngen-section',
            'btn-maintenance': 'maintenance-section',
            'btn-tts': 'tts-section'
        };

        const sectionId = sectionMap[buttonId];
        if (sectionId) {
            this.showSection(sectionId);
        }
    }

    showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => section.classList.remove('active'));

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            console.log(`Switched to section: ${sectionId}`);
        }
    }

    setupContentSections() {
        this.setupBroadcastCycle();
        this.setupCurrentTime();
        this.setupHazardOutlook();
        this.setupSevereWeather();
        this.setupWarnGen();
        this.setupMaintenance();
        this.setupTTS();
    }

    setupBroadcastCycle() {
        const startBtn = document.getElementById('btn-start-cycle');
        const pauseBtn = document.getElementById('btn-pause-cycle');
        const stopBtn = document.getElementById('btn-stop-cycle');

        startBtn.addEventListener('click', () => this.startBroadcastCycle());
        pauseBtn.addEventListener('click', () => this.pauseBroadcastCycle());
        stopBtn.addEventListener('click', () => this.stopBroadcastCycle());
    }

    startBroadcastCycle() {
        this.isRunning = true;
        const statusEl = document.getElementById('cycle-status');
        statusEl.textContent = 'Running';
        statusEl.style.backgroundColor = '#00aa00';
        console.log('Broadcast cycle started');
    }

    pauseBroadcastCycle() {
        this.isRunning = false;
        const statusEl = document.getElementById('cycle-status');
        statusEl.textContent = 'Paused';
        statusEl.style.backgroundColor = '#ffaa00';
        console.log('Broadcast cycle paused');
    }

    stopBroadcastCycle() {
        this.isRunning = false;
        const statusEl = document.getElementById('cycle-status');
        statusEl.textContent = 'Stopped';
        statusEl.style.backgroundColor = '#cc0000';
        console.log('Broadcast cycle stopped');
    }

    setupCurrentTime() {
        const playBtn = document.getElementById('btn-play-time');
        const testBtn = document.getElementById('btn-test-time');

        playBtn.addEventListener('click', () => this.playTimeAnnouncement());
        testBtn.addEventListener('click', () => this.testTimeAnnouncement());
    }

    playTimeAnnouncement() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString();
        console.log(`Playing time announcement: ${timeStr}`);
        // TTS would be called here
    }

    testTimeAnnouncement() {
        console.log('Testing time announcement');
    }

    setupHazardOutlook() {
        const updateBtn = document.getElementById('btn-update-hazard');
        const playBtn = document.getElementById('btn-play-hazard');

        updateBtn.addEventListener('click', () => this.updateHazardOutlook());
        playBtn.addEventListener('click', () => this.playHazardOutlook());
    }

    updateHazardOutlook() {
        console.log('Updating Hazardous Weather Outlook from AWIPS');
        // Would integrate with AWIPS API
    }

    playHazardOutlook() {
        console.log('Playing Hazardous Weather Outlook via TTS');
        // Would call TTS engine
    }

    setupSevereWeather() {
        const refreshBtn = document.getElementById('btn-refresh-alerts');
        const broadcastBtn = document.getElementById('btn-broadcast-alert');

        refreshBtn.addEventListener('click', () => this.refreshAlerts());
        broadcastBtn.addEventListener('click', () => this.broadcastAlert());
    }

    refreshAlerts() {
        console.log('Refreshing severe weather alerts');
        // Would call EAS-Tools API
    }

    broadcastAlert() {
        console.log('Broadcasting severe weather alert');
    }

    setupWarnGen() {
        const newBtn = document.getElementById('btn-new-warning');
        const editBtn = document.getElementById('btn-edit-warning');
        const broadcastBtn = document.getElementById('btn-broadcast-warning');

        newBtn.addEventListener('click', () => this.createNewWarning());
        editBtn.addEventListener('click', () => this.editWarning());
        broadcastBtn.addEventListener('click', () => this.broadcastWarning());
    }

    createNewWarning() {
        console.log('Creating new warning in WarnGen');
    }

    editWarning() {
        console.log('Editing warning');
    }

    broadcastWarning() {
        console.log('Broadcasting warning');
    }

    setupMaintenance() {
        const searchBtn = document.getElementById('btn-search-pronunciation');
        const playBtn = document.getElementById('btn-play-selection');
        const testVoiceBtn = document.getElementById('btn-test-voice');

        searchBtn.addEventListener('click', () => this.searchPronunciation());
        playBtn.addEventListener('click', () => this.playSelection());
        testVoiceBtn.addEventListener('click', () => this.testVoice());
    }

    searchPronunciation() {
        const searchInput = document.getElementById('pronunciation-search');
        const query = searchInput.value.toLowerCase();
        console.log(`Searching for pronunciation: ${query}`);
    }

    playSelection() {
        console.log('Playing selected pronunciation with VoiceText Paul');
    }

    testVoice() {
        console.log('Testing VoiceText Paul voice');
    }

    setupTTS() {
        const speakBtn = document.getElementById('btn-speak');
        const pauseBtn = document.getElementById('btn-pause-speech');
        const stopBtn = document.getElementById('btn-stop-speech');

        speakBtn.addEventListener('click', () => this.speak());
        pauseBtn.addEventListener('click', () => this.pauseSpeech());
        stopBtn.addEventListener('click', () => this.stopSpeech());
    }

    speak() {
        const textArea = document.getElementById('tts-text');
        const text = textArea.value;
        if (text) {
            console.log(`Speaking: ${text}`);
            // TTS would be called here
        }
    }

    pauseSpeech() {
        console.log('Pausing speech');
    }

    stopSpeech() {
        console.log('Stopping speech');
    }

    updateTime() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        const currentTimeEl = document.getElementById('current-time-display');
        if (currentTimeEl) {
            currentTimeEl.textContent = timeStr;
        }
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.bmhApp = new BMHBroadcastCycle();
});
