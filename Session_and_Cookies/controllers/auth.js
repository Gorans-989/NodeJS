exports.getLogin = (req, res, next) => {
    
    // const isLogged = req.get('Cookie').split('=')[1] === 'true';
    // console.log(typeof(isLogged));
    // console.log(isLogged);
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login page',
        isAuthenticated: false
        
    });
};
exports.postLogin = (req,res,next) =>{
    
    // res.setHeader('Set-Cookie', 'loggedIn=true; Secure'); // ne funkcionira secure. povtorno se setira cookie vo browserot
    req.session.isLoggedIn = true;
    
    res.redirect("/");

}; 