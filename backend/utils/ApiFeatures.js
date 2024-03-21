class Apifeatures {
    constructor(array, queryStr) {
        this.array = array;
        this.queryStr = queryStr;
    }

    filter() {
        if (this.queryStr.status) {
            this.array = this.array.filter(t => t.status == this.queryStr.status);
        }
        return this;
    }

    compare(prop) {
        return (a, b) => {
            for (const key in prop) {
                if (+a[key] < +b[key]) {
                    return -1 * prop[key];
                } else if (+a[key] > +b[key]) {
                    return 1 * prop[key];
                }
            }

            return 0;
        }
    }

    sort() {
        if (this.queryStr.sort) {
            let sortBy = this.queryStr.sort.split(',');
            let sortOrder = {};
            for (let sort of sortBy) {
                if (sort.startsWith('-')) {
                    sort = sort.slice(1);
                    sortOrder[sort] = -1;
                } else {
                    sortOrder[sort] = 1;
                }
            }
            this.array.sort(this.compare(sortOrder));
        } else {
            this.array.sort(this.compare({ "purchase_date": -1 }));
        }

        return this;
    }

    limitFields() {
        if (this.queryStr.fields) {
            const fields = this.queryStr.fields.split(',');
            for (let i = 0; i < this.array.length; i++) {
                const selectedProperties = fields.reduce((obj, key) => {
                    obj[key] = this.array[i][key];
                    return obj;
                }, {});
                this.array[i] = selectedProperties;
            }

        }

        return this;
    }

    paginate() {
        const page = this.queryStr.page * 1 || 1;
        const limit = this.queryStr.limit * 1 || 10;
        const skip = (page - 1) * limit;
        if (skip >= this.array.length) {
            throw new Error("This page is not found!");
        }
        this.array = this.array.slice(skip, skip + limit);

        return this;
    }
}

module.exports = Apifeatures;