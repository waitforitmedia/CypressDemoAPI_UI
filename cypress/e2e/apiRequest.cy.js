const endPoint = "http://localhost:3000/devices";

const devicesObject = {
  id: "e8okoP2l5",
  system_name: "DESKTOP-SMART",
  type: "WINDOWS_WORKSTATION",
  hdd_capacity: "110",
};

const addDevice = (devicesObject) => {
  cy.request("POST", endPoint, devicesObject);
};

describe("Test1", () => {
  it("AddDevice.", () => {
    addDevice(devicesObject);
  });
});
