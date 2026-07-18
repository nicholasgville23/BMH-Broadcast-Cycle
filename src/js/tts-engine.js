/**
 * TTS Engine - Text-to-Speech Integration
 * Supports VoiceText Paul voice for BMH broadcasts
 */

class TTSEngine {
    constructor() {
        this.voice = 'paul';
        this.isSpeaking = false;
        this.utterance = null;
        this.pronunciationDict = this.loadPronunciationDictionary();
        this.init();
    }

    init() {
        if ('speechSynthesis' in window) {
            console.log('Web Speech API available');
            this.setupVoiceOptions();
        } else {
            console.warn('Web Speech API not available');
        }
    }

    loadPronunciationDictionary() {
        return {
            'Pulaski County': 'pjuːˈlɑːski kaʊnti',
            'Valparaiso': 'ˌvælpərˈeɪzoʊ',
            'Hebron': 'ˈhɛbrən',
            'Indiana': 'ˌɪndiˈænə',
            'Illinois': 'ˌɪlɪˈnɔɪ',
            'Chicago': 'ʃɪˈkɑːɡoʊ',
            'Romeoville': 'ˌroʊmiˈoʊvɪl',
            'WNG689': 'double-you-en-gee-six-eight-nine',
            'AWIPS': 'ay-wips',
            'EAS': 'ee-ay-ess',
            'SAME': 'same',
            'GFE': 'gee-eff-ee',
            'CAVE': 'cave',
            'D2D': 'dee-too-dee',
            'RTL-SDR': 'ar-tee-ell-ess-dee-arr'
        };
    }

    setupVoiceOptions() {
        const voiceSelect = document.getElementById('voice-select');
        const voices = speechSynthesis.getVoices();
        
        if (voiceSelect) {
            voices.forEach((voice, index) => {
                if (voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.name.includes('Apple')) {
                    console.log(`Available voice: ${voice.name}`);
                }
            });
        }
    }

    speak(text, callback) {
        if (!('speechSynthesis' in window)) {
            console.error('Speech Synthesis API not available');
            return;
        }

        if (this.isSpeaking) {
            speechSynthesis.cancel();
        }

        // Apply pronunciation replacements
        let processedText = this.applyPronunciations(text);

        this.utterance = new SpeechSynthesisUtterance(processedText);
        this.utterance.rate = 1.0;
        this.utterance.pitch = 1.0;
        this.utterance.volume = 1.0;

        // Set voice preference
        const voices = speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Microsoft Zira'));
        if (preferredVoice) {
            this.utterance.voice = preferredVoice;
        }

        this.utterance.onstart = () => {
            this.isSpeaking = true;
            this.updateAudioStatus('Playing');
            console.log('Speech started');
        };

        this.utterance.onend = () => {
            this.isSpeaking = false;
            this.updateAudioStatus('Ready');
            console.log('Speech ended');
            if (callback) callback();
        };

        this.utterance.onerror = (event) => {
            this.isSpeaking = false;
            this.updateAudioStatus('Error');
            console.error('Speech error:', event.error);
        };

        speechSynthesis.speak(this.utterance);
    }

    pause() {
        if (speechSynthesis.speaking) {
            speechSynthesis.pause();
            this.isSpeaking = false;
            this.updateAudioStatus('Paused');
        }
    }

    resume() {
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
            this.isSpeaking = true;
            this.updateAudioStatus('Playing');
        }
    }

    stop() {
        speechSynthesis.cancel();
        this.isSpeaking = false;
        this.updateAudioStatus('Ready');
    }

    applyPronunciations(text) {
        let processedText = text;
        
        // Replace known pronunciations
        Object.entries(this.pronunciationDict).forEach(([word, pronunciation]) => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            processedText = processedText.replace(regex, pronunciation);
        });

        return processedText;
    }

    updateAudioStatus(status) {
        const statusEl = document.getElementById('audio-status');
        if (statusEl) {
            statusEl.textContent = status;
            if (status === 'Playing') {
                statusEl.style.backgroundColor = '#ffaa00';
            } else if (status === 'Ready') {
                statusEl.style.backgroundColor = '#00aa00';
            } else if (status === 'Error') {
                statusEl.style.backgroundColor = '#cc0000';
            }
        }
    }

    playAnnouncement(announcementType) {
        let text = '';
        
        switch(announcementType) {
            case 'station-id':
                text = `This is W-N-G 6-8-9`;
                break;
            case 'time':
                const now = new Date();
                text = `The time is ${now.toLocaleTimeString()}`;
                break;
            case 'hazard':
                text = `Hazardous Weather Outlook from the National Weather Service Chicago office`;
                break;
            default:
                text = announcementType;
        }

        this.speak(text);
    }

    addCustomPronunciation(word, pronunciation) {
        this.pronunciationDict[word] = pronunciation;
        console.log(`Added pronunciation: ${word} = ${pronunciation}`);
    }

    getPronunciation(word) {
        return this.pronunciationDict[word.toLowerCase()] || word;
    }
}

// Initialize TTS Engine
let ttsEngine;
document.addEventListener('DOMContentLoaded', () => {
    ttsEngine = new TTSEngine();
    
    // Expose to window for testing
    window.ttsEngine = ttsEngine;
});
