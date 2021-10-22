/*
    1. Intercept the request before it reaches the endpoint
    2. Check if the request holds a token
    3. If the request doesnt hold a token:
        3.a. Create a token
            3.a.1. set headers - alg, type,
            3.a.2. create payload with entity claims , name, SUBject, ISSuer, EXPiration, AUDience, Issued At Time (IAT), JTI (JWT id) etc...
            3.a.3. create signature
            3.a.4. Send response back with the token
    4. If the request holds a token
    5.Decrypt the token in three parts
        5.a. Check the signature 
            5.a.1. create your signature
            5.a.2. hash the incoming token signature
            5.a.3. compare the two signatures
        5.b. Check the headers
            5.b.1. check if the used algorithm is same as the one you used to create the token
            5.b.2. check if the Token type is same as the one you used to create the token
        5.c. Check the payload ( entity claims)
            5.c.1. check name , subject , expiration date, 
    6.If the check fails DONT FORWARD TO ENDPOINT. return res 401/
*/




  

        

        // //creating token jwt.sign(payload , secret, [options, callback]) - if callback is used it becomes an async function.
        // const token = jwt.sign(
        //     //payload 
        //     { name: userName, email: email, exp: "1h" },
        //     // secret or token key if using rsa
        //     process.env.TOKEN_KEY,
        //     // options setting header (alg and typ)
        //     { algorithm: "HS256", type: "JWT" }


// HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
    

    // var token = req.headers['x-access-token'];
    // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    // jwt.verify(token, config.secret, function(err, decoded) {
    //     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    //     res.status(200).send(decoded);



   // 1. headers alg:  type:
    // {
    //     "alg": "HS256",
    //     "typ": "JWT"
    //   }

    // {
    //     "sub": "1234567890",
    //     "name": "John Doe",
    //     "admin": true
    //   }

    // HMACSHA256(
    //     base64UrlEncode(header) + "." +
    //     base64UrlEncode(payload),
    //     secret)