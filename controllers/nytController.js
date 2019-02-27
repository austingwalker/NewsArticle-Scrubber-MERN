const axios = require("axios");
const db = require("../models");

// 9b3adf57854f4a19b7b5782cdd6e427a

module.exports = {
    findAll: function(req, res) {

     let initialSearchParam = req.query.q
  
              console.log("@@@@@@@@@") 
              console.log(initialSearchParam) 
              console.log("@@@@@@@@@")  

     let param = initialSearchParam.replace(/\s/g, '%20')

              console.log("@@@@@@@@@") 
              console.log(param) 
              console.log("@@@@@@@@@") 

      let url = 'https://newsapi.org/v2/everything?' +
          `q=${param}&` +
          'apiKey=acac3691817e4ca3a2913ce636ec159a';
       
              console.log("~~~~~~~~~~~~~~") 
              console.log(url) 
              console.log("~~~~~~~~~~~~~~") 
              
  
      axios
        .get(url)
        .then(response => {
              // console.log("~~~~~~~~~~~~~~") 
              // console.log(response.data.articles) 
              // console.log("~~~~~~~~~~~~~~") 
          db.Article
            .find()
            .then(dbArticles =>
              response.data.articles.filter(article =>
                dbArticles.every(
                  dbArticle => dbArticle._id.toString() !== article._id
                )
              )
            )
            .then(articles => res.json(articles))
            .catch(err => {
              // console.log("----------------") 
              // console.log(err) 
              // console.log("----------------"); 
            });
        });
    }
  };

  

  // res.status(422).json(err)

  