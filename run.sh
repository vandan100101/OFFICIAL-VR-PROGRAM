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

# Open the Arduino IDE and access the Serial Monitor
open_arduino() {
    local arduino_file="$1"
    
    if command -v arduino &> /dev/null; then
        arduino "$arduino_file" &
        ARDUINO_PID=$!
        wait $ARDUINO_PID
        sleep 2 # Allow Arduino to fully open

        # Open the Serial Monitor (if the window is open)
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
    local arduino_file="/home/vr/Desktop/MouseWithSensor/MouseWithSensor.ino" # Correct Arduino file path
    local url="https://logicgatesvr.netlify.app"

    # Show the loading screen
    show_loading_screen

    # Launch Arduino IDE and wait for it to open
    open_arduino "$arduino_file"

    # Launch Chromium in fullscreen mode and wait for it to open
    open_chromium "$url"
}

# Run the main function
main
