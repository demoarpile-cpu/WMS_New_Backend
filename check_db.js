const { sequelize, OrderItem, PickList } = require('./models');

async function fixOrderItems() {
  try {
    const items = await OrderItem.findAll({ where: { warehouseId: null } });
    console.log(`Found ${items.length} OrderItems with null warehouseId`);
    
    for (const item of items) {
      // Try to get warehouseId from the PickList for this salesOrderId
      const pickList = await PickList.findOne({ where: { salesOrderId: item.salesOrderId } });
      const warehouseId = pickList ? pickList.warehouseId : 1; // Default to 1 if no picklist
      await item.update({ warehouseId });
      console.log(`Updated OrderItem ${item.id} with warehouseId ${warehouseId}`);
    }
    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
fixOrderItems();
