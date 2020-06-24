import React from 'react';
import myCss from './App.css'
import howgay from './howgay.json';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

class App extends React.Component {
  constructor() {
    super();

    var answerArr = [];
    answerArr.length = howgay.questions.length;
    answerArr.fill(undefined);

    this.state = {
      answers: answerArr,
      finalResult: null
    };

    this.updateScore = this.updateScore.bind(this);
    this.calculateResult = this.calculateResult.bind(this);
  }

  updateScore(qIndex, aIndex) {
    var newArr = this.state.answers.slice();
    newArr[qIndex] = aIndex;
    this.setState({answers: newArr});
  }

  calculateResult() {
    let unanswered = this.state.answers.indexOf(undefined);
    if (unanswered > -1) {
      alert("Question #" + (unanswered + 1) + " needs to be answered.");
      return;
    }

    var totalScore = 0;
    var totalP = 0;
    var totalA = 0;

    this.state.answers.forEach((aIndex, qIndex) => {
      let result = howgay.questions[qIndex].answers[aIndex].result;
      totalScore += result[0];
      if (result[1]) {
        if (result[1] === "p") {
          totalP++;
        } else if (result[1] === "a") {
          totalA++;
        }
      }
    });

    if (totalScore <= 0 && totalA > howgay.extras.asexual.minimumScore) {
      this.setState({finalResult: [howgay.responses[0]]});
      return;
    }

    var endResponse = howgay.responses.find((response) => response.minimumScore <= totalScore && totalScore <= response.maximumScore);
    console.log(endResponse);
    if (endResponse == undefined) {
      if (totalScore < 0) {
        endResponse = howgay.responses[1];
      } else if (totalScore > howgay.responses[howgay.responses.length-1].maximumScore) {
        endResponse = howgay.responses[howgay.responses.length-1];
      }
    }
    console.log(endResponse);

    this.setState({finalResult: [endResponse, totalP > howgay.extras.pansexual.minimumScore]});
  }

  render() {
    if (this.state.finalResult) {
      let result = this.state.finalResult;
      return <div id="background">
        <Card id="endCard">
          <Card.Title>{"You are " + result[0].title}</Card.Title>
          <Card.Body>
            <div style={{marginBottom:"20px"}}>{result[0].description}</div>
          {
            result[1] ? <div style={{marginBottom:"20px"}}>{howgay.extras.pansexual.title}</div> : null
          }
          <Button style={{width:"80px"}} onClick={() => this.setState({finalResult: null})} variant="primary">Okay</Button>
          </Card.Body>
        </Card>
      </div>
    } else {
      return <div id="background">
      <Card style={{margin:"20px"}}>
        <h1 id="quizTitle">{howgay.quizTitle}</h1>
      </Card>
      {howgay.questions.map((question, qIndex) =>
        <Card key={qIndex} style={{margin:"20px"}}>
          <Card.Header class="question">{"#" + (qIndex+1) + ". " + question.question}</Card.Header>
          <Form style={{margin:"10px"}}>
          <Form.Group>
            {question.answers.map((answer, aIndex) => <Form.Check style={{marginTop:"10px"}} name={qIndex} key={aIndex} onClick={() => this.updateScore(qIndex, aIndex)} type="radio" label={answer.text} id={"" + qIndex + aIndex}></Form.Check>)}
          </Form.Group>
          </Form>
        </Card>)}
        <Button onClick={this.calculateResult} variant="primary" style={{marginLeft:"20px"}}>Submit</Button>
    </div>
    }
  }
}

export default App;
