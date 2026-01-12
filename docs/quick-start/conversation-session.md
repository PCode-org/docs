---
title: Creating a Conversation Session
description: Learn how to create and use conversation sessions to interact with AI in PCode.
sidebar_position: 30
---

# Creating a Conversation Session

This guide will show you how to create and use conversation sessions in PCode. Conversation sessions are the primary way to interact with AI for code analysis, review, planning, and modification tasks.

## Prerequisites

Before creating a conversation session, make sure you have:

- PCode installed and running (see [Installation](/docs/quick-start/installation))
- A project created (see [Creating Your First Project](/docs/quick-start/create-first-project))

## Session Types in PCode

PCode supports two types of sessions, each designed for different workflows:

### Conversation Sessions (This Guide)

Conversation sessions are traditional chat-based interactions with AI. They are ideal for:

- Asking questions about your codebase
- Getting code explanations and summaries
- Planning and designing implementations
- Code review and feedback
- Making code changes when in edit mode

### Idea Sessions

Idea sessions (covered in the next guide) provide a structured workflow for transforming ideas into executed changes. They include planning, breakdown, and execution phases.

## Creating a Conversation Session

Follow these steps to create a new conversation session:

### Step 1: Locate the Session List

On the left side of the PCode interface, you'll find the **Session List** panel. This displays all your existing sessions and allows you to create new ones.

### Step 2: Click the "Add Chat" Button

At the top of the Session List, click the **+ Add Chat** button. This will create a new conversation session.

### Step 3: Start Chatting

A new conversation window will appear. You can now start typing your messages to interact with the AI.

```
┌─────────────────────────────────────────────────────────────┐
│  PCODE                                                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐  ┌──────────────────────────────────────┐ │
│  │  Sessions   │  │  Conversation Session                 │ │
│  │             │  │                                       │ │
│  │  [+ Add     │  │  User: How do I create a new API?    │ │
│  │    Chat]    │  │                                       │ │
│  │             │  │  AI: To create a new API in PCode...  │ │
│  │  ┌─────┐   │  │                                       │ │
│  │  │Chat1│   │  │  ┌─────────────────────────────────┐  │ │
│  │  └─────┘   │  │  │  Mode: [Read-Only | Edit]        │  │ │
│  │             │  │  └─────────────────────────────────┘  │ │
│  └─────────────┘  │                                       │ │
│                   │  [Type your message...]               │ │
│                   └──────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Understanding Modes

PCode conversation sessions operate in two distinct modes with different capabilities and security implications.

### Read-Only Mode (Default)

When you create a new conversation session, it starts in **Read-Only Mode**. This is the safest mode for exploring and understanding your codebase.

**What AI can do in Read-Only Mode:**

- Read and analyze files in your project
- Answer questions about code structure and logic
- Provide explanations and summaries
- Review code and suggest improvements
- Plan implementation approaches

**What AI cannot do in Read-Only Mode:**

- Modify any files
- Create new files
- Delete existing files
- Run commands that change your project

### Edit Mode

**Edit Mode** gives the AI permission to modify files in your project. You must manually enable this mode when you want the AI to make changes.

**How to enable Edit Mode:**

1. Look for the mode indicator in the conversation window
2. Click the toggle or switch to change from Read-Only to Edit
3. The mode indicator will update to show Edit Mode is active

**When to use Edit Mode:**

- You want the AI to implement a feature
- You need bug fixes applied
- You want refactoring performed
- You need new files created

:::caution Security Notice
Edit Mode allows the AI to modify your files. Only enable this mode when you trust the AI's suggestions and want changes applied to your codebase.
:::

### Mode Switching Flow

```
┌────────────────┐
│ User starts    │
│ conversation   │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│ Default:       │
│ Read-Only Mode │
│ - AI can read  │
│ - AI cannot    │
│   modify       │
└────────┬───────┘
         │
         │ User wants AI
         │ to make changes?
         │
         ▼
    ┌────────┐
    │ Switch │
    │ to Edit│
    │ Mode   │
    └───┬────┘
        │
        ▼
┌────────────────┐
│ Edit Mode      │
│ - AI can read  │
│ - AI can       │
│   modify files │
└────────────────┘
```

## Typical Use Cases

### Analysis and Understanding

Use conversation sessions in Read-Only Mode to understand your codebase:

- **Project Summary**: "Give me an overview of this project's architecture"
- **Code Explanation**: "Explain how the authentication system works"
- **Architecture Questions**: "What design patterns are used in this codebase?"

Example:
```
User: Can you explain how the user service handles registration?

AI: The user service handles registration through a multi-step process...
[Detailed explanation of the registration flow]
```

### Review and Feedback

Get AI feedback on your code in Read-Only Mode:

- **Code Review**: "Review this function for potential issues"
- **Best Practices**: "Does this code follow best practices?"
- **Bug Spotting**: "Are there any bugs in this implementation?"

Example:
```
User: Review the UserService.cs file for potential issues

AI: I've reviewed UserService.cs and found several areas for improvement...
[Lists specific issues and suggestions]
```

### Planning and Design

Use conversations to plan your work before implementation:

- **Task Breakdown**: "Break down the implementation of a new feature"
- **Implementation Planning**: "What's the best approach to add caching?"
- **Design Discussions**: "Should we use a factory or builder pattern here?"

Example:
```
User: I need to add file upload functionality. Can you help me plan this?

AI: Here's a suggested approach for implementing file uploads...
[Step-by-step implementation plan]
```

### Code Changes (Edit Mode)

When you're ready to make changes, switch to Edit Mode:

- **Refactoring**: "Refactor this class to use dependency injection"
- **Bug Fixes**: "Fix the null reference exception in this method"
- **Feature Implementation**: "Implement the user profile update endpoint"

Example:
```
User: [Switches to Edit Mode] Please add input validation to the CreateUser method

AI: I'll add validation to the CreateUser method...
[Applies the changes to the file]
```

## Comparison with Traditional IDEs

If you've used other AI-powered development tools, conversation sessions will feel familiar:

- **VS Code Copilot Chat**: Similar chat-based interaction for code questions and assistance
- **Cursor AI Chat**: Familiar conversation interface for AI-powered development
- **GitHub Copilot**: Like asking Copilot questions about your codebase

The key difference in PCode is the explicit **Read-Only vs Edit Mode** distinction, which gives you clear control over when AI can modify your files.

## Next Steps

Now that you understand conversation sessions, continue exploring:

- **[Create Your First Project](/docs/quick-start/create-first-project)**: Set up your first project
- **[Proposal Session](/docs/quick-start/proposal-session)**: Learn about the proposal workflow

## Tips for Effective Conversations

1. **Be Specific**: Clear questions lead to better answers
   - *Good*: "How does the authentication middleware validate tokens?"
   - *Vague*: "How does auth work?"

2. **Provide Context**: Reference specific files or components
   - *Good*: "In UserService.cs, line 45, why is the user checked twice?"
   - *Vague*: "Why is there a duplicate check?"

3. **Start in Read-Only Mode**: Explore and understand before making changes

4. **Use Edit Mode Intentionally**: Switch only when you're ready to apply changes

5. **Iterate**: Use the conversation history to refine your understanding and approach
