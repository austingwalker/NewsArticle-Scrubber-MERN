import React, { Component } from "react";
import { Jumbotron } from 'reactstrap';
import Card from "../../components/Card";
import ArticleSave from "../../components/ArticleSave";
import Footer from "../../components/Footer";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List } from "../../components/List";
import "./Saved.css"

class Saved extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    this.getSavedArticles();
  }

  getSavedArticles = () => {
    API.getSavedArticles()
      .then(res => {
        console.log("Saved")
        console.log(res.data)
        console.log("Saved")
        this.setState({
          articles: res.data
        })
      })
      .catch(err => console.log(err));
  };

  handleArticleDelete = id => {
    API.deleteArticle(id).then(res => this.getSavedArticles());
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron className="jumbo">
              <h1 className="text-center">
                <strong>NewsAPI.org Article Scrubber</strong>
              </h1>
              <hr/>
              <h2 className="text-center">
                Saved Articles.
              </h2>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Saved Articles" icon="download">
              {this.state.articles.length ? (
                <List>
                  {this.state.articles.map(article => (
                    <ArticleSave
                      key={article._id}
                      _id={article._id}
                      title={article.title}
                      url={article.url}
                      date={article.date}
                      handleClick={this.handleArticleDelete}
                      buttonText="Delete Article"
                      saved
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">No Saved Articles</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Saved;
