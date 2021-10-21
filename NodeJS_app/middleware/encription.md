/*
    1. Intercept the request before it reaches the endpoint
    2. Check if the request holds a token
    3. If the request doesnt hold a token:
        3.a. Create a token
            3.a.1. set headers - alg, type,
            3.a.2. create payload with entity claims , name, SUBject, ISSuer, EXPiration, AUDience, Issued At Time, JTI (JWT id) etc...
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
