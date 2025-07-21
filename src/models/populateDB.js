require("dotenv").config({path:"./.env"})
const { Client } = require("pg")

const SQL = `

DROP TABLE inventory;
CREATE TABLE inventory (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
partno VARCHAR(30),  name TEXT, category VARCHAR(20), description TEXT, manufacturer VARCHAR(20), 
value VARCHAR(50), datasheet_url TEXT);

INSERT INTO inventory (partno, name, category, description, manufacturer, value, datasheet_url) VALUES
('ATMEGA328P-PU', 'ATmega328P Microcontroller', 'Microcontroller', '8-bit AVR microcontroller with 32KB ISP flash, commonly used in Arduino boards.', 'Microchip Technology', '5V', 'https://www.microchip.com/wwwproducts/en/ATmega328P'),
('LM358N', 'LM358 Dual Op-Amp', 'Op Amp', 'Low power dual operational amplifier, widely used for general-purpose amplification.', 'Texas Instruments', 'Dual Op-Amp', 'https://www.ti.com/product/LM358'),
('1N4007', '1N4007 Rectifier Diode', 'Diode', 'Standard 1A, 1000V general-purpose rectifier diode.', 'ON Semiconductor', '1A, 1000V', 'https://www.onsemi.com/products/discretes-logic-and-fets/diodes/standard-rectifier-diodes/1n4007'),
('CRCW080510K0FKEA', '10kΩ Resistor (SMD 0805)', 'Resistor', 'Surface mount (SMD) thick film resistor, 0805 package, 10 kOhms.', 'Vishay', '10kΩ', 'https://www.vishay.com/docs/20035/crcw.pdf'),
('C0805C104K5RACTU', '0.1µF Ceramic Capacitor (SMD 0805)', 'Capacitor', 'Surface mount (SMD) ceramic capacitor, 0805 package, 0.1 microfarad.', 'KEMET', '0.1µF', 'https://content.kemet.com/datasheets/KEM_C1001_MLCC_SMD_CommX7R.pdf');

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