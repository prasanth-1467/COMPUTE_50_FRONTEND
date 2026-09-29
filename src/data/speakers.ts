import { Speaker } from '../types/hackathon';

export const mockSpeakers: Speaker[] = [
  {
    id: 'spk-1',
    name: 'Placeholder Speaker 1',
    role: 'Distinguished Engineer',
    organization: 'Tech Partner Corp',
    bio: 'Industry veteran specializing in scalable systems and AI architecture.',
    image: 'https://placehold.co/300x300/1e293b/94a3b8?text=Speaker+1',
    type: 'speaker',
  },
  {
    id: 'spk-2',
    name: 'Placeholder Judge 1',
    role: 'VP of Engineering',
    organization: 'Cloud Enterprise Solutions',
    bio: 'Lead judge with extensive experience evaluating hackathons nationwide.',
    image: 'https://placehold.co/300x300/1e293b/94a3b8?text=Judge+1',
    type: 'judge',
  },
  {
    id: 'spk-3',
    name: 'Placeholder Mentor 1',
    role: 'Senior Product Architect',
    organization: 'InnovateX Labs',
    bio: 'Hands-on technical mentor assisting teams with design and full-stack development.',
    image: 'https://placehold.co/300x300/1e293b/94a3b8?text=Mentor+1',
    type: 'mentor',
  },
];
