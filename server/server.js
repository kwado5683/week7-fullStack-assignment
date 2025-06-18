//imports
import pg from "pg";
import  cors from "cors";
import express from "express";
import dotenv from "dotenv"

//configs
const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

//port

app.listen("4000",()=>{
    console.log("server is active on port 4000");
});

//root route
app.get("/",(req,res)=>{
    res.json({message:"this is the root route"})

});


//connecting to the database

const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});
//==========================

//TODO: I want to READ data
app.get("/favorite_movies", async(req,res) =>{
    try{
        const data = await db.query(`SELECT * FROM favorite_movies`);
        res.json(data.rows);
    }catch (error) {
        console.log(
          "Error, error, error, something broke! Check your connection string"
        );
        res.status(500).json({ success: false });
    }
});

//TODO: I want to CREATE new data
app.post("/add_favorite_movies", async(req,res) => {
    const { movie_title, release_year, poster_path} = req.body;
    try{
        const insert = await db.query(
            `INSERT INTO favorite_movies(movie_title, release_year, poster_path)
            VALUES($1, $2, $3)`,
            [movie_title, release_year, poster_path]
        );
        res.status(200).json({success:true});
    } catch (error) {
        console.log(
          "Error, error, error, something broke! Check your connection string"
        ); console.log(error);
        res.status(500).json({ success: false });
    }
});

//==========================

//? STRETCH: I want to DELETE data

//? STRETCH: I want to UPDATE data