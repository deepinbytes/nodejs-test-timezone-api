const countryModal = require('../models/countryModel');
const _ = require('lodash');

const countryController = {

    list: async(req, res) => {
        try {
            const data = await countryModal.list();
            return res.status(200).send({data})
        } catch(error) {
            console.error(error);
            res.status(400).send({ message: error.message })
        }
    },
    byName: async(req, res) => {
        try {
            const name = req.params.name;
            const data = await countryModal.byName(name);
            if (data.length>0){
            return res.status(200).send({data})}
            else{
                return res.status(404).send({message:'Not found'})
            }
        } catch(error) {
            console.error(error);
            res.status(400).send({ message: error.message })
        }
    },

};

module.exports = countryController;