#!/bin/bash

# Function to open Arduino IDE and connect to the correct serial port
open_arduino() {
    local arduino_file="$1"
    
    if command -v arduino &> /dev/null; then
        # Open Arduino IDE
        arduino "$arduino_file" &
        ARDUINO_PID=$!
        sleep 5 # Wait for Arduino IDE to load

        # Set the serial port manually (e.g., /dev/ttyACM0 for Arduino Micro)
        # You can adjust the serial port selection logic if needed, but it's generally handled automatically
        echo "Please ensure the correct serial port is selected in the Arduino IDE before proceeding."
        sleep 2
        
        # Automatically open the Serial Monitor
        xdotool search --name "Arduino" windowactivate --sync key ctrl+shift+m
    else
        echo "Arduino IDE is not installed. Please install it first."
        exit 1
    fi
}

# Function to open Chromium in fullscreen with the specified link
open_chromium() {
    local url="$1"
    
    if command -v chromium-browser &> /dev/null; then
        chromium-browser --start-fullscreen "$url" &
        CHROMIUM_PID=$!
        wait $CHROMIUM_PID
    else
        echo "Chromium is not installed. Please install it first."
        exit 1
    fi
}

# Main script execution
main() {
    local arduino_file="/home/vr/Desktop/MouseWithSensor/MouseWithSensor.ino"  # Correct Arduino file path
    local url="https://logicgatesvr.netlify.app"  # URL to open in Chromium

    # Open Arduino IDE and connect to the serial port
    open_arduino "$arduino_file"

    # After opening Arduino, open Chromium directly
    open_chromium "$url"
}

# Ensure DISPLAY is set to the correct screen
export DISPLAY=:0

# Run the main function
main
