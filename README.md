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

```
<img width="1464" height="802" alt="Screenshot 2025-10-20 at 9 25 40 PM" src="https://github.com/user-attachments/assets/249720f6-38d8-41d1-8bf5-cdaa230ed9ab" />

```
2. Create Task
Shows the "Create Task" form filled out.

```
<img width="253" height="153" alt="Screenshot 2025-10-20 at 9 27 07 PM" src="https://github.com/user-attachments/assets/9aaf5e5a-d914-4da3-b6e3-0efc5e460a65" />

```



3. Search Results
Shows the task list filtered after using the search bar.

```
<img width="295" height="261" alt="Screenshot 2025-10-20 at 9 27 40 PM" src="https://github.com/user-attachments/assets/40135cbd-fe76-42e0-9a60-9bff00144640" />

```

4. Execute Task Output
Shows the modal window displaying the output after clicking the execute button for a task.

```

<img width="1462" height="795" alt="Screenshot 2025-10-20 at 9 28 16 PM" src="https://github.com/user-attachments/assets/4d37d07c-5951-4d86-9bd0-b2872109d23f" />

```
