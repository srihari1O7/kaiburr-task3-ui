# Kaiburr Assessment - Task 3: Web UI (React + TypeScript + Ant Design)

This repository contains the frontend user interface for the Kaiburr Task Manager, built using React 19, TypeScript, and the Ant Design component library. It interacts with the backend REST API created in Task 1 (and deployed via Kubernetes in Task 2).

## Features

-   **Task Creation:** A form using Ant Design components (`Form`, `Input`, `Button`) allows users to create new tasks. Includes basic validation.
-   **Task List:** Displays all tasks fetched from the API using `List` and `Typography`. Shows task name, command, assigned user, and creation date.
-   **Search:** An `Input.Search` component allows filtering the task list by name in real-time.
-   **Task Deletion:** A delete button (`Button`, `Popconfirm`) with a confirmation step allows removing tasks.
-   **Task Execution:** An execute button (`Button`) triggers the backend's `/execute` endpoint.
-   **Output Display:** A `Modal` component displays the output (or error message) returned from the task execution, using `react-syntax-highlighter` for clear formatting.
-   **Loading & Error States:** Uses `Spin` and `Alert` components to provide user feedback during API calls.
-   **Styling:** Utilizes Ant Design's layout components (`Layout`) and CSS reset (`antd/dist/reset.css`) for a consistent and clean look.
-   **Auto-Refresh:** The task list automatically refreshes after a new task is created or deleted.

## Tech Stack

-   **React 19**
-   **TypeScript**
-   **Vite** (Build Tool)
-   **Ant Design** (`antd`, `@ant-design/icons`)
-   **npm**
-   **`react-syntax-highlighter`**

## How to Run

### 1. Prerequisites

-   **Node.js** (LTS version recommended, includes npm)
-   **Git**
-   The **backend API (Task 1 / Task 2)** must be running and accessible (e.g., the Kubernetes deployment from Task 2 running on `http://localhost:30083`).

### 2. Setup

Clone the repository and install the necessary dependencies.

```sh
# Clone the repository
git clone <your-github-repo-url>
cd kaiburr-task3-ui

# Install dependencies
npm install

npm run dev

Screenshots
(Your Name: Srihari Kubenteran) (Date/Time: October 20, 2025)

1. Main UI (List, Search, Create Form)
Shows the main layout with the task list, search bar, and create form visible.

<-- ACTION: Insert a screenshot of the main UI here. -->

2. Create Task
Shows the "Create Task" form filled out.

<-- ACTION: Insert a screenshot of the filled create form here. -->

3. Search Results
Shows the task list filtered after using the search bar.

<-- ACTION: Insert a screenshot of the search results here. -->

4. Execute Task Output
Shows the modal window displaying the output after clicking the execute button for a task.

<-- ACTION: Insert a screenshot of the execution output modal here. -->