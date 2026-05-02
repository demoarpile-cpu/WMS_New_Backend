const { Product, ProductStock } = require('./models');
const { Op } = require('sequelize');

async function checkStock() {
    try {
        const product = await Product.findOne({ where: { sku: '6767' } });
        if (!product) {
            console.log('Product not found');
            return;
        }
        console.log(`Product: ${product.name} (ID: ${product.id})`);

        const stocks = await ProductStock.findAll({
            where: { productId: product.id }
        });

        console.log('Stock Records:');
        stocks.forEach(s => {
            console.log(`- WH: ${s.warehouseId}, Loc: ${s.locationId}, Client: ${s.clientId}, Qty: ${s.quantity}, Res: ${s.reserved}`);
        });
    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

checkStock();
