const db = require('../_helpers/db');
const sendEmail = require('../_helpers/send-email');
module.exports = {
getAll,
getById,
create,
update,
delete: _delete
};

async function getAll() {
const products = await db.Product.findAll();
return products.map(x => basicDetails(x));
}

async function getById(id) {
const product = await getProduct(id);
return basicDetails(product);
}

async function create(params) {
const product = new db.Product(params);
await product.save();
return basicDetails(product);
}

async function update(id, params) {
const product = await getProduct(id);
Object.assign(product, params);
await product.save();
return basicDetails(product);
}

async function _delete(id) {
const product = await getProduct(id);
await product.destroy();
}

// helper functions

async function getProduct(id) {
const product = await db.Product.findByPk(id);
if (!product) throw 'Product not found';
return product;
}

function basicDetails(product) {
const { id, name, description, price } = product;
return { id, name, description, price };
}

async function sendProductUploadedmail(email) {
    let message = `<p>If it wasnt you, kindly check your account security. Change your password. contact admins.</p>`;

    await sendEmail({
        to: email,
        subject: 'ERP APP Products Managment - Product Uploaded Successfully',
        html: `<h4>Product Uploaded</h4>
               <p>Product ${product} is uploaded by your email <strong>${email}</strong>.</p>
               ${message}`
    });
}