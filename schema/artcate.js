const joi = require('joi')


const name = joi.string().required()
const alias = joi.string().alphanum().required()


exports.add_cate_schema = {
    body: {
        name,
        alias
    }
}


const id = joi.number().integer().min(1).required()

exports.delete_cate_scheme = {
    params: {
        id
    }
}

exports.get_cate_by_id_schema = {
    params: {
        id
    }
}

exports.update_cate_by_id_schema = {
    body: {
        Id: id,
        name,
        alias
    }
}
