export const validationRequest = (schema, target = "body") => {
    return (req, res, next) => {
        const {error} = schema.validationRequest(req[target], {abortEarly: false});
        if(error){
            return res.status(400).json({
                error: "Dữ liệu không hợp lệ",
                details: error.details.map((err) => {err.messege}),
            })
        }
        next();
    }
}