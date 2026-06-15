/// <reference types="cypress" />

describe('Test for Goals API', () => {

  it('Send GET request to goals returns 200', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.clickup.com/api/v2/team/90121741695/goal',
      headers: {
         'Authorization': 'pk_302406757_XB354UV7CD6NGQME70U9WK3UFUV9SWXT'
      }

  })
})
describe('Goals API', () => {

  let goalId;
  const goalName = `Goal_${Date.now()}`;
  const updatedGoalName = `Updated_Goal_${Date.now()}`;

  afterEach(() => {
    if (goalId) {
      cy.deleteGoal(goalId);
    }
  });

  it('Full Goal lifecycle', () => {

    // CREATE
    cy.createGoal(goalName)
      .then((response) => {

        expect(response.status).to.eq(200);

        goalId = response.body.goal.id;

        expect(response.body.goal.name)
          .to.eq(goalName);

        // GET
        return cy.getGoal(goalId);
      })
      .then((response) => {

        expect(response.status).to.eq(200);

        expect(response.body.goal.id)
          .to.eq(goalId);

        expect(response.body.goal.name)
          .to.eq(goalName);

        // UPDATE
        return cy.updateGoal(
          goalId,
          updatedGoalName
        );
      })
      .then((response) => {

        expect(response.status).to.eq(200);

        expect(response.body.goal.name)
          .to.eq(updatedGoalName);

        // VERIFY UPDATE
        return cy.getGoal(goalId);
      })
      .then((response) => {

        expect(response.body.goal.name)
          .to.eq(updatedGoalName);

        // DELETE
        return cy.deleteGoal(goalId);
      })
      .then((response) => {

        expect(response.status).to.eq(200);

        goalId = null;
      });
  });

  it('Should not get goal with invalid token', () => {

    cy.createGoal(goalName)
      .then((response) => {

        goalId = response.body.goal.id;

        return cy.request({
          method: 'GET',
          url: `/goal/${goalId}`,
          failOnStatusCode: false,
          headers: {
            Authorization: 'invalid_token'
          }
        });
      })
      .then((response) => {

        expect(response.status).to.eq(401);
      });
  });

});
})
