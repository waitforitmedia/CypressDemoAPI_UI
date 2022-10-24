describe("Test1", () => {
  it("RetrieveTheListOfDevices.", () => {
    cy.intercept_listOfDevices();
    cy.visit("/");
    cy.wait("@interceptDevices").its("response.statusCode").should("eq", 200);
    cy.Add_New_Devices_WINDOWSWORKSTATION();
    cy.Add_New_Devices_WINDOWSWORKSTATION_API();
    //Error el Edith
    cy.Edit_Devices_WINDOWSWORKSTATION_API();
    //Error el validate Button
    cy.ValidateButtons();
  });
});
