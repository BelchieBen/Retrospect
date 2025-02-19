import axios from 'axios';

interface JiraIssue {
  fields: {
    project: {
      key: string;
    };
    summary: string;
    description: string;
    issuetype: {
      name: string;
    };
  };
}

interface JiraProject {
    id: string;
    key: string;
    name: string;
}

class JiraService {
  private baseUrl: string;
  private authToken: string;

  constructor(baseUrl: string, authToken: string) {
    this.baseUrl = baseUrl;
    this.authToken = authToken;
  }

  async createTaskIssue(title: string, description: string, projectKey: string): Promise<void> {
    const issue: JiraIssue = {
      fields: {
        project: {
          key: projectKey,
        },
        summary: title,
        description: description,
        issuetype: {
          name: 'Task',
        },
      },
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}/rest/api/2/issue`,
        issue,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${this.authToken}`,
          },
        }
      );
      console.log('Issue created successfully:', response.data);
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  }

  async getProjectsForUser(username: string): Promise<JiraProject[]> {
    try {
      const jql = `assignee=${username}`;
      const response = await axios.get(
        `${this.baseUrl}/rest/api/2/search?jql=${encodeURIComponent(jql)}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${this.authToken}`,
          },
        }
      );

      const issues = response.data.issues;
      const projectsMap: { [key: string]: JiraProject } = {};

      issues.forEach((issue: any) => {
        const project = issue.fields.project;
        if (!projectsMap[project.key]) {
          projectsMap[project.key] = {
            id: project.id,
            key: project.key,
            name: project.name,
          };
        }
      });

      return Object.values(projectsMap);
    } catch (error) {
      console.error('Error fetching projects for user:', error);
      throw error;
    }
  }
}

export default JiraService;