const Products = require("../models/ProductModel");

const getProducts = async (req, res) => {
    const { pageno, perpage, search } = req.query;

    const skipRow = ((parseInt(pageno) - 1) * parseInt(perpage));

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
                        { $limit: parseInt(perpage) }
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
                        { $limit: parseInt(perpage) }
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