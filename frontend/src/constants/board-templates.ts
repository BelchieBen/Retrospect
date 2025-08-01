export const templates = [
  {
    id: "retrospective",
    name: "Retrospective Board",
    description: "Perfect for sprint retrospectives and team reflection",
    color: "teal",
    image: "/retrospective.png",
    category: "Team Management",
    columns: [
      { name: "What Went Well", position: 1 },
      { name: "What Could Be Improved", position: 2 },
      { name: "Action Items", position: 3 },
    ],
  },
  {
    id: "kanban",
    name: "Kanban Template",
    description: "Track work progress with To Do, In Progress, Done columns",
    color: "green",
    image: "/kanban.svg",
    category: "Project Management",
    columns: [
      { name: "To Do", position: 1 },
      { name: "In Progress", position: 2 },
      { name: "Done", position: 3 },
    ],
  },
  {
    id: "planning",
    name: "Sprint Planning",
    description: "Plan your upcoming sprint with backlog and estimation",
    color: "pink",
    image: "/sprint_planning.png",
    category: "Agile",
    columns: [
      { name: "Backlog", position: 1 },
      { name: "This Sprint", position: 2 },
      { name: "In Progress", position: 3 },
      { name: "Testing", position: 4 },
      { name: "Complete", position: 5 },
    ],
  },
  {
    id: "brainstorm",
    name: "Brainstorming Session",
    description: "Collect ideas and organize thoughts collaboratively",
    color: "orange",
    image: "💡",
    category: "Creative",
    columns: [
      { name: "Ideas", position: 1 },
      { name: "Needs Discussion", position: 2 },
      { name: "Approved", position: 3 },
      { name: "Not Now", position: 4 },
    ],
  },
];
