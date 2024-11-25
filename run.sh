#!/bin/bash

# Function to display a loading screen with a progress bar
show_loading_screen() {
    (
        echo "10" ; sleep 1
        echo "20" ; sleep 1
        echo "30" ; sleep 1
        echo "40" ; sleep 1
        echo "50" ; sleep 1
        echo "60" ; sleep 1
        echo "70" ; sleep 1
        echo "80" ; sleep 1
        echo "90" ; sleep 1
        echo "100" ; sleep 1
    ) | yad --progress --title "Loading..." --text="Starting Arduino and Chromium. Please wait..." \
        --percentage=0 --auto-close --borders=10 --center --no-buttons --width=300 --height=100
}

# Detect the connected Arduino serial port
detect_serial_port() {
    local port=$(dmesg | grep -oP '(?<=ttyACM)[0-9]+' | head -n 1)
    
    if [[ -z "$port" ]]; then
        echo "No Arduino device detected. Make sure your Arduino is connected."
        exit 1
    fi

    SERIAL_PORT="/dev/ttyACM$port"
    echo "Detected Arduino at $SERIAL_PORT"
}

# Open the Arduino IDE and automatically select the detected serial port
open_arduino() {
    local arduino_file="$1"
    
    if command -v arduino &> /dev/null; then
        # Detect the serial port
        detect_serial_port
        
        # Open Arduino IDE with the file
        arduino "$arduino_file" &
        ARDUINO_PID=$!
        sleep 5 # Wait for Arduino IDE to load
        
        # Modify preferences.txt to set the correct serial port (automate selection)
        sed -i "s|^serial.port=.*|serial.port=\"$SERIAL_PORT\"|" ~/.arduino15/preferences.txt
        
        # Open the Serial Monitor using xdotool
        xdotool search --name "Arduino" windowactivate --sync key ctrl+shift+m
    else
        echo "Arduino IDE is not installed. Please install it first."
        exit 1
    fi
}

# Open Chromium in fullscreen with the specified link
open_chromium() {
    local url="$1"
    
    if command -v chromium-browser &> /dev/null; then
        # Adding a small delay to ensure Arduino IDE has initialized
        sleep 2
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

    # Show the loading screen
    show_loading_screen

    # Launch Arduino IDE and wait for it to open
    open_arduino "$arduino_file"

    # Launch Chromium in fullscreen mode and wait for it to open
    open_chromium "$url"
}

# Ensure DISPLAY is set to the correct screen
export DISPLAY=:0

# Run the main function
main
