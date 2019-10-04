const http = require("http");

const {connectDB} = require("./mods/db");

connectDB()
    .then(() => {
        // app is required now because the db is connected
        // and daos can be initialized (when they are imported)
        const app = require("./app");
        
        http.createServer(app)
            .listen(5000, () => console.log("server up"));
    })
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
