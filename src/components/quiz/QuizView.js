import { Container, Typography, Divider } from '@material-ui/core';
import { qaList as questions } from '../../data';
import QAList from './QAList';

const QuizView = () => {
  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography
        variant='h6'
        align='center'
        style={{ 'padding-bottom': '10px' }}
      >
        Quiz Name - {'Maths Olympiad'}
      </Typography>
      <Typography
        variant='h6'
        align='center'
        style={{ 'padding-bottom': '10px' }}
      >
        Organizer Name - {'CBSE'}
      </Typography>
      <Typography
        variant='h6'
        align='center'
        style={{ 'padding-bottom': '10px' }}
      >
        Quiz Duration - {'5 min'}
      </Typography>
      <Typography
        variant='h6'
        align='center'
        style={{ 'padding-bottom': '10px' }}
      >
        Quiz Date - {'5 July 2021'}
      </Typography>
      <Divider />
      <Typography
        variant='h4'
        align='center'
        style={{ 'padding-bottom': '10px' }}
      >
        Question and Answers
      </Typography>
      {questions.map((qa, index) => {
        return <QAList view={true} key={index} qaSet={qa} />;
      })}
    </Container>
  );
};

export default QuizView;
