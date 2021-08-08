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
import React, { useState } from 'react';
import { getQuizTest } from '../../../apiHandlers.js/quiz';
import { useEffect } from 'react';
import Loading from '../../layout/Loading';
import { Fragment } from 'react';
import { submitQuiz } from '../../../apiHandlers.js/quiz';

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

const QuizTest = (props) => {
  const { quiz_id } = props.match.params;
  const [server, setServer] = useState({ data: '', loading: true });
  const [activeStep, setActiveStep] = React.useState(0);
  const [responses, setResponses] = useState([]);

  const getQuizTestHandler = async () => {
    let res = await getQuizTest(quiz_id);
    let { questions, msg } = res;
    if (msg) {
      setServer({ ...server, msg: msg, loading: false });
      return;
    }
    questions = shuffle(questions);
    setResponses(questions);
    setServer({ ...server, data: res, loading: false });
  };

  const { data, loading, msg } = server;

  useEffect(() => {
    document.title = 'Quizeal | Quiz Test';
    getQuizTestHandler();
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const updateOption = (o) => {
    const presentQuestion = responses[activeStep];
    const presentOptions = presentQuestion.options;
    const oIndex = presentOptions.findIndex((a) => a.option_name === o);
    const res = presentOptions[oIndex].is_marked;
    presentOptions[oIndex].is_marked = !res;
    presentQuestion.options = presentOptions;
    setResponses([
      ...responses,
      // [responses[activeStep]]: presentQuestion,
    ]);
  };

  const removeUnwantedData = (responses) => {
    let res = [];
    responses.forEach((r) => {
      let op = r.options.filter((o) => o.is_marked);
      op.forEach((o) => {
        delete o.id;
        delete o.is_marked;
        const option_N = o.option_name;
        delete o.option_name;
        o['answer_name'] = option_N;
      });
      res = [...res, ...op];
    });
    return {
      username: 'divyam',
      answers: res,
    };
  };

  const onSubmit = () => {
    console.log('SUBMITTED SUCCESSFULLY', quiz_id);
    submitQuiz(removeUnwantedData(responses), quiz_id);
  };

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {data ? (
            <Fragment>
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
                  <Typography variant='h6'>
                    Quiz Name - {'Maths Olympiad'}
                  </Typography>
                  <Typography variant='h6'>
                    Organizer Name - {'CBSE'}
                  </Typography>
                  <Typography variant='h6'>
                    Quiz Duration - {'5 min'}
                  </Typography>
                </Grid>
                <Grid item>
                  <CircularTimer />
                </Grid>
              </Grid>
              <Card>
                <CardContent>
                  {data.questions[activeStep].question_name}
                </CardContent>
                <Divider />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px',
                    gap: '10px',
                  }}
                >
                  {data.questions[activeStep].options.map((o) => {
                    return (
                      <SelectOption
                        key={o.id}
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
                  length={data.questions.length}
                  next={handleNext}
                  activeStep={activeStep}
                />
              </div>
              <Button variant='contained' color='primary' onClick={onSubmit}>
                Submit Quiz
              </Button>
            </Fragment>
          ) : (
            msg
          )}
        </Fragment>
      )}
    </Container>
  );
};

export default QuizTest;
