import React, { Component } from "react";

import { Jumbotron } from 'reactstrap';
import Card from "../../components/Card";
import Form from "../../components/Form";
import Article from "../../components/Article";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List } from "../../components/List";
import "./Home.css"

class Home extends Component {
  state = {
    articles: [],
    q: "",
    message: "Search For Articles To Begin!"
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getArticles = () => {
    API.getArticles({
      q: this.state.q,
    })
      .then(res => {
        // console.log("+++++++++++++++++")
        // console.log(res.data)
        // console.log("+++++++++++++++++")
        this.setState({
          articles: res.data,
          message: !res.data.length
            ? "No New Articles Found, Try a Different Query"
            : ""
        })
      })
      .catch(err => console.log(err));
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.getArticles();
  };

  handleArticleSave = title => {
   alert(`Article: 
    ${title} was saved!
   Check Saved Articles page to view.`)
    const article = this.state.articles.find(article => article.title === title);
    API.saveArticle(article).then(res => this.getArticles());
  };

  render() {
    return (
      <Container >
        <Row >
          <Col size="md-12">
            <Jumbotron className="jumbo">
              <h1 className="text-center">
                <strong>NewsAPI.org Article Scrubber</strong>
              </h1>
              <hr/>
              <h2 className="text-center">
                Search for and save articles of interest.
              </h2>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Card title="Query" icon="newspaper-o">
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Results">
              {this.state.articles.length ? (
                <List>
                  {this.state.articles.map(article => (
                    <Article
                      key={article.title}
                      _id={article._id}
                      title={article.title}
                      url={article.url}
                      date={article.publishedAt}
                      handleClick={this.handleArticleSave}
                      buttonText="Save Article"
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">{this.state.message}</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer>
        </Footer>
      </Container>
    );
  }
}

export default Home;
