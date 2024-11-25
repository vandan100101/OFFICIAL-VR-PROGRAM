#!/bin/bash

# Function to display a cool loading screen with progress and messages
show_loading_screen() {
    local message="$1"
    
    (
        for i in {1..100}; do
            echo "$i"
            sleep 0.1
        done
    ) | yad --progress --title "Loading..." --text="$message" \
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
        # Show loading screen for Arduino IDE and port detection
        show_loading_screen "Opening Arduino IDE and detecting serial port..."
        
        # Detect the serial port
        detect_serial_port
        
        # Open Arduino IDE with the file
        arduino "$arduino_file" &
        ARDUINO_PID=$!
        sleep 5 # Wait for Arduino IDE to load
        
        # Modify preferences.txt to set the correct serial port (automate selection)
        sed -i "s|^serial.port=.*|serial.port=\"$SERIAL_PORT\"|" ~/.arduino15/preferences.txt
        
        # Open the Serial Monitor using xdotool (simulate Ctrl+Shift+M)
        xdotool search --name "Arduino" windowactivate --sync key ctrl+shift+m
        
        # Wait for the Arduino IDE to be closed by the user (keeps the window open)
        wait $ARDUINO_PID
    else
        echo "Arduino IDE is not installed. Please install it first."
        exit 1
    fi
}

# Open Chromium in fullscreen with the specified link
open_chromium() {
    local url="$1"
    
    if command -v chromium-browser &> /dev/null; then
        # Show loading screen for opening Chromium
        show_loading_screen "Opening Chromium and navigating to $url..."
        
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

    # Launch Arduino IDE and wait for it to open
    open_arduino "$arduino_file"

    # Launch Chromium in fullscreen mode and wait for it to open
    open_chromium "$url"
}

# Ensure DISPLAY is set to the correct screen
export DISPLAY=:0

# Run the main function
main
