/// <reference types="Cypress" />

describe("Dynamic Table Test Scenario", () => {
    const tableData = [
        { 
            "name": "Bob",
            "age": 20,
            "gender": "male" 
        },
        { 
            "name": "George",
            "age": 42,
            "gender": "male"
        },
        {
            "name":"Sara",
            "age": 42,
            "gender": "female"
        },
        {
            "name": "Conor",
            "age": 40,
            "gender": "male"
        },
        {
            "name":"Jennifer",
            "age": 42,
            "gender": "female"
        }]

        it("Should population and validate the dynamic table data", ()=>{
            // Step 1 : Visit the URL
            cy.visit("https://testpages.herokuapp.com/styled/tag/dynamic-table.html");

            // Step : 2 Click on the Table Data button to revel input box
            cy.contains("Table Data").click();

            // Step : 3 Type the table data into the input filed and click on the Refresh Button
            cy.get("textarea").clear().type(JSON.stringify(tableData),{ parseSpecialCharSequences: false });
            cy.get("#refreshtable").click();

            // Step : 3 Assert the Table that visible or not 
            cy.get("#dynamictable").should("be.visible");

            // Step : 4 Check the number of rows that contain in table 
            cy.get("#dynamictable tr").should("have.length", tableData.length+1);
            
            // Stpe : 5 Assert the populated data matches the input data 
            tableData.forEach((data, index)=>{
                cy.get("#dynamictable tr").eq(index+1).within(()=>{
                    cy.get('td').eq(0).should("have.text", data.name);
                    cy.get('td').eq(1).should("have.text", data.age);
                    cy.get('td').eq(2).should("have.text", data.gender);                    
                })
            })
        })
})