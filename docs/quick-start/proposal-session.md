---
title: Turning Ideas into Code with Proposal Sessions
description: Learn how to use Proposal Sessions (Idea Sessions) to transform abstract ideas into executable code through OpenSpec's structured workflow.
sidebar_position: 40
---

# Turning Ideas into Code with Proposal Sessions

This guide will show you how to use Proposal Sessions (also called Idea Sessions) in PCode. Proposal Sessions provide a structured workflow for transforming your ideas into executed changes through OpenSpec's proposal lifecycle system.

## Prerequisites

Before using Proposal Sessions, make sure you have:

- PCode installed and running (see [Installation](/docs/quick-start/installation))
- A project created with OpenSpec initialized (see [Creating Your First Project](/docs/quick-start/create-first-project))
- Basic understanding of Conversation Sessions (see [Creating a Conversation Session](/docs/quick-start/conversation-session))

## What is a Proposal Session?

A Proposal Session is a structured workflow that guides you through the process of turning an abstract idea into executed code. Unlike Conversation Sessions which are free-form chats, Proposal Sessions follow a defined 9-stage lifecycle:

- **State 0**: Initialization - Define your idea
- **State 1**: Optimizing - AI refines your description
- **State 2**: Draft - Review and manually edit
- **State 3**: Generating - AI creates detailed plans
- **State 4**: Review - Annotate and approve changes
- **State 5**: Executing - AI implements the changes
- **State 6**: Execution Complete - Verify in IDE
- **State 7**: Archiving - Finalize the proposal
- **State 8**: Archived - Lifecycle complete

```
┌────────────────────────────────────────────────────────────────────┐
│                    Proposal Session Lifecycle                      │
├────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────┐    ┌───────────┐    ┌─────────┐    ┌───────────┐    │
│  │ State 0 │───▶│ State 1   │───▶│ State 2 │───▶│ State 3   │    │
│  │  New    │    │ Optimiz-  │    │  Draft  │    │ Generat-  │    │
│  │  Idea   │    │ ing (AI)  │    │(Manual) │    │ ing (AI)  │    │
│  └─────────┘    └───────────┘    └─────────┘    └───────────┘    │
│       │                                                                 │
│       ▼                                                                 │
│  ┌─────────┐    ┌───────────┐    ┌─────────┐    ┌───────────┐    │
│  │ State 8 │◀───│ State 7   │◀───│ State 6 │◀───│ State 4   │    │
│  │Archived │    │ Archiving │    │Exec.    │    │  Review   │    │
│  │         │    │  (AI)     │    │Complete │    │ (Manual)   │    │
│  └─────────┘    └───────────┘    └─────────┘    └─────┬─────┘    │
│                                                         │          │
│                                                         ▼          │
│                                                    ┌───────────┐  │
│                                                    │ State 5   │  │
│                                                    │ Executing │  │
│                                                    │   (AI)    │  │
│                                                    └───────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────────┘
```

## State 0: Initialization

The first step is to create a new idea and provide an initial description.

### Create a New Idea

1. In the Session List panel, click the **+ New Idea** button
2. Enter a title for your proposal
3. Provide a description of what you want to accomplish

```
┌─────────────────────────────────────────────────────────────┐
│  New Idea                                                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Title: [Add user authentication system]                    │
│                                                              │
│  Description:                                                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ I want to add JWT-based authentication to my app.    │   │
│  │ Users should be able to register, login, and logout. │   │
│  │ Passwords should be hashed using bcrypt.             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  [Cancel]                              [Create Proposal]     │
└─────────────────────────────────────────────────────────────┘
```

### Tips for Good Initial Descriptions

- **Be clear about the goal**: What problem are you solving?
- **Mention key requirements**: Any specific technologies or constraints?
- **Keep it high-level**: Details will be added in later stages

## State 1: Optimizing (AI-Automatic)

After you submit your idea, AI automatically processes and refines it.

### What Happens During Optimization

The AI analyzes your description and:
- **Clarifies ambiguous requirements**
- **Suggests appropriate technologies**
- **Identifies potential edge cases**
- **Generates a proposal name**

### No User Action Required

This stage is fully automatic. You'll see a loading indicator while the AI works:

```
┌─────────────────────────────────────────────────────────────┐
│  Optimizing...                                              │
│  AI is refining your description                           │
│  ●●●●○○○○○○                                                 │
└─────────────────────────────────────────────────────────────┘
```

### Result: Optimized Draft

Once complete, you'll see the optimized version with:
- A generated proposal name
- Refined description with additional details
- Identified scope and boundaries

## State 2: Draft (User Manual)

Now you have the opportunity to review and edit the proposal before planning begins.

### Review the Optimized Content

The optimized draft is presented for your review:

```
┌─────────────────────────────────────────────────────────────┐
│  Proposal: Add JWT Authentication System                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Description:                                                │
│  [AI-optimized description text...]                         │
│                                                              │
│  [Edit]  [Regenerate]  [Approve & Continue]                 │
└─────────────────────────────────────────────────────────────┘
```

### Your Options

1. **Edit**: Modify the description manually
2. **Regenerate**: Ask AI to re-optimize with different parameters
3. **Approve & Continue**: Accept the draft and move to planning

### Making Manual Edits

Click **Edit** to modify the proposal:

```markdown
# Add JWT Authentication System

## Overview
Implement JWT-based authentication with secure password handling.

## Requirements
- User registration with email validation
- Login/logout functionality
- Password hashing with bcrypt
- JWT token generation and validation
- Refresh token mechanism

## Tech Stack
- JWT for token management
- bcrypt for password hashing
- Standard auth middleware
```

## State 3: Generating (AI-Automatic)

After you approve the draft, AI automatically generates detailed implementation plans.

### Click "Generate Plan"

Click the **Generate Plan** button to trigger automatic planning:

```
┌─────────────────────────────────────────────────────────────┐
│  Generating Plans...                                        │
│  AI is creating detailed implementation documents          │
│  ●●●●●●●●○○                                                 │
└─────────────────────────────────────────────────────────────┘
```

### Document Types Generated

The AI creates multiple documents:

| Document | Purpose |
|----------|---------|
| **Plan** | Step-by-step implementation guide |
| **Spec** | Technical specifications and architecture |
| **Changes** | List of files to be created/modified |
| **Tests** | Test cases and validation strategies |

### Review Generated Documents

Once generation is complete, you can review all documents:

```
┌─────────────────────────────────────────────────────────────┐
│  Generated Documents                                        │
├─────────────────────────────────────────────────────────────┤
│  📄 Plan           - Implementation steps                   │
│  📄 Spec           - Technical specifications               │
│  📄 Changes        - Files to modify                        │
│  📄 Tests          - Test strategies                        │
│                                                              │
│                    [Review & Annotate]                      │
└─────────────────────────────────────────────────────────────┘
```

## State 4: Review (User Manual)

This is the most critical stage where you review, annotate, and approve the implementation plan.

### The Three-Tier Annotation System

PCode provides three levels of annotation for providing feedback:

```
┌─────────────────────────────────────────────────────────────┐
│  Annotation Levels                                          │
├─────────────────────────────────────────────────────────────┤
│  1. Inline Annotations   - Specific line feedback          │
│  2. File Annotations     - Whole document feedback          │
│  3. Global Annotations   - Overall proposal feedback        │
└─────────────────────────────────────────────────────────────┘
```

### 1. Inline Annotations

Highlight specific text and add comments:

```
┌─────────────────────────────────────────────────────────────┐
│  Implementation Plan                                       │
├─────────────────────────────────────────────────────────────┤
│  1. Create AuthService class                               │
│     [TODO: Ensure this follows existing patterns]    ◀──Inline
│                                                              │
│  2. Add JWT middleware            ◀──[Use existing middleware]│
│                                                              │
│  3. Create auth endpoints                    ◀──[Add rate limit]
└─────────────────────────────────────────────────────────────┘
```

### 2. File Annotations

Add feedback at the document level:

```
┌─────────────────────────────────────────────────────────────┐
│  📝 File Annotation: Plan.md                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ This plan looks good overall, but please:            │   │
│  │ - Consider using our existing BaseRepository pattern │   │
│  │ - Add error handling for duplicate emails            │   │
│  │ - Include logging at key steps                       │   │
│  └──────────────────────────────────────────────────────┘   │
│  [Save]                                                     │
└─────────────────────────────────────────────────────────────┘
```

### 3. Global Annotations

Provide overall feedback for the proposal:

```
┌─────────────────────────────────────────────────────────────┐
│  🌐 Global Annotation                                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ General feedback for the entire proposal:            │   │
│  │                                                      │   │
│  │ The scope seems appropriate for a first iteration.  │   │
│  │ Let's focus on basic auth first, social login can    │   │
│  │ be a separate proposal later.                        │   │
│  └──────────────────────────────────────────────────────┘   │
│  [Save]                                                     │
└─────────────────────────────────────────────────────────────┘
```

### The Submit Cycle

Annotation works in cycles:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Annotate   │────▶│   Submit    │────▶│   AI        │
│  (You)      │     │  Feedback   │     │  Adjusts    │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                             │
                                             ▼
                                      ┌─────────────┐
                                      │  Review     │
                                      │  Updated    │
                                      │  Plans      │
                                      └──────┬──────┘
                                             │
                                    Satisfied? │ No
                                             │
                                    ┌────────┴────────┐
                                    │                 │
                                   Yes               No
                                    │                 │
                                    ▼                 ▼
                              ┌─────────┐    ┌─────────────┐
                              │ Execute │    │ Annotate     │
                              │   Now   │    │   Again      │
                              └─────────┘    └─────────────┘
```

### Approve for Execution

Once you're satisfied with the plans:
1. Ensure all critical feedback is addressed
2. Click **Approve & Execute**
3. The proposal moves to the Execution stage

## State 5: Executing (AI-Automatic)

The AI now implements the approved plan automatically.

### Click "Execute Now"

Click the **Execute Now** button to start implementation:

```
┌─────────────────────────────────────────────────────────────┐
│  Executing...                                              │
│  AI is implementing the approved plan                      │
│  ●●●●●●●●●○                                                 │
│                                                              │
│  Creating AuthService...                                    │
│  Adding JWT middleware...                                   │
│  Creating auth endpoints...                                 │
└─────────────────────────────────────────────────────────────┘
```

### What Happens During Execution

The AI:
- Creates new files as specified
- Modifies existing files with changes
- Follows the implementation plan step-by-step
- Shows progress for each action

### Execution Completion

When execution completes, you'll see:
- Summary of files created/modified
- Any warnings or issues encountered
- Link to review the changes

## State 6: Execution Complete

The AI has finished implementation. Now it's time to verify the changes.

### Review in Your IDE

Open your project in your preferred IDE to review:

```
┌─────────────────────────────────────────────────────────────┐
│  Execution Complete!                                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Files Created:                                             │
│  ✓ src/services/AuthService.ts                             │
│  ✓ src/middleware/jwtAuth.ts                               │
│  ✓ src/controllers/AuthController.ts                       │
│                                                              │
│  Files Modified:                                            │
│  ✓ src/index.ts (added middleware)                         │
│  ✓ src/routes/index.ts (added auth routes)                 │
│                                                              │
│  [Open in IDE]  [Continue to Archive]                      │
└─────────────────────────────────────────────────────────────┘
```

### Edit Mode Conversation

State 6 enables a special conversation mode for post-execution adjustments:

```
┌─────────────────────────────────────────────────────────────┐
│  Execution Complete - Edit Mode Enabled                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ AI: I've implemented the JWT authentication system. │   │
│  │ Would you like me to make any adjustments?          │   │
│  │                                                      │   │
│  │ You: Can you add rate limiting to the login         │   │
│  │      endpoint?                                      │   │
│  │                                                      │   │
│  │ AI: I'll add rate limiting to the login endpoint.   │   │
│  │ [Applies changes]                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  [Satisfied - Continue to Archive]                          │
└─────────────────────────────────────────────────────────────┘
```

### Verification Checklist

Before proceeding:
- [ ] Review all file changes in your IDE
- [ ] Test the new functionality locally
- [ ] Run any existing tests
- [ ] Request any final adjustments via edit mode
- [ ] Ensure code quality standards are met

## State 7: Archiving (AI-Automatic)

Once you're satisfied with the implementation, the AI archives the proposal.

### Click "Archive Plan"

Click the **Archive Plan** button to finalize:

```
┌─────────────────────────────────────────────────────────────┐
│  Archiving...                                              │
│  AI is finalizing the proposal                             │
│  ●●●●●●●●●●                                                 │
└─────────────────────────────────────────────────────────────┘
```

### What Happens During Archiving

The AI:
- Marks the proposal as complete
- Creates a summary of changes
- Generates commit message suggestions
- Moves the proposal to the archive

:::note No Code Commit
Archiving does NOT automatically commit code to your repository. You should review the changes and commit manually using git.
:::

## State 8: Archived

The proposal lifecycle is complete. The proposal is now in the archive.

### View Archived Proposal

```
┌─────────────────────────────────────────────────────────────┐
│  ✅ Proposal Archived                                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Title: Add JWT Authentication System                      │
│  Status: Completed                                         │
│  Date: 2025-01-12                                          │
│                                                              │
│  Summary:                                                   │
│  Implemented JWT-based authentication with bcrypt password │
│  hashing. Added AuthService, JWT middleware, and auth      │
│  endpoints.                                                │
│                                                              │
│  Files Changed: 5                                           │
│  Lines Added: 342                                           │
│                                                              │
│  [View Full Details]  [Create New Proposal]                │
└─────────────────────────────────────────────────────────────┘
```

### Commit Your Changes

Remember to commit the implemented changes:

```bash
cd /path/to/your/project
git add .
git commit -m "Add JWT authentication system

- Implement AuthService with JWT token generation
- Add JWT middleware for route protection
- Create auth endpoints (register, login, logout)
- Integrate bcrypt for password hashing"
```

## State Reference

| State | Name | Type | Description |
|-------|------|------|-------------|
| 0 | Initialization | User | Create new idea with title and description |
| 1 | Optimizing | AI | AI refines description and generates name |
| 2 | Draft | User | Review and manually edit the proposal |
| 3 | Generating | AI | AI creates detailed implementation plans |
| 4 | Review | User | Annotate plans and approve execution |
| 5 | Executing | AI | AI implements the approved changes |
| 6 | Execution Complete | User | Verify changes and make adjustments |
| 7 | Archiving | AI | AI finalizes and archives the proposal |
| 8 | Archived | - | Proposal lifecycle complete |

## When to Use Proposal Sessions

### Use Proposal Sessions for:

- **Major Features**: Adding significant new capabilities
- **Refactoring**: Large-scale code restructuring
- **Architecture Changes**: Modifying system design patterns
- **Multi-file Changes**: Changes affecting many files
- **Complex Implementations**: Tasks requiring careful planning

### Use Conversation Sessions for:

- **Questions**: Quick answers about code
- **Small Changes**: Single-file modifications
- **Exploration**: Understanding existing code
- **Planning**: Discussing approaches before implementation
- **Code Review**: Getting feedback on specific code

```
┌─────────────────────────────────────────────────────────────┐
│  Choosing the Right Session Type                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Conversation Sessions           Proposal Sessions          │
│  ┌─────────────────┐           ┌─────────────────┐         │
│  │ • Quick questions│           │ • Major features │         │
│  │ • Code analysis  │           │ • Refactoring   │         │
│  │ • Small edits    │           │ • Architecture  │         │
│  │ • Exploration    │           │ • Multi-file    │         │
│  │                 │           │   changes       │         │
│  │ [Fast & Flexible]│           │ [Structured]    │         │
│  └─────────────────┘           └─────────────────┘         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Tips for Effective Proposal Sessions

### 1. Start with a Clear Vision

Before creating a proposal, have a clear understanding of:
- What problem you're solving
- The expected outcome
- Any constraints or requirements

```
Good: "Add user authentication with JWT for secure API access"
Vague: "Add auth stuff"
```

### 2. Use the Draft Stage Wisely

State 2 (Draft) is your best opportunity to:
- Clarify requirements
- Adjust the scope
- Set expectations for the AI

### 3. Be Thorough in Annotations

In State 4 (Review), detailed annotations lead to better results:
- **Inline**: Specific implementation details
- **File**: Document-level feedback
- **Global**: Overall direction and constraints

### 4. Test After Execution

Always verify the implementation in State 6:
- Run the application
- Test new functionality
- Check for regressions
- Use edit mode for adjustments

### 5. Document Decisions

Use annotations to document why certain approaches were chosen:
- "Using bcrypt instead of MD5 for security"
- "Deferring social login to future proposal"
- "Reusing existing BaseRepository pattern"

### 6. Iterate If Needed

If the first pass isn't perfect:
- Use edit mode in State 6 for adjustments
- Create a follow-up proposal for additional features
- Learn from each proposal to improve future ones

## Next Steps

Now that you understand Proposal Sessions, continue exploring:

- **[Create Your First Project](/docs/quick-start/create-first-project)**: Set up your first project
- **[Conversation Session](/docs/quick-start/conversation-session)**: Learn about AI-powered conversations

## Summary

In this guide, you learned:

1. What Proposal Sessions are and when to use them
2. The complete 9-stage proposal lifecycle
3. How AI-automatic stages (1, 3, 5, 7) work
4. How to use user-manual stages (0, 2, 4, 6)
5. The three-tier annotation system
6. When to choose Proposal vs. Conversation sessions

You're now ready to transform your ideas into executed code using PCode's structured Proposal workflow!
