const { Company } = require('./models');

async function check() {
  try {
    const companies = await Company.findAll({
      where: { name: 'water supply' }
    });
    console.log('Water Supply Company Details:', JSON.stringify(companies, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

check();
