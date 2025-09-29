const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase= require("./config/database");

//Uncaught Exception
process.on("uncaughtException", (err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
});

//config
dotenv.config({path: "backend/config/config.env"})

//connect to database
connectDatabase();
const server = app.listen(process.env.PORT,()=>{
    console.log('Server is working at http://localhost:${process.env.PORT}');   
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down the server due to Unhandled Promise rejection`);
    server.close(() =>{
        process.exit(1);
    });
});