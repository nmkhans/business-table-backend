const Products = require("../models/ProductModel");

const getProducts = async (req, res) => {
    const { pageno, perpage, search } = req.query;
    const pageNo = parseInt(pageno);
    const perPage = parseInt(perpage);

    const skipRow = ((pageNo - 1) * perPage);

    if (search) {
        const searchRegx = { $regex: search, $options: "i" };
        const searchQuery = {
            $or: [
                { title: searchRegx },
                { category: searchRegx },
                { subcategory: searchRegx },
                { brand: searchRegx }
            ]
        };

        const result = await Products.aggregate([
            {
                $facet: {
                    total: [
                        { $match: searchQuery },
                        { $count: "count" }
                    ],
                    rows: [
                        { $match: searchQuery },
                        { $skip: skipRow },
                        { $limit: perPage }
                    ]
                }
            }
        ])

        res.status(200).json({
            success: true,
            message: "All product data",
            data: result
        })
    } else {
        const result = await Products.aggregate([
            {
                $facet: {
                    total: [
                        { $count: "count" }
                    ],
                    rows: [
                        { $skip: skipRow },
                        { $limit: perPage }
                    ]
                }
            }
        ])

        res.status(200).json({
            success: true,
            message: "All product data",
            data: result
        })
    }
}

module.exports = { getProducts }