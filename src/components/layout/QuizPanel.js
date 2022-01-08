import { Box, Divider, Grid, Paper, styled } from '@material-ui/core';
import * as React from 'react';
import { DoneOutline, ViewListOutlined } from '@material-ui/icons';
import QuestionStatus from '../quiz/quiz-test/QuestionStatus';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'white',
  backgroundColor: 'rgba(0, 152, 186, 1)',
}));

function QuizPanel(props) {
  return (
    <div>
      <Box
        sx={{
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: '100%',
          },
        }}
      >
        <Paper
          variant="outlined"
          style={{ backgroundColor: 'initial', padding: '10px' }}
        >
          {props.children}
          <Paper
            style={{
              marginBottom: '20px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                justifyContent: 'center',
                gap: '10px',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <ViewListOutlined /> Total Questions - {props.questions.length}
            </div>

            <Divider orientation="vertical" variant="middle" flexItem />
            <div
              style={{
                justifyContent: 'center',
                gap: '10px',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <DoneOutline /> Attempted Questions - {props.responses.length}
            </div>
          </Paper>
          <QuestionStatus />
          <Paper style={{ minHeight: '300px' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1} style={{ padding: '20px' }}>
                <Grid container item spacing={1}>
                  {props.questions.map((q, i) => {
                    return (
                      <Grid key={i} item xs={2}>
                        <Item
                          className={`${
                            i === props.activeStep && 'question-selected '
                          } ${
                            props.responses.findIndex(
                              (a) => a.question_id === q.id
                            ) >= 0 && 'question-attempted'
                          }`}
                        >
                          {i + 1}
                        </Item>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Paper>
      </Box>
    </div>
  );
}

export default QuizPanel;
