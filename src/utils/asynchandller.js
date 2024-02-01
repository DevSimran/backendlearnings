const asyncHandller = (requestHandler)=> {
    (req, res, next)=>{
        Promise.resolve(requestHandler(req, res, next)).
        catch((err) => next(err))
    }
}





export {asyncHandller}

// const asyncHandller = (fn)=> async (req, res, next)=>{
//     try {
//         await fn(req, res, next)
//     } catch (err) {
//     res.status(err.code || 500).json({
//         success: false,
//         message: err.message
//     }
//     )
//     }
// }