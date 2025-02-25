module.exports = (app) => {
    const posts = require("../controllers/postsController.js");
    const router = require("express").Router();

    // GET all Post
    router.get("/", posts.findAll);

    // GET post(s) by search
    router.get('/search', posts.search);

    // GET a single Post by ID
    router.get("/:id", posts.findOne);
  
    // POST a new Post
    router.post("/", posts.create);

    // DELETE a Post
    router.delete("/:id", posts.delete);

    
   
    app.use("/api/posts", router);
};