class Movie{
    Movie(title, year, director, genre, description){
        this.title = title;
        this.year = year;
        this.genre = genre;
        this.director = director;
        this.description = description;
    }

    // Getters

    getTitle(){
        return this.title;
    }

    getYear(){
        return this.year;
    }

    getGenre(){
        return this.genre;
    }

    getDirector(){
        return this.director;
    }

    getDescription(){
        return this.description;
    }
}

module.exports = Movie;