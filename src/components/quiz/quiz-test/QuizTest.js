import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  CardContent,
  Container,
  Card,
  Divider,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import SelectOption from "./SelectOption";
import StepperProgress from "./StepperProgress";
import moment from "moment";

// REDUX
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getQuizTest, submitQuiz } from "../../../actions/quiz";
import MyTimer from "../../layout/MyTimer";
import QuizPanel from "../../layout/QuizPanel";

const QuizTest = ({
  auth: { user },
  getQuizTest,
  submitQuiz,
  get_Quiz_Test,
  loading,
}) => {
  const params = useParams();
  const [activeStep, setActiveStep] = React.useState(0);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    document.title = "Quizeal | Quiz Test";
    getQuizTest(user && user.username, params.quiz_id);
  }, [getQuizTest, user, params.quiz_id]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const updateOption = (o, id, type) => {
    let newA = responses;
    if (type === 1) {
      const oIndex = newA.findIndex((a) => a.question_id === id);
      if (oIndex !== -1) {
        if (newA[oIndex].option_name === o) newA.splice(oIndex, 1);
        else newA[oIndex].option_name = o;
      } else newA.unshift({ question_id: id, option_name: o });
    } else {
      const oIndex = newA.findIndex(
        (a) => a.option_name === o && a.question_id === id
      );
      if (oIndex !== -1) newA.splice(oIndex, 1);
      else newA.unshift({ question_id: id, option_name: o });
    }
    setResponses(newA);
  };

  const data = get_Quiz_Test;

  const onSubmit = () => {
    const res = {
      username: user && user.username,
      answers: responses,
    };
    submitQuiz(res, params.username, params.quiz_id);
  };
  const time = new Date();
  return (
    <Fragment>
      {!loading && data && (
        <Container
          maxWidth='xl'
          spacing={5}
          style={{ display: "flex", gap: "60px", margin: "70px 30px" }}
        >
          <Grid item sm={12} md={9}>
            <Grid item>
              <Typography variant='h6'>Quiz Name - {data.quiz_name}</Typography>
              <Typography variant='h6'>
                Organizer Name - {data.username}
              </Typography>
              <Typography variant='h6'>
                Quiz Duration -{" "}
                {`${moment.utc(+data.duration * 1000).format("HH:mm:ss")}`}
              </Typography>
            </Grid>
            <span>
              <Typography variant='h4' component='span'>
                {activeStep + 1}
              </Typography>
              {`/${data.questions.length}`}
            </span>
            <Card>
              <CardContent>
                {data && data.questions[activeStep].question_name}
              </CardContent>
              <Divider />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  gap: "10px",
                }}
              >
                <SelectOption
                  options={data && data.questions[activeStep].options}
                  type={data && data.questions[activeStep].question_type}
                  update={updateOption}
                  qId={data.questions[activeStep].id}
                />
              </div>
            </Card>
            <Divider />
            <div style={{ margin: "10px" }}>
              <StepperProgress
                length={data && data.questions.length}
                next={handleNext}
                activeStep={activeStep}
              />
            </div>
            <Button variant='contained' color='primary' onClick={onSubmit}>
              Submit Quiz
            </Button>
          </Grid>
          <Grid item md={3}>
            <QuizPanel
              questions={data.questions}
              activeStep={activeStep}
              responses={responses}
            >
              <MyTimer
                expiryTimestamp={time.setSeconds(
                  time.getSeconds() + +data.duration
                )}
                autoStart={true}
                onExpire={() => onSubmit()}
              />
            </QuizPanel>
          </Grid>
        </Container>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  get_Quiz_Test: state.quiz.get_Quiz_Test,
  loading: state.loading,
  auth: state.auth,
});

QuizTest.propTypes = {
  getQuizTest: PropTypes.func.isRequired,
  submitQuiz: PropTypes.func.isRequired,
  get_Quiz_Test: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getQuizTest, submitQuiz })(QuizTest);

// TODO
// --> Add Proper Msg about quiz start/end
