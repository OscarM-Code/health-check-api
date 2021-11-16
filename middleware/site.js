exports.checkLinksOfUser = (req, res, next) => {
    const userId = req.params.userId;
    const token = req.decoded;
    console.log(token);
    if(token.userId !== userId){
        return res.status(403).json({
            success: false,
            message: "You are not authorized to perform this action"
        });
    }

    next();
}