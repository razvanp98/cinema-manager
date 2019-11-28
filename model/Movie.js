class Movie{
    constructor(id, title, year, director, genre, description, country, img_hash){
        this.id = id;
        this.title = title;
        this.year = year;
        this.director = director;
        this.genre = [];
        // Build genre array
        genre.forEach((item) => {
            this.genre.push(item);
        });
        this.description = description;
        this.country = country;
        this.imgHash = img_hash;
    }

    // generate JSON object
    toObject(){
        let jsonObject = {
            id: this.id,
            title: this.title,
            year: this.year,
            director: this.director,
            genre: this.genre,
            description: this.description,
            country: this.country,
            imgHash: this.imgHash 
        }

        return jsonObject;
    }
}

module.exports = Movie;