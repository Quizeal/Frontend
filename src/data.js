// JSON structure of User
export const dummyUserJSON = {
  profile: {
    name: '',
    email: '',
    organisation: '',
    institute: '',
  },
  quizTaken: [
    {
      id: '2656fd25f6d',
      date: new Date('July 21, 2020'),
      quizName: 'Machines',
      teacherName: 'Dr. Saggu',
      marksObtained: 35,
      quizMarks: 50,
      quizDuration: '5',
      quizGiven: true,
      questions: [
        {
          question:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type andscrambled it to make a type specimen book. It has survived not only five centuries",
          options: [
            { data: '0.0018', ans: false, marked: true },
            { data: '0.018', ans: true, marked: true },
            { data: '0.18', ans: false, marked: true },
            { data: '0.18', ans: false, marked: true },
          ],
        },
      ],
    },
    {
      id: 'htt5df5g25',
      date: new Date('May 5, 2020'),
      quizName: 'Microprocessor',
      teacherName: 'Puneet',
      marksObtained: 35,
      quizMarks: 50,
      quizDuration: '10',
      quizGiven: false,
      questions: [
        {
          question:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type andscrambled it to make a type specimen book. It has survived not only five centuries",
          options: [
            { data: '0.0018', ans: false, marked: true },
            { data: '0.018', ans: true, marked: true },
            { data: '0.18', ans: false, marked: true },
            { data: '0.18', ans: false, marked: true },
          ],
        },
      ],
    },
    {
      id: 'fhjykm5d48g2gy6ju',
      date: new Date('July 1, 2021'),
      quizName: 'ML',
      teacherName: 'Poonam',
      marksObtained: 50,
      quizMarks: 50,
      quizDuration: '10',
      quizGiven: true,
      questions: [
        {
          question:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type andscrambled it to make a type specimen book. It has survived not only five centuries",
          options: [
            { data: '0.0018', ans: false, marked: true },
            { data: '0.018', ans: true, marked: true },
            { data: '0.18', ans: false, marked: true },
            { data: '0.18', ans: false, marked: true },
          ],
        },
      ],
    },
    {
      id: 'gf18efr15',
      date: new Date('June 14, 2021'),
      quizName: 'EAD',
      teacherName: 'Rintu Khana',
      marksObtained: 50,
      quizMarks: 50,
      quizDuration: '10',
      quizGiven: false,
      questions: [
        {
          question:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type andscrambled it to make a type specimen book. It has survived not only five centuries",
          options: [
            { data: '0.0018', ans: false, marked: true },
            { data: '0.018', ans: true, marked: true },
            { data: '0.18', ans: false, marked: true },
            { data: '0.18', ans: false, marked: true },
          ],
        },
      ],
    },
  ],
};
