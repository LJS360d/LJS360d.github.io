import { rowModel } from './modules/rowModel.js';

const scriptElement = document.querySelector('script[src="retrieveData.js"]');
const averagesValue = scriptElement.getAttribute('averageValues');
$(document).ready(function () {
  gapi.load("client", initClient);

  function initClient() {
    gapi.client
      .init({
        apiKey: "AIzaSyDgIljQRxGCUxQHlNjrAcu1VgJzlsuXuhI",
        discoveryDocs: [
          "https://sheets.googleapis.com/$discovery/rest?version=v4",
        ],
      })
      .then(function () {
        // Call the function to retrieve data
        if(averagesValue)
          getDataFromSpreadsheet(averagesValue);
        else{
          getDataFromSpreadsheet()
          setInterval(getDataFromSpreadsheet, 30000)
        }
      })
      .catch(function (error) {
        console.log("Error initializing the API client:", error);
      });
  }

  // Retrieve data from the spreadsheet
  function getDataFromSpreadsheet(averageValues = false) {
    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: "1VKLqOBSLBGUFduymlqYej8PFJieUs61T0crmftldY5c",
        range: (averageValues) ? "Arduino!A2:I2" : "Arduino!A4:I4",
      })
      .then(function (response) {
        const values = new rowModel(response.result.values);
        clearContent();
        renderData(values);
      })
      .catch(function (error) {
        console.log("Error retrieving data from the spreadsheet:", error);
        getDataFromSpreadsheet(averageValues);
      });
  }

  function renderData(rowModel) {
    const contentDiv = document.querySelector(".content");
    const dataRender = document.createElement("div");
    dataRender.innerHTML = `
    <div class="data-render">
    <h2>Valori ${(averagesValue) ? "Medi" : "Attuali"}:</h2>
    <span><i class="fa-solid fa-calendar"> Data</i><span>${rowModel.date}</span></span>
    
    <span><i class="fa-solid fa-clock"> Orario</i><span>${rowModel.time}</span></span>
    
    <span><i class="fa-solid fa-temperature-quarter"> Temperatura</i><span ${rowModel.getTemperatureColor()}>${rowModel.temperature}</span></span>

    <span><i class="fa-solid fa-droplet"> Umidita'</i><span>${rowModel.humidity}</span></span>
    
    <span><i class="fa-solid fa-smog"> ppm 2.5</i><span ${rowModel.getPpm2_5Color()}>${rowModel.ppm2_5}</span></span>

    <span><i class="fa-solid fa-smog"> ppm 10</i><span ${rowModel.getPpm10Color()}>${rowModel.ppm10}</span></span>
    
    <span><i class="fa-solid fa-biohazard"> Acetone</i><span ${rowModel.getCh3Color()}>${rowModel.ch3}</span></span>
    
    <span><i class="fa-solid fa-burst"> Ammoniaca</i><span ${rowModel.getNh3Color()}>${rowModel.nh3}</span></span>
    
    <span><i class="fa-solid fa-hurricane"> Anidride Carbonica</i><span ${rowModel.getCo2Color()}>${rowModel.co2}</span></span>
    
    </div>`;
    contentDiv.appendChild(dataRender);
  }

  function clearContent() {
    const contentDiv = document.querySelector(".content");
    while (contentDiv.firstChild) {
      contentDiv.removeChild(contentDiv.lastChild);
    }
  }
});
