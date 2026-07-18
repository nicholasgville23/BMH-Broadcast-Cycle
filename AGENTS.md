# AGENTS.md - BMH-Broadcast-Cycle Repository Guidance

## Repository Overview

This repository is an **AWIPS (Advanced Weather Interactive Processing System) Version of BMH-Broadcast-Cycle** in Windows/JavaScript, combining the BMH systems from **wagwan-piffting-blud** and **dondaplayer1**.

### Purpose
This project implements a **Broadcast Message Handler (BMH)** system for the National Weather Service (NWS) Office in Chicago/Romeoville, Illinois/Indiana, with integrated Text-to-Speech (TTS) capabilities for weather radio broadcasts.

### Key Features
- **AWIPS Integration**: CAVE D2D/GFE (Graphical Forecast Editor) support
- **Weather Radio Station**: WNG689 (Valparaiso and Hebron, Indiana)
- **TTS Voice**: VoiceText Paul (JavaScript-based)
- **Broadcast Cycle Management**: Automated weather alert broadcast scheduling
- **EAS/SAME Support**: Emergency Alert System integration
- **WarnGen Integration**: Warning Generator GUI for severe weather products

## How to Treat This Repository

### 1. **Development Environment**
- **Primary Language**: JavaScript (94%) + HTML (5.2%) + CSS (0.8%)
- **Secondary Support**: Python (from dondaplayer1's weather-radio-suite)
- **Platform**: Windows 11 AWIPS CAVE D2D environment
- **Core Dependencies**: VoiceText Paul TTS, AWIPS API, RTL-SDR for EAS monitoring

### 2. **Project Structure**
```
BMH-Broadcast-Cycle/
├── src/
│   ├── bmh-menu/                    # Main BMH Menu UI
│   ├── gfe-integration/             # GFE/CAVE D2D integration
│   ├── warngen/                     # Warning Generator integration
│   ├── tts-engine/                  # VoiceText Paul TTS engine
│   ├── maintenance/                 # Maintenance & Pronunciations
│   └── broadcast-cycle/             # Broadcast Cycle manager
├── config/
│   ├── stations/                    # Station configurations (WNG689, etc.)
│   ├── pronunciations/              # Dictionary for TTS pronunciation
│   └── hazard-definitions/          # Hazardous Weather Outlook definitions
├── tests/
└── docs/
```

### 3. **Core Components**

#### **BMH Menu System**
- Entry point for broadcast operations
- Provides access to all sub-systems
- Connected to AWIPS CAVE D2D interface

#### **Maintenance Module**
- Pronunciations configuration for geographic names (Pulaski County, Valparaiso, etc.)
- Voice selection (VoiceText Paul)
- TTS settings and testing

#### **Broadcast Cycle Window**
- Real-time broadcast scheduling
- Station ID display: **WNG689**
- Current Time Announcement playback
- Hazardous Weather Outlook display (KLOT/LOT)
- Severe Weather Information integration with EAS-Tools

#### **TTS Engine**
- JavaScript-based VoiceText Paul voice synthesis
- Pronunciation dictionary support
- Live playback testing ("Play Selection")
- Audio recording and archival

#### **AWIPS Integration**
- GFE/CAVE D2D compatibility
- AWIPS Product Generation (WarnGen)
- Real-time severe weather data injection
- D2D graphics overlays

### 4. **Related Projects**
- **dondaplayer1/weather-radio-suite**: Python-based NOAA Weather Radio recreation
- **nicholasgville23/BMH-Weather-Radio-Suite**: Python version on Windows 11
- **wagwan-piffting-blud/EAS-Tools**: JavaScript EAS/SAME tools
- **jhonjrd/EAS-SAMEmon**: Real-time EAS/SAME monitoring via RTL-SDR

### 5. **Station Configuration**

#### **WNG689 - Valparaiso/Hebron, Indiana**
```javascript
{
  stationId: "WNG689",
  callSign: "WNG",
  transmitterNumber: 689,
  coverage: {
    primary: ["Valparaiso, IN", "Hebron, IN"],
    county: "Porter County, Indiana",
    region: "Chicago/Romeoville NWS"
  },
  frequency: 162.5500, // MHz
  powerLevel: "High"
}
```

### 6. **Code Contribution Guidelines**

#### **JavaScript/HTML/CSS (Primary)**
- Use ES6+ syntax
- Follow AWIPS JavaScript API conventions
- Ensure CAVE D2D compatibility
- Test TTS playback on Windows 11

#### **Python (Secondary)**
- Maintain compatibility with dondaplayer1's modules
- Support AWIPS Python integration points
- Document NOAA Weather Radio formats

#### **TTS Integration**
- Always test pronunciations with VoiceText Paul
- Maintain pronunciation dictionary in `config/pronunciations/`
- Support both manual and automated broadcast modes

### 7. **Testing Requirements**

- **Functionality**: All BMH Menu options accessible and functional
- **TTS**: VoiceText Paul pronunciation testing for geographic names
- **Broadcast Cycle**: WNG689 broadcasts on schedule
- **AWIPS Integration**: GFE/CAVE D2D menu loads without errors
- **EAS/Severe Weather**: Real-time data flow from EAS-Tools

### 8. **Deployment**

1. Clone/fork into AWIPS Windows 11 environment
2. Configure WNG689 station parameters in `config/stations/`
3. Test TTS with `src/tts-engine/test-voices.js`
4. Integrate with AWIPS CAVE D2D
5. Verify Hazardous Weather Outlook for KLOT (Chicago/Romeoville NWS)
6. Monitor broadcast cycle output

### 9. **Common Tasks**

**Adding a new station:**
- Copy template in `config/stations/`
- Update frequency, call sign, and coverage area
- Register in BMH Menu

**Adding pronunciations:**
- Edit `config/pronunciations/index.js`
- Test with Play Selection button
- Verify with VoiceText Paul

**Testing TTS playback:**
- Open Maintenance → Pronunciations
- Select a word or phrase
- Click "Play Selection"
- Listen to VoiceText Paul rendering

### 10. **Important Notes**

- This is a **Windows-specific** implementation
- Requires **AWIPS CAVE D2D** for full functionality
- TTS uses **VoiceText Paul** for consistent broadcast voice
- Integrates with **EAS-Tools** for severe weather alerts
- Compatible with **RTL-SDR** for real-time emergency alert monitoring

---

**Last Updated**: 2026-07-18  
**Maintainer**: nicholasgville23  
**License**: Apache 2.0
