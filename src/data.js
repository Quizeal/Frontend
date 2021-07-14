export const qaList = [
  {
    question: ' How does a ‘Subsistence Crisis’ happen? ',
    options: [
      {
        data: 'Bad harvest leads to scarcity of grains ',
        ans: false,
        marked: false,
      },
      {
        data: 'Food prices rise and the poorest cannot buy bread',
        ans: true,
        marked: true,
      },
      {
        data: 'Leads to weaker bodies, diseases, deaths and even food riots ',
        ans: false,
        marked: false,
      },
      { data: 'All the above ', ans: false, marked: false },
    ],
  },
  {
    question:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type andscrambled it to make a type specimen book. It has survived not only five centuries",
    options: [
      { data: '12', ans: false, marked: true },
      { data: '13', ans: false, marked: false },
      { data: '14', ans: false, marked: false },
      { data: '15', ans: true, marked: false },
    ],
  },
  {
    question:
      'Which of the following statements is untrue about the Third Estate ',
    options: [
      {
        data: 'The Third Estate was made of the poor only ',
        ans: false,
        marked: false,
      },
      {
        data: 'Within the Third Estate some were rich and some were poor ',
        ans: false,
        marked: true,
      },
      {
        data: 'Richer members of the Third Estate owned lands ',
        ans: true,
        marked: false,
      },
      {
        data: 'Peasants were obliged to serve in the army, or build roads ',
        ans: true,
        marked: false,
      },
    ],
  },
  {
    question:
      ' In the meeting of the Estates General, the members of the Third Estate demanded that ',
    options: [
      {
        data: 'All the three Estates should have one vote altogether ',
        ans: false,
        marked: false,
      },
      {
        data: 'Each member of the three Estates should have one vote ',
        ans: false,
        marked: true,
      },
      { data: 'Each Estate should have one vote ', ans: true, marked: false },
      { data: 'None of the above ', ans: true, marked: false },
    ],
  },
  {
    question: ' A guillotine was ____________________ ',
    options: [
      {
        data: 'A device consisting of two poles and a blade with which a person was beheaded ',
        ans: false,
        marked: false,
      },
      {
        data: 'A fine sword with which heads were cut off ',
        ans: false,
        marked: true,
      },
      { data: 'A special noose to hang people ', ans: true, marked: false },
      { data: 'none of the above ', ans: true, marked: false },
    ],
  },
  {
    question:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type andscrambled it to make a type specimen book. It has survived not only five centuries",
    options: [
      { data: 'New York Bulls', ans: false, marked: false },
      { data: 'Los Angeles Kings', ans: false, marked: true },
      { data: 'Golden State Warriros', ans: true, marked: false },
      { data: 'Huston Rocket', ans: true, marked: false },
    ],
  },
  {
    question:
      ' What was the ‘Subsistence Crisis’ which occurred frequently in France? ',
    options: [
      {
        data: 'An extreme situation endangering the basic means of livelihood ',
        ans: false,
        marked: false,
      },
      { data: 'Subsidy in food grains ', ans: false, marked: true },
      {
        data: 'Large-scale production of food grains ',
        ans: true,
        marked: false,
      },
      { data: 'None of the above ', ans: true, marked: false },
    ],
  },
  {
    question: ' The word livres stands for: ',
    options: [
      { data: 'New York Bulls', ans: false, marked: false },
      { data: 'Los Angeles Kings', ans: false, marked: true },
      { data: 'Golden State Warriros', ans: true, marked: false },
      { data: 'Huston Rocket', ans: true, marked: false },
    ],
  },
];

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
