const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    "id": {
        "type": "Number",
        "unique": true
    },
    "title": {
        "type": "String"
    },
    "body_html": {
        "type": "String"
    },
    "vendor": {
        "type": "String"
    },
    "product_type": {
        "type": "String"
    },
    "created_at": {
        "type": "Date"
    },
    "handle": {
        "type": "String"
    },
    "updated_at": {
        "type": "Date"
    },
    "published_at": {
        "type": "Date"
    },
    "template_suffix": {
        "type": "String"
    },
    "status": {
        "type": "String"
    },
    "published_scope": {
        "type": "String"
    },
    "tags": {
        "type": "String"
    },
    "admin_graphql_api_id": {
        "type": "String"
    },
    "variants": {
        "type": [
            "Mixed"
        ]
    },
    "options": {
        "type": [
            "Mixed"
        ]
    },
    "images": {
        "type": [
            "Mixed"
        ]
    }
});
const productModel = mongoose.model('products', ProductSchema);
module.exports = productModel;
//# sourceMappingURL=products.model.js.map