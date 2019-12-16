describe('snapshot tests', () => {
  it('iterates data and correctly creates snapshots', () => {
    /**
     * Array of { user: '...', pass: '...' } entries.
     */
    const data = [];

    data.forEach(item => {
      cy.visit('/prihlaseni')
        .then(() => {
          cy.get('input#email').type(item.user);
          cy.get('input#password').type(item.pass);
          cy.get('#s_block > div > div.el-col.el-col-24.el-col-sm-14.el-col-md-12 > div > form > button').click();
          cy.url().should('contain', '/faktura');

          cy.get('a:contains("Vystavené faktury")').click();
          cy.document().toMatchImageSnapshot();

          cy.clearLocalStorage();
          cy.clearCookies();
        });
    });
  });
});
