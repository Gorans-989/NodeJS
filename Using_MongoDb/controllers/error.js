export function get404(req, res, next) {
    res.status(404).render('PageNotFound', {
        pageTitle: "Page not Found",
        path: ''
    });
}