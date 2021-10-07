
// const http = require('http');
// const routes = require('./routes');so skriptata class01 kje raboti
// routes.handler
// routes.someText();


// app.use((req,res, next) => {

//     console.log("im in the middleware") 
//     next();//allows the request to continue to the next middleware in line
// })

// ([path,])


// const server = http.createServer(app);

// server.listen(3000);


    /*EVENT LOOP VO NODE
    najprvo proveruva dali ima nekoj timer callback
    potoa proveruva sleden tip na callback ( i/ O input-output callbacks) 
    
    pool phase
    bara novi I/O callbacks 
    i potoa kje gi izvrshi dokolku e vozmozno, vo sprotivno kje gi evidentira kako "PENDING" callbacks
    
    set immediate -
    se izvrshuvaat vednas. t.e. pred set timeout posle ciklusot koj se izvrshuva vo momentatot ( koj e pocnat )
    */

