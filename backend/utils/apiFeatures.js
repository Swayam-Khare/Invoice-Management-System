const CustomError = require('./customError');
exports.sorting = (sort) => {
    let arr;
    if (sort) {
        const sortingFields = sort.split(',');
        arr = sortingFields.map((column) => {
            if (column[0] == '-') {
                const newColmn = column.slice(1);
                return [newColmn, 'DESC']
            }
            else {
                return [column, 'ASC']
            }
        });
    }
    // console.log(arr);
    return arr;

}


exports.limitFields = (showFields) => {
    const fields = showFields.split(',')
    if (fields.includes('password')) {
        const index = fields.indexOf('password')
        fields.splice(index, 1)
    }
    return fields;

}

// exports.filter = (filter)=>{

// }

exports.paginate = (page, limit, next) => {
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;
    return skip;

}

exports.search = (name) => {
    const search_string = `%${name}%`;
    return search_string;

}