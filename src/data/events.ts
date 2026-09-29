import { EventItem } from '../types/hackathon';

export const mockEvents: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Compute 50 Main Hackathon',
    description: 'The flagship 48-hour continuous coding marathon featuring top student teams across the nation.',
    date: 'Day 1 - Day 2',
    type: 'Hackathon',
    status: 'Upcoming',
  },
  {
    id: 'evt-2',
    title: 'Algorithmic Coding Challenge',
    description: 'Competitive programming contest designed to test extreme speed and precision algorithms.',
    date: 'Day 1, 2:00 PM',
    type: 'Coding Contest',
    status: 'Upcoming',
  },
  {
    id: 'evt-3',
    title: 'Keynote & Tech Workshop',
    description: 'Interactive session by industry pioneers on AI engineering and system scaling.',
    date: 'Day 1, 5:00 PM',
    type: 'Workshop',
    status: 'Upcoming',
  },
  {
    id: 'evt-4',
    title: 'Project Pitch & Grand Finale',
    description: 'Final short-listed teams present live demos to executive judges.',
    date: 'Day 2, 4:00 PM',
    type: 'Valedictory',
    status: 'Upcoming',
  },
];
