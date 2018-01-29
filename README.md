# Sensor comparison

This repository contains code that downloads sensor data from MojVozduh and ThingSpeak, as well
as a frontend that displays a comparison chart between them.

# Instructions

To start the frontend (assuming you have nodejs installed)

    cd frontend
    npm install
    npm start

To fetch new data

    cd datafetch
    npm install
    ./fetch-mojvozduh.sh
    ./fetch-othersensor.sh

The frontend (if running) will automatically refresh to show the latest results
