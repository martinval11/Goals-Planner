'use client';

import {
  Fab,
  Box,
  ThemeProvider,
  createTheme,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect } from 'react';

import Nav from '@/components/Nav/Nav';
import GoalInfoModal from '@/components/GoalModals/GoalInfoModal';
import GoalCreateModal from '@/components/GoalModals/GoalCreateModal';

import daysLeft from '@/lib/daysLeft';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home() {
  const [goals, setGoals] = useState([]);
  const [openAddGoal, setOpenAddGoal] = useState(false);

  const openGoalModal = () => {
    setOpenAddGoal(true);
  };

  const GoalCard = ({ goal }: any) => {
    const [openInfoGoal, setOpenInfoGoal] = useState(false);

    const openGoalInfoModal = () => {
      setOpenInfoGoal(true);
    };

    const closeGoalInfoModal = () => {
      setOpenInfoGoal(false);
    };

    return (
      <>
        <Card
          key={goal.name}
          onClick={openGoalInfoModal}
          sx={{ cursor: 'pointer', width: '300px' }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {goal.name}
            </Typography>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              {daysLeft(goal.date)}
            </Typography>
          </CardContent>
        </Card>

        {openInfoGoal && (
          <GoalInfoModal
            goal={goal}
            openState={openGoalInfoModal}
            closeState={closeGoalInfoModal}
          />
        )}
      </>
    );
  };

  useEffect(() => {
    const data = localStorage.getItem('data');
    if (data !== null) {
      setGoals(JSON.parse(data));
    }
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Nav />
      <Box p={2}>
        <h1>My Goals</h1>

        <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
          {!goals?.length ? (
            <h3>No goals</h3>
          ) : (
            goals.map((goal: any) => <GoalCard goal={goal} key={goal.name} />)
          )}
        </Box>

        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 22,
            right: 22,
          }}
          onClick={openGoalModal}
        >
          <AddIcon />
        </Fab>

        {openAddGoal && (
          <GoalCreateModal
            openState={setOpenAddGoal}
            setGoalsData={setGoals}
            goalsData={goals}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}
