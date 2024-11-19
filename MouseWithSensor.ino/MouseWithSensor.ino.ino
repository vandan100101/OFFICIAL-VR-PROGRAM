#include <Wire.h>
#include <MPU6050.h>
#include <Mouse.h>
#include <Keyboard.h>

MPU6050 mpu;
int16_t ax, ay, az, gx, gy, gz;
int vx = 0, vy = 0;

// Define the analog pins for the joystick
const int pinXAxis = A0;  // X-axis connected to A0
const int pinYAxis = A1;  // Y-axis connected to A1

// Define the middle point and thresholds
const int middleX = 512;  // Middle value for X-axis
const int middleY = 512;  // Middle value for Y-avoid drifxis
const int deadzone = 100;  // Deadzone to at


void setup() {
  Serial.begin(9600);
  Keyboard.begin();  // Start the keyboard library
  pinMode(5, INPUT_PULLUP);  // Left Click
  pinMode(6, INPUT_PULLUP);  // Right Click
  
  while (!Serial);  // Wait for serial connection
  delay(4000);  // Initial delay
  Serial.println("Hello, code start");
  
  Wire.begin(); 
  Serial.println("I2C begin");
  
  mpu.initialize();
  Serial.println("MPU Sensor Initializing...");
  
  if (!mpu.testConnection()) {
    Serial.println("MPU6050 connection failed!");
    while (1);  // Stay here if the sensor is not connected
  }
  
  Serial.println("Sensor initialized");
}

void loop() {
  // Read button states
  int buttonState1 = digitalRead(5); // Left click
  int buttonState2 = digitalRead(6); // Right click
  int rawX = analogRead(pinXAxis);  // Read the X-axis value
  int rawY = analogRead(pinYAxis);  // Read the Y-axis value

  // Get MPU6050 data
  mpu.getMotion6(&ax, &ay, &az, &gx, &gy, &gz);

  // Calculate velocity for smooth movement
  vx = -(gx + 260) / 200;  // Adjust divisor for sensitivity
  vy = (gz + 100) / 200;   // Adjust divisor for sensitivity

  // Apply velocity limits for smoother control
  vx = constrain(vx, -10, 10); 
  vy = constrain(vy, -10, 10);

  Serial.print("gx = ");
  Serial.print(gx);
  Serial.print(" | gz = ");
  Serial.print(gz);
  Serial.print(" | X = ");
  Serial.print(vx);
  Serial.print(" | Y = ");
  Serial.println(vy);


// Check for left movement (A)
  if (rawX < (middleX - deadzone)) {
    Keyboard.press('a');  // Press 'A'
     Mouse.move(vx, vy); // Continuous movement
  } else {
    Keyboard.release('a');  // Release 'A'
  }

  // Check for right movement (D)
  if (rawX > (middleX + deadzone)) {
    Keyboard.press('d');  // Press 'D'
    Mouse.move(vx, vy); // Continuous movement
  } else {
    Keyboard.release('d');  // Release 'D'
  }

  // Check for up movement (W)
  if (rawY < (middleY - deadzone)) {
    Keyboard.press('w');  // Press 'W'
    Mouse.move(vx, vy); // Continuous movement
  } else {
    Keyboard.release('w');  // Release 'W'
  }

  // Check for down movement (S)
  if (rawY > (middleY + deadzone)) {
    Keyboard.press('s');  // Press 'S'
    Mouse.move(vx, vy); // Continuous movement
  } else {
    Keyboard.release('s');  // Release 'S'
  }



  // Handle left mouse button
  if (buttonState1 == LOW) { // Left button pressed
    Mouse.press(MOUSE_LEFT); // Start dragging
    Mouse.move(vx, vy); // Continuous movement
  } else if (Mouse.isPressed(MOUSE_LEFT)) {
    Mouse.release(MOUSE_LEFT); // Release left button when no longer pressed
  }

  // Handle right mouse button
  if (buttonState2 == LOW) { // Right button pressed
    Mouse.press(MOUSE_RIGHT);
    delay(200); // Short debounce delay
    Mouse.release(MOUSE_RIGHT);
  }

  // Regular mouse movement
  if (buttonState1 != LOW) { // Prevent double movement during left click
    Mouse.move(vx, vy);
  }

  delay(15); // Small delay for smoother motion
}
