const splitGenre = async (req, res, next) => {
    const { genres } = req.query
    if (genres) {
        if (genres.includes(",")) {
            req.query.genres = genres.toLowerCase().split(",")
            return next()
        } else {
            req.query.genres = [genres.toLowerCase()]
        }
    }
    return next()
}

module.exports = splitGenre