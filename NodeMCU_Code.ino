#include <DHT.h>
#include <FirebaseArduino.h>
#include <ESP8266WiFi.h>

#define FIREBASE_HOST "your link"
#define FIREBASE_AUTH "your key"

#define WIFI_SSID "Redmi Note 9 Pro"
#define WIFI_PASSWORD "013456789"

// #define RELAY_FAN_PIN 13 // ESP32 pin connected to relay
#define DHT_SENSOR_PIN 12 // ESP32 pin connected to DHT sensor
#define DHT_SENSOR_TYPE DHT22

//#define TEMP_UPPER_THRESHOLD 33 // upper temperature threshold
#define TEMP_LOWER_THRESHOLD 15 // lower temperature threshold
int RELAY_FAN_PIN = 13;
bool Fan_Status = true;

DHT dht_sensor(DHT_SENSOR_PIN, DHT_SENSOR_TYPE);

void setup() {
  Serial.begin(9600); // initialize serial
  pinMode(RELAY_FAN_PIN, OUTPUT);
  dht_sensor.begin(); // initialize the DHT sensor
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void loop() {
  float temperature = dht_sensor.readTemperature(); 
  float humidity = dht_sensor.readHumidity();

  String x = Firebase.getString("Threshold/x");
  int TEMP_UPPER_THRESHOLD = x.toInt();
  Serial.println(TEMP_UPPER_THRESHOLD);

  if (isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
  } else {
    Serial.println(temperature);
    if (temperature > TEMP_UPPER_THRESHOLD) {
      Serial.println("Turn the fan on");
      digitalWrite(RELAY_FAN_PIN, LOW); // turn on
      Fan_Status = true;
    } else if (temperature < TEMP_LOWER_THRESHOLD) {
      Serial.println("Turn the fan off");
      digitalWrite(RELAY_FAN_PIN, HIGH); // turn off
      Fan_Status = false;
    }
    else {
      digitalWrite(RELAY_FAN_PIN, HIGH);
       Fan_Status = false;
    }
  }

  // wait a 2 seconds between readings

  Firebase.setFloat("Temperature", temperature);
  Firebase.setFloat("Humidity", humidity);
  Firebase.setBool("Fan", Fan_Status);

  // handle error
  if (Firebase.failed()) {
    Serial.print("couldnt push");
    Serial.println(Firebase.error());
    return;
  }
  delay(1000);

  // update value
  Firebase.setFloat("Temperature", temperature);
  Firebase.setFloat("Humidity", humidity);
  Firebase.setBool("Fan", Fan_Status);

  // handle error
  if (Firebase.failed()) {
    Serial.print("couldnt push");
    Serial.println(Firebase.error());
    return;
  }
  delay(1000);

  // handle error
  if (Firebase.failed()) {
    Serial.print("setting /truth failed:");
    Serial.println(Firebase.error());
    return;
  }

  delay(2000);
}