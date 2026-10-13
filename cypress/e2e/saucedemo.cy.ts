describe('SauceDemo - Rastreio de Ofertas (< $20)', () => {
  it('Deve fazer login e filtrar itens abaixo de $20.00', () => {
    cy.visit('/');
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.url().should('include', '/inventory.html');

    cy.get('.inventory_item').then(($items) => {
      const produtosAbaixoDe20: { nome: string; preco: string }[] = [];

      $items.each((index, item) => {
        const nome = Cypress.$(item).find('.inventory_item_name').text().trim();
        const precoTexto = Cypress.$(item).find('.inventory_item_price').text().trim();
        const precoNumerico = parseFloat(precoTexto.replace('$', ''));

        if (precoNumerico < 20.00) {
          produtosAbaixoDe20.push({ nome, preco: precoTexto });
        }
      });

      console.log('--- PRODUTOS ABAIXO DE $20.00 ---');
      produtosAbaixoDe20.forEach((p) => {
        console.log(`Produto: ${p.nome} | Preço: ${p.preco}`);
      });

      expect(produtosAbaixoDe20.length).to.be.greaterThan(0);
    });
  });
});