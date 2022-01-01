class APIFeatures {
constructor(query, queryStr){
    this.query=query;
    this.queryStr=queryStr;

}
search(){
    const keyword = this.queryStr.keyword
    // using ternary operation
    ? {
        name:{
            $regex: this.queryStr.keyword,
            $options:'i',
        }
    }:{};
    this.query= this.query.find({...keyword});
    return this;
}
filter(){

    const queryCopy={...this.queryStr};

    const removefields=['keyword', 'limit', 'page']
    removefields.forEach((el)=> delete queryCopy[el])
// because we want to append "$" with lte and gte so we will firts convert the query into string so
// we can easily append and then after appending convert back to object
    let queryStr=JSON.stringify(queryCopy)
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
this.query=this.query.find(JSON.parse(queryStr))
    return this;
}

pagination(resPerPage){
    // 
    const currentpage = Number(this.queryStr.page)
    const skip = resPerPage * (currentpage-1)
    // const skip = 4*(1-1) 
    // 4x0=0 means skip no products on page 1
    // for example current page = 2
    // const skip = 4* (2-1)
    // 4*1=4 means skip first 4 products when we r on page 2 and then show next 4 elements
    // ON EACH(4) PAGE WE WANT 4 PRODUCTS
    this.query = this.query.limit(resPerPage).skip(skip);
    // We are putting condition on the Collection (this.query)that on each page we want to limit to 4 products and then skip whatever it is
    // according to the calculation
    return this;

    // http://localhost:5500/api/v1/products/?page=3
}
}
module.exports=APIFeatures;
