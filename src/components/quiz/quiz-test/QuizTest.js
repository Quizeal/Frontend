import {
  CardContent,
  Container,
  Card,
  Divider,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import CircularTimer from './CircularTimer';
import SelectOption from './SelectOption';
import StepperProgress from './StepperProgress';
import { qaList } from '../../../data';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Shuffling the questions randomly
function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const questions = shuffle(qaList);
questions.forEach((list) =>
  list.options.forEach((o) => {
    o.marked = false;
    delete o.ans; // if not handled in backend
  })
);

const QuizTest = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [responses, setResponses] = useState(questions);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const updateOption = (o) => {
    const presentQuestion = responses[activeStep];
    const presentOptions = presentQuestion.options;
    const oIndex = presentOptions.findIndex((a) => a.data === o);
    const res = presentOptions[oIndex].marked;
    presentOptions[oIndex].marked = !res;
    presentQuestion.options = presentOptions;
    setResponses({
      ...responses,
      [responses[activeStep]]: presentQuestion,
    });
  };

  const onSubmit = () => {
    console.log(responses);
  };

  return (
    <Container>
      <Grid
        container
        style={{
          gap: '40px',
          margin: '10px 0',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid item>
          <Typography variant='h6'>Quiz Name - {'Maths Olympiad'}</Typography>
          <Typography variant='h6'>Organizer Name - {'CBSE'}</Typography>
          <Typography variant='h6'>Quiz Duration - {'5 min'}</Typography>
        </Grid>
        <Grid item>
          <CircularTimer />
        </Grid>
      </Grid>
      <Card>
        <CardContent>{questions[activeStep].question}</CardContent>
        <Divider />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            gap: '10px',
          }}
        >
          {questions[activeStep].options.map((o, index) => {
            return (
              <SelectOption
                key={uuidv4()} // id if not coming from backend
                option={o}
                update={updateOption}
              />
            );
          })}
        </div>
      </Card>
      <Divider />
      <div style={{ margin: '10px' }}>
        <StepperProgress
          length={questions.length}
          next={handleNext}
          activeStep={activeStep}
        />
      </div>
      <Button variant='contained' color='primary' onClick={onSubmit}>
        Submit Quiz
      </Button>
    </Container>
  );
};

export default QuizTest;
