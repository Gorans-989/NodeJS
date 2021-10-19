

const adminController = {

    getPost: (req, res, next) => {
        res.status(200).json({
            posts: [{ title: "first one", content: "This is the first post" }]
        });
    },

    postNewPost: (req, res, next) => {
        //create post in db
        const title = req.body.title;
        const content = req.body.content;
        console.log(title,content);
        
        res.status(201).json({
            message: "post created successfully",
            post: {
                id: 123456,
                title: title,
                content: content
            }
        })
    }
}

export { adminController };