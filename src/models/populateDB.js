require("dotenv").config({path:"./.env"})
const { Client } = require("pg")

const SQL = `

DROP TABLE inventory;
CREATE TABLE inventory (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
partno VARCHAR(30),  name TEXT, category VARCHAR(20), description TEXT, manufacturer VARCHAR(20), 
value VARCHAR(50), datasheet_url TEXT);

INSERT INTO inventory (partno, name, category, description, manufacturer, value, datasheet_url) VALUES
('ATMEGA328P-PU', 'ATmega328P Microcontroller', 'microcontroller', '8-bit AVR microcontroller with 32KB ISP flash, commonly used in Arduino boards.', 'Microchip Technology', '5V', 'https://www.microchip.com/wwwproducts/en/ATmega328P'),
('LM358N', 'LM358 Dual Op-Amp', 'opamp', 'Low power dual operational amplifier, widely used for general-purpose amplification.', 'Texas Instruments', 'Dual Op-Amp', 'https://www.ti.com/product/LM358'),
('1N4007', '1N4007 Rectifier Diode', 'diode', 'Standard 1A, 1000V general-purpose rectifier diode.', 'ON Semiconductor', '1A, 1000V', 'https://www.onsemi.com/products/discretes-logic-and-fets/diodes/standard-rectifier-diodes/1n4007'),
('CRCW080510K0FKEA', '10kΩ Resistor (SMD 0805)', 'resistor', 'Surface mount (SMD) thick film resistor, 0805 package, 10 kOhms.', 'Vishay', '10kΩ', 'https://www.vishay.com/docs/20035/crcw.pdf'),
('C0805C104K5RACTU', '0.1µF Ceramic Capacitor (SMD 0805)', 'capacitor', 'Surface mount (SMD) ceramic capacitor, 0805 package, 0.1 microfarad.', 'KEMET', '0.1µF', 'https://content.kemet.com/datasheets/KEM_C1001_MLCC_SMD_CommX7R.pdf'),
('ESP32-WROOM-32', 'ESP32 Wi-Fi/BT Module', 'microcontroller', 'Powerful Wi-Fi and Bluetooth module, popular for IoT applications.', 'Espressif Systems', '3.3V', 'https://www.espressif.com/sites/default/files/documentation/esp32-wroom-32_datasheet_en.pdf'),
('NE555P', 'NE555 Timer IC', 'ic', 'Highly stable timer IC capable of producing accurate time delays or oscillation.', 'ST Microelec.', '5V-15V', 'https://www.st.com/resource/en/datasheet/ne555.pdf'),
('BC547', 'BC547 NPN Transistor', 'transistor', 'General purpose NPN bipolar junction transistor.', 'NXP Semicon.', '50V, 100mA', 'https://www.nexperia.com/docs/data_sheet/BC547_SER.pdf'),
('LED5MM-RED', '5mm Red LED', 'diode', 'Standard 5mm diffused red LED indicator.', 'Generic', '2V, 20mA', 'https://www.sparkfun.com/datasheets/Components/LED/COM-09590-5mm-Red-LED.pdf'),
('MCP3008-I/P', 'MCP3008 ADC', 'ic', '10-bit Analog-to-Digital Converter with SPI interface.', 'Microchip Technology', '2.7V-5.5V', 'https://www.microchip.com/wwwproducts/en/MCP3008'),
('2N3904', '2N3904 NPN Transistor', 'transistor', 'General purpose NPN transistor, commonly used for switching and amplification.', 'Fairchild Semi.', '40V, 200mA', 'https://www.onsemi.com/pub/Collateral/2N3904-D.PDF'),
('470uF-50V', '470µF Electrolytic Capacitor', 'capacitor', 'Radial electrolytic capacitor, 470 microfarads, 50V rating.', 'Rubycon', '470µF, 50V', 'https://www.rubycon.com/wp-content/uploads/2021/07/us_yk.pdf'),
('AD8220ARZ', 'AD8220 Instrumentation Amp', 'opamp', 'Low cost, high performance instrumentation amplifier.', 'Analog Devices', '5V-36V', 'https://www.analog.com/media/en/technical-documentation/data-sheets/AD8220.pdf'),
('CRCW0603100RFKEA', '100Ω Resistor (SMD 0603)', 'resistor', 'Surface mount (SMD) thick film resistor, 0603 package, 100 Ohms.', 'Yageo', '100Ω', 'https://www.yageo.com/en/ProductDetail/CRCW0603100RFKEA'),
('HC-SR04', 'Ultrasonic Sensor Module', 'sensor', 'Measures distance using ultrasonic waves, common for robotics.', 'Generic', '5V', 'https://cdn.sparkfun.com/datasheets/Sensors/Proximity/HCSR04.pdf');



`;

async function main(){
    console.log("...seeding")
    const client = new Client({connectionString:process.env.DB})
    await client.connect()
    await client.query(SQL)
    await client.end()
    console.log("done")
}

main()