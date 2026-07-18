/**
 * Maintenance Module
 * Handles pronunciations, voice settings, and system maintenance
 */

class MaintenanceModule {
    constructor() {
        this.selectedVoice = 'paul';
        this.pronunciations = new Map();
        this.init();
    }

    init() {
        this.loadPronunciations();
        this.setupEventListeners();
        console.log('Maintenance Module initialized');
    }

    loadPronunciations() {
        const pronunciationList = [
            { word: 'Pulaski County', ipa: '/pjuːˈlɑːski/', phonetic: 'poo-LAH-skee' },
            { word: 'Valparaiso', ipa: '/ˌvælpərˈeɪzoʊ/', phonetic: 'val-puh-RAY-so' },
            { word: 'Hebron', ipa: '/ˈhɛbrən/', phonetic: 'HEH-brun' },
            { word: 'Indiana', ipa: '/ˌɪndiˈænə/', phonetic: 'in-dee-AN-uh' },
            { word: 'Illinois', ipa: '/ˌɪlɪˈnɔɪ/', phonetic: 'il-i-NOY' },
            { word: 'Chicago', ipa: '/ʃɪˈkɑːɡoʊ/', phonetic: 'shuh-KAH-go' },
            { word: 'Romeoville', ipa: '/ˌroʊmiˈoʊvɪl/', phonetic: 'RO-mee-oh-vil' },
            { word: 'Porter County', ipa: '/ˈpɔːrtər/', phonetic: 'POR-tur' },
            { word: 'National Weather Service', ipa: '/ˈnæʃənəl/', phonetic: 'NASH-un-ul' },
            { word: 'KLOT', ipa: '/keɪˈɛl.oʊˈtiː/', phonetic: 'K-LOT' },
            { word: 'LOT', ipa: '/ɛl.oʊˈtiː/', phonetic: 'L-O-T' }
        ];

        pronunciationList.forEach(p => {
            this.pronunciations.set(p.word.toLowerCase(), p);
        });
    }

    setupEventListeners() {
        const searchBtn = document.getElementById('btn-search-pronunciation');
        const playBtn = document.getElementById('btn-play-selection');
        const testVoiceBtn = document.getElementById('btn-test-voice');
        const searchInput = document.getElementById('pronunciation-search');

        if (searchBtn) searchBtn.addEventListener('click', () => this.searchPronunciations());
        if (playBtn) playBtn.addEventListener('click', () => this.playSelection());
        if (testVoiceBtn) testVoiceBtn.addEventListener('click', () => this.testVoice());
        if (searchInput) searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchPronunciations();
        });
    }

    searchPronunciations() {
        const searchInput = document.getElementById('pronunciation-search');
        const query = searchInput.value.toLowerCase().trim();

        if (!query) {
            this.displayAllPronunciations();
            return;
        }

        const results = Array.from(this.pronunciations.entries())
            .filter(([word, data]) => word.includes(query))
            .map(([word, data]) => data);

        this.displayPronunciations(results);
        console.log(`Found ${results.length} pronunciation(s) for "${query}"`);
    }

    displayAllPronunciations() {
        const items = Array.from(this.pronunciations.values());
        this.displayPronunciations(items);
    }

    displayPronunciations(items) {
        const listEl = document.getElementById('pronunciation-list');
        if (!listEl) return;

        listEl.innerHTML = '';

        items.forEach(item => {
            const li = document.createElement('li');
            li.dataset.word = item.word.toLowerCase();
            li.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                    <span class="word">${item.word}</span>
                    <div style="flex: 1; text-align: right; color: #999; font-size: 0.85rem;">
                        <div style="margin-right: 1rem;">${item.ipa}</div>
                        <div style="margin-right: 1rem; font-weight: 600; color: #0066cc;">${item.phonetic}</div>
                    </div>
                </div>
            `;
            li.addEventListener('click', () => this.selectPronunciation(item));
            listEl.appendChild(li);
        });
    }

    selectPronunciation(item) {
        console.log(`Selected: ${item.word} - ${item.phonetic}`);
        // Visual feedback
        const items = document.querySelectorAll('.pronunciation-list li');
        items.forEach(el => el.style.backgroundColor = '');
        
        const selected = document.querySelector(`[data-word="${item.word.toLowerCase()}"]`);
        if (selected) {
            selected.style.backgroundColor = 'rgba(255, 102, 0, 0.2)';
        }
    }

    playSelection() {
        const selectedEl = document.querySelector('.pronunciation-list li[style*="background"]');
        if (!selectedEl) {
            console.warn('No pronunciation selected');
            return;
        }

        const word = selectedEl.dataset.word;
        const item = this.pronunciations.get(word);

        if (item && window.ttsEngine) {
            console.log(`Playing: ${item.word} (${item.phonetic})`);
            window.ttsEngine.speak(item.word);
        }
    }

    testVoice() {
        const voiceSelect = document.getElementById('voice-select');
        const selectedVoice = voiceSelect ? voiceSelect.value : 'paul';

        const testText = `This is a test of the ${selectedVoice} voice. The quick brown fox jumps over the lazy dog.`;
        
        if (window.ttsEngine) {
            console.log(`Testing voice: ${selectedVoice}`);
            window.ttsEngine.speak(testText);
        }
    }

    changePronunciation(word, newPronunciation) {
        const wordLower = word.toLowerCase();
        if (this.pronunciations.has(wordLower)) {
            const item = this.pronunciations.get(wordLower);
            item.phonetic = newPronunciation;
            console.log(`Updated pronunciation for "${word}": ${newPronunciation}`);
        }
    }

    addPronunciation(word, ipa, phonetic) {
        this.pronunciations.set(word.toLowerCase(), { word, ipa, phonetic });
        console.log(`Added pronunciation: ${word}`);
    }

    getPronunciation(word) {
        return this.pronunciations.get(word.toLowerCase());
    }

    exportPronunciations() {
        const data = Array.from(this.pronunciations.values());
        return JSON.stringify(data, null, 2);
    }

    importPronunciations(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            data.forEach(item => {
                this.addPronunciation(item.word, item.ipa, item.phonetic);
            });
            console.log(`Imported ${data.length} pronunciation(s)`);
        } catch (error) {
            console.error('Failed to import pronunciations:', error);
        }
    }

    getSystemStatus() {
        return {
            selectedVoice: this.selectedVoice,
            pronunciationCount: this.pronunciations.size,
            ttsAvailable: window.ttsEngine !== undefined,
            speechSynthesisAvailable: 'speechSynthesis' in window
        };
    }
}

// Initialize Maintenance Module
let maintenanceModule;
document.addEventListener('DOMContentLoaded', () => {
    maintenanceModule = new MaintenanceModule();
    window.maintenanceModule = maintenanceModule;
});
