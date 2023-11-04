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
  const [openInfoGoal, setOpenInfoGoal] = useState(false);

  const openGoalInfoModal = () => {
    setOpenInfoGoal(true);
  };

  const closeGoalInfoModal = () => {
    setOpenInfoGoal(false);
  };

  const openGoalModal = () => {
    setOpenAddGoal(true);
  };

  useEffect(() => {
    const data = localStorage.getItem('data');
    setGoals(JSON.parse(data || '{}'));
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Nav />
      <Box p={2}>
        <h1>My Goals</h1>

        {goals.map((goal: any) => (
          <>
            <Card
              key={goal.name}
              onClick={openGoalInfoModal}
              sx={{ cursor: 'pointer' }}
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
        ))}

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

        {openAddGoal && <GoalCreateModal openState={setOpenAddGoal} setGoalsData={setGoals} goalsData={goals} />}
      </Box>
    </ThemeProvider>
  );
}
