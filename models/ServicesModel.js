'use strict';

class ServicesModel {
    constructor(model) {
        this.model = model;
    }

    find(query, callback) {
        this.model
        .find(query)
        .exec(callback);
    };

    findOne(_id, callback) {
        var query = {
            _id: _id
        };

        this.model.findOne(query).exec(callback);
    };

    create(data, callback) {
        var model = new this.model(data);

        model.save((err, result, rows) => {
            callback(err, result, rows);
        });
    };

    update(_id, data, callback) {
        var query = {
            _id: _id
        };

        this.model.update(query, data).exec((err, result, rows) => {
            callback(err, result, rows);
        });
    };

    remove(_id, callback) {
        var query = {
            _id: _id
        };

        this.model.remove(query).exec((err, result) => {
            callback(err, result);
        });
    };

};

module.exports = (mongoose) => {
    var Service = mongoose.model('Services', {
        name: {
            type: String,
            required: true
        },
        phones: {
            type: [String],
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        owner: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        cnpj: String,
        createdAt: Date,
        updatedAt: Date,
        address: {
            zipCode: {
                type: String,
                required: true
            },
            number: {
                type: String,
                required: true
            },
            street: String,
            neighborhood: String,
            city: String,
            complement: String,
            state: String
        },
        services: {
            minPrice: Number,
            maxPrice: Number,
            products: [
                {
                    name: String,
                    price: Number,
                    images: [String]
                }
            ]
        }
    });

    return new ServicesModel(Service);
};
