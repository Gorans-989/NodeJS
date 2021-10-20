
const pageNotFound = async (req, res, next) => {
    res.status(404).json({
        message: "Wrong address"
    })
}
export default pageNotFound;