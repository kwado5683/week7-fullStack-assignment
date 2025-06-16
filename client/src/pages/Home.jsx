import MovieCard from "../Components/MovieCard";
import {useState,useEffect} from "react";
import { getPopularMovies, searchMovies } from "../services/api";
import "../css/Home.css";


function Home () {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies,setMovies] = useState([]);
    const [noresult,setNoresult] = useState(false);


    useEffect(()=>{
        const loadPopularMovies = async () =>{
            try{
                const popularMovies =  await getPopularMovies();
                setMovies(popularMovies);
                setNoresult(false);
            } catch (error){
                console.log(error,"something is not right")

            }
        };
        loadPopularMovies()
    },[]);

    
    const handleSearch = async(e)=>{
        e.preventDefault();
        if(!searchQuery.trim()) return

        try{
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setNoresult(searchResults.length===0);
        }catch (error){
            console.log(error,"something is not right")

    }
}


    return(
        <>

            <div className="home">
                <form onSubmit={handleSearch} className="search-form">
                    <input 
                    type="text" 
                    placeholder="Search for movies .." 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="search-btn"> Search</button>
                </form>



                <div className="movie_grid"> {
                noresult?(
                    <p> No Result Found!!</p>
                ):
                    (movies.map((movie)=>(<MovieCard movie={movie} key={movie.id} />

                    )))}
                    
                </div>
            </div>
        </>
    )
}
export default Home