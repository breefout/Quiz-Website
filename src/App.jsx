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
    answerArr.fill(0);

    this.state = {
      answers: answerArr
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

    alert(totalScore);
  }

  render() {
    return <div id="background">
      <Card style={{margin:"20px"}}>
        <h1 id="quizTitle">{howgay.quizTitle}</h1>
      </Card>
      {howgay.questions.map((question, qIndex) =>
        <Card key={qIndex} style={{margin:"20px"}}>
          <Card.Header class="question">{"#" + (qIndex+1) + ". " + question.question}</Card.Header>
          <Form style={{margin:"10px"}}>
          <Form.Group>
            {question.answers.map((answer, aIndex) => <Form.Check style={{marginTop:"10px"}} name={qIndex} key={aIndex} onClick={() => this.updateScore(qIndex, aIndex)} type="radio" label={answer.text} id={answer.text}></Form.Check>)}
          </Form.Group>
          </Form>
        </Card>)}
        <Button onClick={this.calculateResult} variant="primary" style={{marginLeft:"20px"}}>Submit</Button>
    </div>
  }
}

export default App;
