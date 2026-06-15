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


Cypress.Commands.add('createGoal', (goalName) => {
    return cy.request({
      method: 'POST',
      url: `/team/${Cypress.env('teamId')}/goal`,
      headers: {
        Authorization: Cypress.env('token')
      },
      body: {
        name: goalName,
        description: 'Created by Cypress',
        multiple_owners: false
      }
    });
  });
  
  Cypress.Commands.add('getGoal', (goalId) => {
    return cy.request({
      method: 'GET',
      url: `/goal/${goalId}`,
      headers: {
        Authorization: Cypress.env('token')
      }
    });
  });
  
  Cypress.Commands.add('updateGoal', (goalId, name) => {
    return cy.request({
      method: 'PUT',
      url: `/goal/${goalId}`,
      headers: {
        Authorization: Cypress.env('token')
      },
      body: {
        name
      }
    });
  });
  
  Cypress.Commands.add('deleteGoal', (goalId) => {
    return cy.request({
      method: 'DELETE',
      url: `/goal/${goalId}`,
      headers: {
        Authorization: Cypress.env('token')
      }
    });
  });