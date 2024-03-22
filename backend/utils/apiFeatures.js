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
    return arr;

}


exports.limitFields = (showFields)=>{
    const fields = showFields.split(',')
   if(fields.includes('password')) {
   const index = fields.indexOf('password')
    fields.splice(index,1)
   }
    return fields;

}

// exports.filter = (filter)=>{

// }

exports.paginate = (page,limit,total,next)=>{
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page-1)*limit;
    if(skip>total){
        const error = new CustomError('Page not found!',404);
        return next(error);
    }
    return skip;

}
