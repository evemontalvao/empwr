var Promise = require('bluebird');


var handleNotFound = function(data) {
    if (!data) {
        var err = new Error('Not Found');
        err.status = 404;

        throw err;
    }

    return data;
};


var ServicesController = function(ServicesModel) {
    this.model = Promise.promisifyAll(ServicesModel);
};

ServicesController.prototype.getAll = function(req, res, next) {
    var query = this._handleGetQuery(req.query);

    this.model.findAsync(query)
    .then(function(data) {
        res.json(data);
    })
    .catch(next);
};

ServicesController.prototype._handleGetQuery = function(query) {
    var prop,
    findAllQuery = {},
    between = query.between;

    if (between) {
        between = between.split(',');
        findAllQuery["createdAt"] = {
            $gte: new Date(between[0]),
            $lt: new Date(between[1])
        }
        delete query.between;
    }

    for(prop in query) {
        query[prop] = new RegExp(query[prop], 'gi');
    }

    return Object.assign(findAllQuery, query);
};

ServicesController.prototype.getById = function(req, res, next) {
    var _id = req.params._id;

    this.model.findOneAsync(_id)
    .then(handleNotFound)
    .then(function(data) {
        res.json(data);
    })
    .catch(next);
};

ServicesController.prototype.create = function(req, res, next) {
    var body = req.body;
    body['createdAt'] = new Date();
    body['updatedAt'] = new Date();

    this.model.createAsync(body)
    .then(function(data) {
        res.json(data);
    })
    .catch(next);
};

ServicesController.prototype.update = function(req, res, next) {
    var _id = req.params._id,
    body = req.body;

    body['updatedAt'] = new Date();

    this.model.updateAsync(_id, body)
    .then(function(data) {
        res.json(data);
    })
    .catch(next);
};

ServicesController.prototype.remove = function(req, res, next) {
    var _id = req.params._id;

    this.model.removeAsync(_id)
    .then(function(data) {
        res.json(data);
    })
    .catch(next);
};

module.exports = function(ServicesModel) {
    return new ServicesController(ServicesModel);
};
