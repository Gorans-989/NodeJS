const pageNotFound = async (req, res, next) => {
    res.status(404).json({
        message: "The address you entered is wrong!"
    })
}
export default pageNotFound;