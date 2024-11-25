#!/bin/bash

# Function to display a GUI loading screen
show_loading_screen() {
    yad --title "Loading..." --text="Starting Arduino and Chromium. Please wait..." \
        --center --borders=10 --fixed --timeout=5 --no-buttons --width=300 --height=100
}

# Open the Arduino file and access the Serial Monitor
open_arduino() {
    local arduino_file="$1"
    arduino --open "$arduino_file" & # Open the Arduino file
    sleep 5 # Allow time for Arduino to open

    # Access the Serial Monitor
    xdotool search --name "Arduino" windowactivate --sync \
        key ctrl+shift+m
}

# Open Chromium with the specified link in fullscreen
open_chromium() {
    local url="$1"
    chromium --start-fullscreen "$url" &
}

# Main script execution
main() {
    local arduino_file="$HOME/your_sketch.ino" # Change to your Arduino file path
    local url="https://logicgatesvr.netlify.app"

    # Show the loading screen
    show_loading_screen

    # Launch Arduino and Serial Monitor
    open_arduino "$arduino_file"

    # Launch Chromium in fullscreen with the specified link
    open_chromium "$url"
}

# Run the main function
main
