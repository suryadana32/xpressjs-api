const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

//Function for checking null
function isEmpety(obj) {
    return Object.keys(obj).length === 0;
}

//Error Server for Responding
const errorResponse = (res, error) => {
    console.log(error);
    return res.status(500).send({
        status: "Server Error 500",
    });
};

const { Category } = require("../models");

// Get all Category
router.get('/', async (req, res) => {
    try {

        const categories = await Category.findAll();
        res.send({
            status: "Success",
            categories,
        });
        
    } catch (error) {
        errorResponse(res, error);
    }
});

//Get Category by ID
router.get('/:id', async (req, res) => {
    
    try {
        const { id } = req.params;
        const category = await Category.findOne({
            where: {
                id_category:id,
            },
        });

        res.send({
            status: category ? "Success data affected": "Category not Found",
            category,
        });
    } catch (error) {
        errorResponse(res, error);
    }
});

//Create Category
router.post('/', async (req, res) => {
    try {
        
        const { id_category, name_category, slug } = req.body;

        if(!id_category || !name_category || !slug){
            return res.send({
                status:"Parameter kurang atau kosong",
            });
        }else{
            const category = await Category.create({
                id_category,
                name_category,
                slug,
            });

            res.send({
                status:"Category successfully created",
                category,
            });

        }
        
    } catch (error) {
        errorResponse(res, error);
    }
});

//Update Category
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const editedCategory = req.body;

        if(isEmpety(editedCategory)) {
            return res.send({
                status:"Data atau parameter tidak boleh kosong",
            });
        }else{
            const findUserById = await Category.findOne({
                where: {
                    id_category:id,
                },
            });

            if (!findUserById) {
                return res.send({
                    status: "User not found!",
                });
            }else{
                await Category.update(editedCategory, {
                    where: {
                        id_category:id,
                    }
                });

                const findUserUpdated = await Category.findOne({
                    where: {
                        id_category:id,
                    },
                });
            
                res.send({
                    status: "User successfully updated",
                    category: findUserUpdated,
                });
            }
        }

    } catch (error) {
        errorResponse(res, error);
    }
});

//Delete Category
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const findUserById = await Category.findOne({
            where: {
                id_category:id,
            },
        });

        if(!findUserById) {
            return res.send({
                status: "User not found!",
            });
        }else{
            const deleteUser = await Category.destroy({
                where: {
                    id_category:id,
                }
            });
            res.send({
                status: "User successfully Deleted",
            });
        }

    } catch (error) {
        errorResponse(res, error);
    }
});

module.exports = router