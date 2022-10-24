// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { randomString } from "./../support/functions";

const endPoint = "http://localhost:3000/devices";

const devicesObject = {
  id: "SiNh_HmqQ",
  system_name: "DESKTOP-SMART",
  type: "WINDOWS_WORKSTATION",
  hdd_capacity: "110",
};

Cypress.Commands.add("intercept_listOfDevices", () => {
  cy.intercept("GET", endPoint).as("interceptDevices");
});

Cypress.Commands.add("Add_New_Devices_WINDOWSWORKSTATION", () => {
  let newMail = "System " + randomString(5);
  let testNumber = "1234";
  const retrieveTheListOfDevices = {
    NewDeviceButton: "ADD DEVICE",
    SystemNameField: "#system_name",
    HddCapacityField: "#hdd_capacity",
    SubmitButton: ".submitButton",
  };

  cy.contains(retrieveTheListOfDevices.NewDeviceButton).click();
  cy.get(retrieveTheListOfDevices.SystemNameField).type(newMail);
  cy.get(retrieveTheListOfDevices.HddCapacityField).type(testNumber);
  cy.get(retrieveTheListOfDevices.SubmitButton).click();
  cy.contains(newMail).should("exist");
  cy.contains(testNumber).should("exist");
});

Cypress.Commands.add("Add_New_Devices_WINDOWSWORKSTATION_API", () => {
  const addDevice = (devicesObject) => {
    cy.request("POST", endPoint, devicesObject);
  };

  //Create Device
  addDevice(devicesObject);
  //Validate ID Device
  cy.request("GET", `${endPoint}/${devicesObject.id}`);
});

Cypress.Commands.add("Edit_Devices_WINDOWSWORKSTATION_API", () => {
  const patchObject = {
    id: `${devicesObject.id}`,
    system_name: "DESKTOP-SMART",
    type: "WINDOWS_WORKSTATION",
    hdd_capacity: "11",
  };
  const editDevice = (patchObject) => {
    cy.request("PATCH", `${endPoint}/${patchObject.id}`, patchObject);
  };

  editDevice(patchObject);
  cy.request("GET", `${endPoint}/${patchObject.id}`);
});

Cypress.Commands.add("ValidateButtons", () => {
  cy.get(".device-options > .device-remove").eq(0).should("be.enabled");
  cy.get(".device-options > .device-edit").eq(0).should("be.enabled");
});
