export const paginationMiddleware = (model)=>{
    return (req, res, next)=>{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;
        const startIndex =(page-1)*limit;
        const endIndex = page*limit;
        console.log({model});
        const result = {
            result: model.slice(startIndex, endIndex)
        }
        if(endIndex < model.length) result.nextPage = page+1;
        if(page > 1) result.prevPage = page-1;
        req.result = result;
        next();
    }
}