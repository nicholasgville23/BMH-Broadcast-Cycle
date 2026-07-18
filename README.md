# BMH-Broadcast-Cycle
AWIPS Version of BMH-Broadcast-Cycle in Windows on JavaScript from wagwan-piffting-blud and dondaplayer1.

📡 Overview

This repository contains the complete Broadcast Message Handler (BMH) Menu configuration suite for the National Weather Service (NWS) Chicago/Romeoville office. It provides a comprehensive automation system for NOAA Weather Radio broadcasting on Station ID WNG689 (serving Valparaiso and Hebron, Indiana).

The BMH Menu integrates with AWIPS CAVE D2D (Common AWIPS Visualization Environment - Display 2 Display) and GFE (Graphical Forecast Editor) to manage automated weather broadcasts with professional text-to-speech capabilities.

🎯 Core Purpose

Streamline weather radio broadcast operations with:


Automated broadcast cycle scheduling
Professional text-to-speech announcements (Paul Voice via VoiceText)
Emergency alert integration (EAS-Tools)
Hazardous weather outlook dissemination
Warning generator automation (WarnGen)



📋 Key Features

✅ BMH Menu Interface (AWIPS CAVE D2D/GFE)


Point-and-click broadcast management within AWIPS
Real-time broadcast cycle visualization
Station ID WNG689 integration
Graphical message scheduling


✅ Broadcast Cycle Management


Current Time Announcements - Automated time reads
Message Rotation - Scheduled message cycling
Hazardous Weather Outlook - KLOT/LOT integration
Timing Control - Customizable broadcast intervals


✅ Text-to-Speech (TTS) - Paul Voice


Engine: VoiceText
Voice: Paul (professional weather announcer quality)
Customization: Speed, pitch, and volume control
Testing: Built-in TTS preview and playback


✅ Pronunciations & Maintenance Module


Word Database: Geographic and weather terminology
Custom Pronunciations: Add/edit pronunciations for local names
Play Selection: Test pronunciations with Paul Voice
Examples: Pulaski County, Valparaiso, Hebron, Romeoville


✅ Hazardous Weather Outlook Integration


Forecast Office: LOT (Chicago/Romeoville)
Auto-Updates: Scheduled hazard outlook retrieval
Message Formatting: NWS-compliant text preparation
Coverage Area: Valparaiso & Hebron, Indiana


✅ Severe Weather Information (EAS-Tools)


Emergency Alert System (EAS) integration
Severe Weather Detection - Automatic threat identification
Message Routing - Smart message queue management
Tornado/SVR Alerts - Rapid escalation protocols


✅ WarnGen Integration (Warning Generator GUI)


Rapid Warning Creation - Template-based message generation
AWIPS Integration - Direct integration with BMH broadcast queue
Auto-Publishing - Push warnings to WNG689 automatically
Threat Types: Tornado, Severe Thunderstorm, Winter Weather, etc.


✅ JavaScript Implementation


Modern Node.js architecture
Async/await event handling
Configuration-driven design
Extensible module structure



🗂️ Repository Structure

AWIPS-Broadcast-Message-Handler-BMH-Menu/
├── README.md                          # This file
├── LICENSE                            # MIT License
├── package.json                       # NPM configuration & dependencies
├── .gitignore                         # Git ignore rules
├── .github/                           # GitHub workflows & CI/CD
│   └── workflows/
│       └── tests.yml
│
├── src/                               # Source code
│   ├── bmh-menu.js                    # Main BMH Menu controller
│   ├── broadcast-cycle.js             # Broadcast Cycle management
│   ├── current-time-announcement.js   # Time announcement engine
│   ├── hazard-outlook.js              # Hazard Outlook (KLOT/LOT) integration
│   ├── tts-voicetext.js              # Text-to-Speech (Paul Voice)
│   ├── maintenance-pronunciations.js  # Pronunciation database & maintenance
│   ├── warngen-integration.js         # Warning Generator GUI interface
│   ├── eas-tools.js                   # EAS (Emergency Alert System) tools
│   └── utils.js                       # Utility functions
│
├── config/                            # Configuration files
│   ├── station-wng689.xml             # Station ID WNG689 configuration
│   ├── broadcast-cycle.xml            # Broadcast Cycle settings
│   ├── tts-config.xml                 # TTS/VoiceText Paul configuration
│   ├── hazard-outlook-klot.xml        # KLOT/LOT Hazard Outlook config
│   ├── eas-tools-config.xml           # EAS-Tools settings
│   └── warngen-config.xml             # WarnGen GUI configuration
│
├── data/                              # Data files & databases
│   ├── pronunciations.json            # Word pronunciations database
│   ├── area-definitions.json          # Valparaiso/Hebron area definitions
│   ├── sample-broadcasts.json         # Sample broadcast messages
│   └── weather-terminology.json       # Weather-specific terminology
│
├── docs/                              # Documentation
│   ├── INSTALLATION.md                # Setup and installation guide
│   ├── USAGE.md                       # How to use BMH Menu
│   ├── CONFIGURATION.md               # Configuration reference
│   ├── TTS-SETUP.md                   # Text-to-Speech setup guide
│   ├── TROUBLESHOOTING.md             # Common issues and solutions
│   ├── AWIPS-INTEGRATION.md           # AWIPS CAVE D2D integration
│   └── API-REFERENCE.md               # API documentation
│
├── tests/                             # Unit tests
│   ├── bmh-menu.test.js
│   ├── broadcast-cycle.test.js
│   ├── tts-voicetext.test.js
│   ├── pronunciations.test.js
│   └── warngen-integration.test.js
│
├── examples/                          # Example configurations
│   ├── sample-bmh-config.json
│   ├── sample-pronunciations.json
│   ├── sample-broadcast-message.json
│   └── sample-warngen-message.json
│
└── scripts/                           # Helper scripts
    ├── setup-tts.js                   # VoiceText installation script
    ├── test-tts.js                    # TTS testing utility
    └── import-data.js                 # Data import utility


🚀 Quick Start

Prerequisites


Node.js 14.x or higher
NPM or Yarn
AWIPS CAVE D2D (for full integration)
VoiceText library (for TTS)
Java Runtime (for AWIPS compatibility)


Installation


Clone the repository:


bash   git clone https://github.com/nicholasgville23/BMH-Broadcast-Cycle
   cd BMH-Broadcast-Cycle


Install dependencies:


bash   npm install


Configure station:


bash   # Review and edit station configuration
   cat config/station-wng689.xml
   
   # Edit if needed (customize for your setup)
   nano config/station-wng689.xml


Set up Text-to-Speech:


bash   npm run setup-tts
   # Follow VoiceText installation prompts


Test TTS functionality:


bash   npm run test-tts
   # Listen to Paul Voice test


Start the BMH Menu:


bash   npm start


📖 Usage Guide

Opening BMH Menu in AWIPS CAVE D2D

Step 1: Launch AWIPS CAVE D2D

Start AWIPS CAVE D2D
Wait for system to fully load

Step 2: Access BMH Menu

Menu → Tools → Broadcast Message Handler → BMH Menu

Step 3: Select Station

Station Dropdown → Select "WNG689" (Valparaiso/Hebron, Indiana)

🔊 Testing Text-to-Speech (Paul Voice)

Step 1: Navigate to Maintenance

BMH Menu → Click "Maintenance" button

Step 2: Open Pronunciations

Maintenance Window → Click "Pronunciations/Words"

Step 3: Search for Word

Search Field → Type: "Pulaski County"
Results → Select matching pronunciation

Step 4: Play Selection with Paul Voice

Click "Play Selection" button
Listen to Paul Voice pronunciation via VoiceText

Example Pronunciations to Test:


Pulaski County → "puh-LAS-kee"
Valparaiso → "val-puh-RAY-zo"
Hebron → "HEE-brun"
Romeoville → "ROH-mee-oh-vil"


Managing Broadcast Cycle


Click "Broadcast Cycle" in BMH Menu
Current Time Announcement:

Enable/disable automated time reads
Set announcement frequency
Select voice (Paul)



Hazardous Weather Outlook:

Select forecast office: LOT (Chicago/Romeoville)
Set update frequency
Add to broadcast rotation



Message Scheduling:

Set rotation interval (e.g., every 15 minutes)
Configure message priority
Test playback





Creating Severe Weather Alerts (WarnGen)


Click "WarnGen" in BMH Menu
Create Warning:

Select threat type (Tornado, Severe T-storm, etc.)
Choose affected area
Review auto-generated message



Publish to Broadcast:

Click "Broadcast to WNG689"
Message enters BMH queue
Played on next broadcast cycle





Monitoring EAS-Tools


Click "EAS-Tools" in BMH Menu
Monitor Dashboard:

Active severe weather alerts
Message routing status
Broadcast queue



Manual Intervention:

Can override automatic routing
Pause/resume broadcasts
View message history






🎙️ Text-to-Speech Configuration

Paul Voice Settings

Default Configuration (config/tts-config.xml):

xml<tts_configuration>
  <voice>Paul</voice>
  <engine>VoiceText</engine>
  <language>en-US</language>
  <speed>1.0</speed>
  <pitch>1.0</pitch>
  <volume>1.0</volume>
</tts_configuration>

Customization Options

SettingRangeDefaultNotesVoicePaul, Other VoiceText voicesPaulRecommended for weatherSpeed0.5 - 2.01.0Slower = clearer, Faster = naturalPitch0.5 - 2.01.0Lower = deep, Higher = thinVolume0.0 - 1.01.00 = mute, 1.0 = full

Testing Custom Settings

bash# Edit config
nano config/tts-config.xml

# Test changes
npm run test-tts

# Listen and adjust as needed


📡 Station Information

PropertyValueStation IDWNG689Station NameValparaiso/Hebron, IndianaNWS OfficeChicago/Romeoville, Illinois/IndianaForecast AreaLOT (Chicago/Romeoville)Coverage CitiesValparaiso, HebronCoverage CountyPulaski County (Indiana)Broadcast TypeNOAA Weather Radio (NWR)TTS VoicePaul (VoiceText)Primary LanguageJavaScript (Node.js)LicenseMIT


🔧 Configuration Files

station-wng689.xml

xml<?xml version="1.0" encoding="UTF-8"?>
<station>
  <id>WNG689</id>
  <name>Valparaiso/Hebron, Indiana</name>
  <nws_office>Chicago/Romeoville</nws_office>
  <nws_forecast_area>LOT</nws_forecast_area>
  <state>Indiana</state>
  <coverage_area>
    <city>Valparaiso</city>
    <city>Hebron</city>
  </coverage_area>
  <enabled>true</enabled>
  <tts_voice>Paul</tts_voice>
  <tts_engine>VoiceText</tts_engine>
</station>

pronunciations.json

json{
  "pronunciations": [
    {
      "word": "Pulaski County",
      "pronunciation": "puh-LAS-kee",
      "location": "Indiana"
    },
    {
      "word": "Valparaiso",
      "pronunciation": "val-puh-RAY-zo",
      "location": "Indiana"
    }
  ]
}


🛠️ API Reference

JavaScript Functions

BMH Menu Controller

javascript// Initialize BMH Menu
bmhMenu.init(stationId)

// Get current station
bmhMenu.getStation()

// Start broadcast cycle
bmhMenu.startBroadcastCycle()

// Stop broadcast cycle
bmhMenu.stopBroadcastCycle()

Text-to-Speech

javascript// Speak text with Paul Voice
tts.speak("Pulaski County", { voice: "Paul" })

// Test TTS
tts.test("Hello, this is a weather broadcast")

// Get available voices
tts.getVoices()

Pronunciations

javascript// Add pronunciation
pronunciations.add("Pulaski County", "puh-LAS-kee")

// Get pronunciation
pronunciations.get("Pulaski County")

// Get all pronunciations
pronunciations.getAll()

// Delete pronunciation
pronunciations.delete("Pulaski County")

Broadcast Cycle

javascript// Start cycle
broadcastCycle.start(config)

// Stop cycle
broadcastCycle.stop()

// Add message
broadcastCycle.addMessage(message)

// Get current message
broadcastCycle.getCurrentMessage()

WarnGen

javascript// Create warning
warngen.createWarning({ type: "tornado", area: "LOT" })

// Broadcast warning
warngen.broadcast(warningId, stationId)

// Get warning history
warngen.getHistory()

EAS-Tools

javascript// Monitor alerts
easTools.monitorAlerts()

// Get active alerts
easTools.getActiveAlerts()

// Process alert
easTools.processAlert(alertId)


📚 Documentation


INSTALLATION.md - Step-by-step setup guide
USAGE.md - How to use BMH Menu features
CONFIGURATION.md - Configuration reference
TTS-SETUP.md - Text-to-Speech configuration
AWIPS-INTEGRATION.md - AWIPS CAVE D2D integration
TROUBLESHOOTING.md - Common issues and solutions
API-REFERENCE.md - Complete API documentation



🧪 Testing

Run tests:

bashnpm test

Test specific component:

bashnpm test -- bmh-menu.test.js
npm test -- tts-voicetext.test.js

Test TTS:

bashnpm run test-tts


🐛 Troubleshooting

TTS Not Working

bash# Test TTS
npm run test-tts

# Check VoiceText installation
npm list voicetext

# Reinstall if needed
npm install voicetext --save

WNG689 Station Not Found


Verify config/station-wng689.xml exists
Restart AWIPS CAVE D2D
Check AWIPS logs


EAS-Tools Not Receiving


Verify network connectivity
Check config/eas-tools-config.xml
Review firewall settings


See TROUBLESHOOTING.md for detailed solutions.


🤝 Contributing

Contributions welcome! Please:


Fork the repository
Create feature branch: git checkout -b feature/your-feature
Commit changes: git commit -m "Add your feature"
Push branch: git push origin feature/your-feature
Submit pull request



📄 License

MIT License - See LICENSE file for details

Copyright (c) 2026 nicholasgville23

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...


📞 Support & Contact


GitHub Issues: Report bugs or request features
Discussions: Ask questions and share ideas
NWS Chicago/Romeoville: https://www.weather.gov/lot/



🔗 External Resources


AWIPS Documentation: https://www.ncei.noaa.gov/products/advanced-weather-interactive-processing-system-awips/
NWS Chicago/Romeoville: https://www.weather.gov/lot/
NOAA Weather Radio: https://www.weather.gov/wrh/Climate
VoiceText Documentation: https://voicetext.jp/api/
Node.js Documentation: https://nodejs.org/docs/
GitHub Guides: https://guides.github.com/



📊 Status & Version


Current Version: 1.0.0
Status: Active Development ✅
Last Updated: July 2026
Stability: Production Ready



🎯 Roadmap


 Add GitHub Actions CI/CD pipeline
 Implement WebSocket support for real-time updates
 Create GUI frontend (Electron/React)
 Add database support (PostgreSQL)
 Multi-language support
 Advanced scheduling features
 Mobile app integration
 Analytics dashboard



👨‍💻 Author

dondaplayer1
GitHub: @nicholasgville23
Repository: AWIPS-Broadcast-Message-Handler-BMH-Menu


🙏 Acknowledgments


National Weather Service (NWS) Chicago/Romeoville
AWIPS CAVE D2D development team
VoiceText (TTS) framework
Node.js and open-source community



Made with ❤️ for Weather Radio Broadcasting


Quick Links


🏠 Repository Home
📖 Documentation
🐛 Report Issues
💬 Discussions
⭐ Star Repository
