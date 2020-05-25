import React from "react";
import { questionsList } from "./quizPage";

class Queries extends React.Component {
  state = {
    currentQuest: 0,
    myAns: null,
    options: []
  };
  loadQueries = () => {
    this.setState(() => {
      return {
        questions: questionsList[this.state.currentQuest].question,
        answer: questionsList[this.state.currentQuest].ans,
        options: questionsList[this.state.currentQuest].options
      };
    });
  };
  nextQuestion = () => {
    this.setState({
      currentQuest: this.state.currentQuest + 1
    });
  };
  prevQuestion = () => {
    this.setState({
      currentQuest: this.state.currentQuest - 1
    });
  };
  showAnswer = () => {
    alert(`Correct answer is ${this.state.answer}`);
  };
  checkAnser = ans => {
    this.setState({ myAns: ans });
  };
  checkMyAns = () => {
    const { myAns, answer } = this.state;
    if (myAns === answer) {
      alert("Your Selected correct answer");
    } else if (myAns === null) {
      alert("Please Select An Answer");
    } else {
      alert(`Wrong Answer, Correct answer is ${answer}`);
    }
  };
  componentDidMount() {
    this.loadQueries();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuest !== prevState.currentQuest) {
      this.setState(() => {
        return {
          questions: questionsList[this.state.currentQuest].question,
          answer: questionsList[this.state.currentQuest].ans,
          options: questionsList[this.state.currentQuest].options,
          myAns: null
        };
      });
    }
  }
  render() {
    const { options, currentQuest, myAns } = this.state;
    return (
      <div>
        <h1>{this.state.questions}</h1>
        {options.map(option => (
          <p
            key={option.id}
            onClick={() => this.checkAnser(option)}
            className={myAns === option ? "selected" : ""}
          >
            {option}
          </p>
        ))}
        <button disabled={currentQuest === 0} onClick={this.prevQuestion}>
          Previous
        </button>
        <button onClick={this.checkMyAns}>Submit</button>
        <button
          disabled={currentQuest === questionsList.length - 1}
          onClick={this.nextQuestion}
        >
          Next
        </button>
        <button onClick={this.showAnswer}>Show Answer</button>
      </div>
    );
  }
}

export default Queries;
