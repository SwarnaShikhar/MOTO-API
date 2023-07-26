const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    const { brand, model, price, engine, mileage, year, sort, select } = req.query;
    const queryObject = {};

    if (brand) {
        queryObject.brand = {$regex:brand, $options:"i"};
    }
    if (model) {
        queryObject.model = {$regex:model, $options:"i"};
    }
    if (price) {
        queryObject.price = price;
    }
    if (engine) {
        queryObject.engine = engine;
    }
    if (mileage) {
        queryObject.mileage = mileage;
    }
    if (year) {
        queryObject.year = year;
    }

    let apiData = Product.find(queryObject);

    if(sort){
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
    }

    if(select){
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 30;

    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);

    const motoData = await apiData;
    res.status(200).json({ motoData });
};

module.exports = { getAllProducts};