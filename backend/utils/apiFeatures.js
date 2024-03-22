
const { Op } = require("sequelize");

class ApiFeatures{
    // constructor(queryOptions, queryString){
    //     this.queryOptions = queryOptions
    //     this.queryString = queryString
    // }

    filter(query) {
        const whereClause = {};
    
        Object.entries(query).forEach(([key, value]) => {
            if (typeof value === 'object' && !(value instanceof Date)) { 
                const conditionObj = Object.entries(value).reduce((acc, [condition, conditionValue]) => {
                    switch (condition) {
                        case 'gt':
                            acc[Op.gt] = conditionValue;
                            break;
                        case 'gte':
                            acc[Op.gte] = conditionValue;
                            break;
                        case 'lt':
                            acc[Op.lt] = conditionValue;
                            break;
                        case 'lte':
                            acc[Op.lte] = conditionValue;
                            break;
                        default:
                            throw new Error(`Unsupported operation: ${condition}`);
                    }
                    return acc;
                }, {});
                whereClause[key] = conditionObj;
            } else {
                whereClause[key] = value;
            }
        });

        return whereClause;
    }

    // filter(){

    //     const excludeFields = ['sort', 'page', 'limit', 'fields']

    //     let queryStringFilter = {...this.queryString}
        
    //     excludeFields.forEach((el) => {
    //         delete queryStringFilter[el]
    //     })
        
    //     console.log(this.queryString)
    //     console.log(queryStringFilter)
    //     queryStringFilter = JSON.stringify(queryStringFilter)
    //     queryStringFilter = queryStringFilter.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    //     queryStringFilter = JSON.parse(queryStringFilter, (key, value) => {
    //         // console.log(key)
    //         key.match(/(gte|gt|lte|lt)/) ? { [Op[key]]: value } : value
    //     })
        
    //     // console.log(this.queryOptions.where)
    //     this.queryOptions.where = {...this.queryOptions.where, ...queryStringFilter}

    //     return this
        
    // }

    // sort(){

    //     let sortBy = 'id'
    //     if(this.queryString.sort){
    //         sortBy = this.queryString.sort.split(',').join(' ')
    //     }
    //     this.query = this.query.sortBy(sortBy)
    //     return this

    // }

    // limitFields(){

    //     if(this.queryString.fields){
    //         const fields = this.queryString.fields.split(',')
    //         this.query = this.query.findAll({
    //             attributes: fields
    //         })
    //     }
    //     this.query = this.query.findAll({
    //         attributes: {
    //             exclude: [
    //                 'id'
    //             ]
    //         }
    //     })
    //     return this

    // }

    // async paginate(){
        
    //     const page = parseInt(this.queryString.page, 10) || 1;
    //     const limit = parseInt(this.queryString.limit, 10) || 10;
    //     const offset = (page - 1) * limit;

    //     this.query = this.query.findAll({
    //         offset: offset,
    //         limit: limit,
    //     });

    //     if(this.queryString.page){
    //         const totalItems = await this.query.model.count()
    //         if(offset >= totalItems){
    //             throw new Error('This page does not exist')
    //         }
    //     }
    //     return this
    
    // }

}

module.exports = ApiFeatures