const { ElasticMigration } = require('elastic-migrate');

class M20221113052755_init extends ElasticMigration {
  async up() {
    await this.createIndex('products', {
      mappings: {
        properties: {
          id: {
            type: 'text',
          },
          sku: {
            type: 'text',
          },
          shortCode: {
            type: 'text',
          },
          barcode: {
            type: 'text',
          },
          name: {
            type: 'text',
          },
          description: {
            type: 'text',
          },
        },
      },
    });
    // await this.addAlias(ALIAS_NAME, INDEX_NAME)
    // await this.removeAlias(ALIAS_NAME, INDEX_NAME)
  }

  async down() {
    await this.removeIndex('products');
  }
}

module.exports = M20221113052755_init;
