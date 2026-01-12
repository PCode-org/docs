---
title: Create Your First Project
description: Learn how to create and configure your first project in PCode, from repository preparation to OpenSpec initialization.
sidebar_position: 20
---

# Create Your First Project

Now that you have PCode installed and running, let's create your first project. This guide will walk you through the complete process of setting up a project in PCode, from preparing your repository to initializing OpenSpec.

## Prerequisites

Before creating your first project, make sure you have:

- PCode installed and running (see [Installation Guide](/docs/quick-start/installation))
- A code repository you want to manage with PCode
- Git installed and configured
- Basic familiarity with command line operations

## Step 1: Prepare Your Repository

Before adding a project to PCode, ensure your repository is ready.

### Initialize Git (if not already done)

If your project is not yet a Git repository, initialize it:

```bash
cd /path/to/your/project
git init
git add .
git commit -m "Initial commit"
```

### Remote Repository Setup

If you're using a remote repository (GitHub, GitLab, etc.), add the remote:

```bash
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

:::tip
Having your repository on a remote platform like GitHub is recommended for better collaboration and backup.
:::

## Step 2: Add Project in PCode Interface

Now let's add your project to the PCode interface.

### Access the Projects Page

1. Open your browser and navigate to `http://127.0.0.1:34567`
2. Click on **Projects** in the navigation sidebar
3. Click the **Add Project** button

### Configure Project Settings

Fill in the project information:

| Field | Description | Example |
|-------|-------------|---------|
| **Name** | A friendly name for your project | `My Website` |
| **Repository Path** | Local path to your repository | `/Users/john/projects/my-website` |
| **Description** | Optional project description | `A personal website built with React` |
| **Tags** | Optional tags for organization | `web, frontend, react` |

:::note
The repository path must point to a valid Git repository on your local machine.
:::

### Save the Project

After filling in the required information:

1. Click **Save** to add the project
2. PCode will verify the repository path
3. Your project will appear in the projects list

## Step 3: Initialize OpenSpec

OpenSpec is PCode's proposal and specification management system. Initializing OpenSpec in your project creates the necessary structure for managing changes.

### Navigate to Project Details

1. Click on your newly created project in the projects list
2. You'll see the project overview page

### Run OpenSpec Initialization

In the project overview, locate the **OpenSpec** section:

1. Click **Initialize OpenSpec**
2. PCode will create the following structure in your repository:

```
your-repository/
└── openspec/
    ├── project.md          # Project metadata and configuration
    ├── changes/            # Directory for change proposals
    │   └── .gitkeep
    ├── specs/              # Directory for specifications (optional)
    │   └── .gitkeep
    └── AGENTS.md           # OpenSpec agent instructions
```

### Commit the OpenSpec Structure

After initialization, commit the new files to your repository:

```bash
cd /path/to/your/project
git add openspec/
git commit -m "Initialize OpenSpec structure"
```

:::tip
Keep the OpenSpec structure in version control to track all proposals and specifications.
:::

## Step 4: Optimize project.md

The `openspec/project.md` file contains important metadata about your project. Let's customize it for your needs.

### Edit project.md

Open `openspec/project.md` in your text editor:

```bash
cd /path/to/your/project
code openspec/project.md  # or use your preferred editor
```

### Understanding project.md Structure

The file contains the following sections:

```markdown
---
id: your-project-id
name: Your Project Name
description: A brief description of your project
version: 0.1.0
created: YYYY-MM-DD
---

# Project Metadata

This file contains essential information about your project...
```

### Customize for Your Project

Update the fields to match your project:

| Field | Description | Example |
|-------|-------------|---------|
| **id** | Unique identifier (kebab-case) | `my-awesome-website` |
| **name** | Display name | `My Awesome Website` |
| **description** | Short description | `A personal website showcasing my work` |
| **version** | Current version | `0.1.0` |
| **tags** | Project tags | `web, personal, portfolio` |

### Example project.md

```markdown
---
id: my-portfolio-website
name: My Portfolio Website
description: A personal portfolio website built with Next.js and Tailwind CSS
version: 0.1.0
created: 2025-01-12
tags:
  - web
  - portfolio
  - nextjs
  - tailwind
---

# Project Metadata

This project is a personal portfolio website showcasing my development work...
```

### Save and Commit

After customizing:

```bash
git add openspec/project.md
git commit -m "Customize project metadata"
```

## Verify Your Setup

Let's verify everything is working correctly.

### Check Project in PCode

1. Go back to the PCode interface
2. Navigate to your project
3. Verify the OpenSpec section shows as initialized
4. Check that the project metadata is displayed correctly

### Create Your First Proposal (Optional)

To test the OpenSpec workflow, try creating a simple proposal:

1. In your project, click **New Proposal**
2. Enter a title: "Add About page"
3. Describe the change you want to make
4. Save the proposal
5. Use the CLI commands shown to manage the proposal

:::tip
See [Proposal Session](/docs/quick-start/proposal-session) for more details on managing proposals.
:::

## Common Issues

### Repository Path Not Found

If PCode can't find your repository:

1. **Verify the path** is correct and absolute
2. **Check permissions** - PCode needs read access to the directory
3. **Ensure it's a Git repository** - run `git status` in the directory

### OpenSpec Initialization Fails

If initialization fails:

1. **Check directory permissions** - ensure you can write to the repository
2. **Verify Git is initialized** - run `git status` in your project directory
3. **Check for existing openspec folder** - remove it if it exists and try again

### Project.md Not Updating

If changes to `project.md` aren't reflected:

1. **Save the file** - ensure your editor saved the changes
2. **Refresh the page** in PCode
3. **Commit the changes** - PCode may only track committed changes

## Next Steps

Congratulations! You've created your first project in PCode. Here are some recommended next steps:

- **[Conversation Session](/docs/quick-start/conversation-session)** - Learn how to work with AI-powered coding sessions
- **[Proposal Session](/docs/quick-start/proposal-session)** - Deep dive into managing proposals

## Summary

In this guide, you learned how to:

1. Prepare your repository for PCode
2. Add a project through the PCode interface
3. Initialize OpenSpec in your project
4. Customize `project.md` with your project metadata
5. Verify your setup

You're now ready to use PCode's powerful features for your development workflow!
