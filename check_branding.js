const { Company } = require('./models');

async function check() {
  try {
    const companies = await Company.findAll();
    console.log('Companies:', JSON.stringify(companies, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

check();
