export class rowModel {
  constructor(values) {
    this.rawData = values[0];
    this.date = this.rawData[0];
    this.time = this.rawData[1] ? convertTimeString(this.rawData[1]) : "-";
    this.temperature = String(this.rawData[2]).concat("°C");
    this.humidity = String(this.rawData[3]).concat("%");
    this.ppm2_5 = String(this.rawData[4]).concat("µg/m³");
    this.ppm10 = String(this.rawData[5]).concat("µg/m³");
    this.co = String(this.rawData[6]).concat("mg/m³");
    this.co2 = String(this.rawData[7]).concat("ppm");
    this.nh3 = String(this.rawData[8]).concat("µg/m³");
  }
  
  getTemperatureColor() {
    const tempValue = parseFloat(String(this.rawData[2]).replace(",","."));
    let styleString = "style='color: ";
    if (tempValue >= 40)  styleString+="red;"
    else if (tempValue > 32)  styleString+="orange;"
    else if (tempValue < 20)  styleString+="lightblue;";
    else  styleString+="lime;";
    return styleString+"'";
  }

  getPpm2_5Color(){
    const ppmValue = parseFloat(String(this.rawData[4]).replace(",","."));
    let styleString = "style='color: ";
    if(ppmValue > 25) styleString+="red;"
    else if(ppmValue > 10)  styleString+="orange;"
    else  styleString+="lime;";
    return styleString+"'";
  }

  getPpm10Color(){
    const ppmValue = parseFloat(String(this.rawData[5]).replace(",","."));
    let styleString = "style='color: ";
    if(ppmValue > 40) styleString+="red;"
    else if(ppmValue > 20)  styleString+="orange;"
    else  styleString+="lime;";
    return styleString+"'";
  }

  getCoColor(){
    const coValue = parseFloat(String(this.rawData[6]).replace(",","."));
    let styleString = "style='color: ";
    if(coValue > 50) styleString+="red;"
    else if(coValue > 40)  styleString+="orange;"
    else  styleString+="lime;";
    return styleString+"'";
  
  }

  getCo2Color(){
    const co2Value = parseFloat(String(this.rawData[7]).replace(",","."));
    let styleString = "style='color: ";
    if(co2Value > 2000) styleString+="red;"
    else if(co2Value > 1400)  styleString+="orange;"
    else  styleString+="lime;";
    return styleString+"'";
  }

  getNh3Color(){
    const nh3Value = parseFloat(String(this.rawData[8]).replace(",","."));
    let styleString = "style='color: ";
    if(nh3Value > 50) styleString+="red;"
    else if(nh3Value > 35)  styleString+="orange;"
    else  styleString+="lime;";
    return styleString+"'";
  
  }
}


function convertTimeString(timeString) {
  // Split the time string into hours, minutes, seconds, and AM/PM
  const [time, period] = timeString.split(" ");
  const [hours, minutes, seconds] = time.split(":");

  // Convert hours to 24-hour format
  let convertedHours = parseInt(hours, 10);
  if (period === "PM" && convertedHours !== 12) {
    convertedHours += 12;
  } else if (period === "AM" && convertedHours === 12) {
    convertedHours = 0;
  }

  // Format the time components with leading zeros
  const formattedHours = convertedHours.toString().padStart(2, "0");
  const formattedMinutes = minutes.padStart(2, "0");
  const formattedSeconds = seconds.padStart(2, "0");

  // Create the Italian-formatted time string
  const italianTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

  return italianTime;
}
