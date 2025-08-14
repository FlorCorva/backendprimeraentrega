import Product from '../dao/models/product.model.js';

class ProductManagerMongo {
  async getAll({ limit = 10, page = 1, sort, query } = {}) {
    let filter = {};
    if (query) {
      filter = { $or: [{ category: query }, { status: query }] };
    }

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
      lean: true
    };

    return await Product.paginate(filter, options);
  }

  async getById(id) {
    return await Product.findById(id).lean();
  }

  async addProduct(productData) {
    const product = new Product(productData);
    return await product.save();
  }

  async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async deleteProduct(id) {
    const res = await Product.findByIdAndDelete(id);
    return !!res;
  }
}

export default ProductManagerMongo;
