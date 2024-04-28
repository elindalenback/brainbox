# BrainBox

BrainBox is a collaborative note-taking and sharing web application designed to facilitate knowledge exchange and community interaction. Whether you're jotting down ideas, sharing insights, or engaging in discussions, BrainBox provides a user-friendly platform for users to connect, collaborate, and learn from one another.

The live link to the site can be found here - [BrainBox](https://brain-box-f-801a044f0f43.herokuapp.com/)

![site](docs/readme_images/brainbox-mockup.png)

## Site Owner Goals

- To establish a collaborative platform where users can create, share, and discuss notes on various topics.
- To facilitate knowledge-sharing and collaboration among users by providing a user-friendly and intuitive interface.
- To encourage user engagement through features such as liking, commenting, and following other users' notes.
- To maintain a seamless and enjoyable user experience with a focus on simplicity and functionality.

## User Stories

<details><summary>Create Notes</summary>

### Create Notes

**Description:** As a logged-in user, I can create new notes to capture and organize my thoughts, ideas, and information.

**Acceptance Criteria:**
>AC1: Upon accessing the note creation page, there should be input fields for title and content.

> AC2: After entering the title and content of the note, I should be able to successfully create the note.

> AC3: The newly created note should be visible in my notes collection and accessible for viewing and editing.
</details>

<details><summary>View Note Details</summary>

### View Note Details

**Description:** As a user, I can access the details of a single note to review its content and additional information.

**Acceptance Criteria:**
> AC1: When I click on a note, I should be redirected to a page displaying the full details of the note.

> AC2: The note details page should include the title, content, creation date, and any associated tags or categories.

> AC3: I should be able to navigate back to my notes collection from the note details page.
</details>

<details><summary>Edit Notes</summary>

### Edit Notes

**Description:** As the owner of a note, I can edit its contents to make updates or corrections.

**Acceptance Criteria:**
> AC1: On the note details page, there should be an option to edit the note's title and content.

> AC2: After making edits, I should be able to save the changes successfully.

> AC3: The updated note should reflect the changes immediately and accurately.
</details>

<details><summary>Delete Notes</summary>

### Delete Notes

**Description:** As the owner of a note, I can delete it to remove unnecessary or outdated information from my collection.

**Acceptance Criteria:**
> AC1: On the note details page, there should be an option to delete the note.

> AC2: After confirming the deletion, the note should be permanently removed from my notes collection.

> AC3: There should be a confirmation prompt to prevent accidental deletion of notes.
</details>

<details><summary>Like Notes</summary>

### Like Notes

**Description:** As a user, I can like notes to show appreciation and easily access important or frequently referenced information.

**Acceptance Criteria:**

>AC1: On the note details page, there should be an option to mark the note as liked.

>AC2: Liked notes should be visually distinguishable from other notes in the collection.

>AC3: There should be a dedicated page and/or filter for viewing all favorited notes for quick access.
</details>

<details><summary>View Comments on Notes</summary>

### View Comments on Notes

**Description:** As a user, I can read comments on notes to gain additional insights and perspectives.

**Acceptance Criteria:**

> AC1: On the note details page, all comments related to the note should be visible and accessible.

> AC2: Each comment should include the commenter's username, profile picture, and the time of the comment.

> AC3: Users should be able to scroll through comments if there are multiple comments on a note.
</details>

<details><summary>Add Comments to Notes</summary>

### Add Comments to Notes

**Description:** As a logged-in user, I can add comments to notes to contribute to discussions and provide feedback.

**Acceptance Criteria:**

> AC1: On the note details page, there should be a comment section where users can input their comments.

> AC2: After entering a comment, it should be displayed below the note along with the user's username and profile picture.

> AC3: Comments should be displayed in chronological order, with the newest comments appearing at the top.
</details>

<details><summary>Authentication - Sign Up</summary>

### Authentication - Sign Up

**Description:** As a user, I can create a new account to access all features available for registered users.

**Acceptance Criteria:**

> AC1: There should be a sign-up page with input fields for username and password.

> AC2: After submitting valid sign-up information, the user should receive a confirmation message and be redirected to the login page.

> AC3: Newly registered users should be able to log in immediately after signing up.
</details>

<details><summary>Authentication - Sign In</summary>

### Authentication - Sign In

**Description:** As a user, I can log in to the application to access functionalities reserved for logged-in users.

**Acceptance Criteria:**

> AC1: There should be a login page with input fields for username and password.

> AC2: After entering valid login credentials, the user should be authenticated and redirected to the home page.

> AC3: Logged-in users should have access to additional features and personalized content.
</details>

<details><summary>Authentication - Session Management</summary>

### Authentication - Session Management

**Description:** As a user, I can maintain my logged-in status even after refreshing the page until I choose to log out.

**Acceptance Criteria:**

> AC1: After logging in, the user's session should remain active across page refreshes and browser sessions.

> AC2: The user should not be required to log in again unless they explicitly log out or their session expires.

> AC3: Session management should handle scenarios such as idle timeouts and session expiration gracefully, notifying the user and prompting them to re-authenticate if necessary.
</details>

<details><summary>Authentication - Logged In Status</summary>

### Authentication - Logged In Status

**Description:** As a user, I can determine if I'm currently logged in to the application.

**Acceptance Criteria:**

> AC1: The application should display the user's logged-in status prominently, such as showing the user's username or profile picture.

> AC2: The logged-in status should persist across different pages and sessions until the user chooses to log out.

> AC3: There should be a clear indication when the user is not logged in, prompting them to sign in to access restricted content.
</details>

<details><summary>Manage Comments on Notes</summary>

### Manage Comments on Notes

**Description:** As the owner of a comment, I can delete or edit my comments for control over my contributions.

**Acceptance Criteria:**

> AC1: Each comment should have options for editing and deleting visible only to the comment owner.

> AC2: After selecting the edit option, the comment text should become editable, allowing the user to make changes.

> AC3: After selecting the delete option, a confirmation prompt should appear to prevent accidental deletion of comments.
</details>

<details><summary>Follow/Unfollow Users</summary>

### Follow/Unfollow Users

**Description:** As a logged-in user, I can choose to follow or unfollow other users to customize my feed.

**Acceptance Criteria:**

> AC1: There should be a follow button on each user's profile page.

> AC2: Clicking on the follow button should add the user to my list of followed users.

> AC3: The follow button should change to an unfollow button after I've followed the user.
</details>

<details><summary>View User Profiles</summary>

### View User Profiles

**Description:** As a user, I can visit other users' profiles to explore their notes and learn more about them.

**Acceptance Criteria:**

> AC1: There should be a clickable link or button on each note indicating the author's username/picture.

> AC2: Clicking on a user's username and/or profile picture should redirect me to their profile page.

> AC3: The profile page should display the user's bio, profile picture, and a list of their posted notes.
</details>

<details><summary>Tag Notes</summary>

### Tag Notes

**Description:** As a user, I can assign tags or categories to my notes to organize them based on topics or themes.

**Acceptance Criteria:**

> AC1: When creating or editing a note, there should be an option to add tags from a predefined list or enter them manually.

> AC2: Tags should be visible on the note details page and clickable to filter notes by the selected tag.

> AC3: Each note can have multiple tags assigned to it for comprehensive organization.
</details>

<details><summary>View All Notes by a User</summary>

### View All Notes by a User

**Description:** As a user, I can see all notes made by a specific user to catch up on their activity or explore their content further.

**Acceptance Criteria:**

> AC1: There should be a collection of all notes taken by a specific user displayed on that person's profile page.

> AC2: The notes should be in customized maps displayed in rows and columns of the user's profile page.

> AC3: There should be a button/tab with the user's liked notes on their profile page.
</details>

<details><summary>Search Notes</summary>

### Search Notes

**Description:** As a user, I can search for notes using keywords or filters to quickly find specific information within my collection.

**Acceptance Criteria:**

> AC1: On the notes collection page, there should be a search bar for entering keywords or filters.

> AC2: Upon entering a search query, the application should filter and display notes matching the search criteria in real-time.

> AC3: The search functionality should support partial matches and be case-insensitive for improved usability.
</details>

<details><summary>Update Username and Password</summary>

### Update Username and Password

**Description:** As a logged-in user, I can update my username and password for security and personalization purposes so that I can maintain control over my account and access.

**Acceptance Criteria:**

> AC1: There should be an option to update username and password accessible from the users account settings.

> AC2: Clicking on the update username option should allow the user to enter a new username and verify the changes.

> AC3: Similarly, clicking on the update password option should allow the user to enter a new password and verify the changes.
</details>

<details><summary>Edit Profile</summary>

### Edit Profile

**Description:** As a logged-in user, I can edit my profile information, including profile picture and bio.

**Acceptance Criteria:**

> AC1: There should be an edit profile option accessible from my profile page.

> AC2: Clicking on the edit profile option should open a form where I can update my profile picture, bio, and other information.

> AC3: After making changes, I should be able to save the updates successfully.
</details>

<details><summary>Accessing Navigation Bar</summary>

### Accessing Navigation Bar

**Description:** As a user, I can access a navigation bar from every page for easy navigation.

**Acceptance Criteria:**

> AC1: When I visit any page of the application, I should see a navigation bar displayed at the top of the screen.

> AC2: The navigation bar should include links/buttons to navigate to different sections of the application, such as Home, Notes, Profile, etc.

> AC3: Clicking on any link/button in the navigation bar should take me to the corresponding page without page refresh.
</details>

<details><summary>Report Inappropriate Notes</summary>

### Report Inappropriate Notes

**Description:** As a user, I can report notes that contain inappropriate content or violate community guidelines to maintain a safe and respectful environment within the platform.

**Acceptance Criteria:**

> AC1: There should be a visible option or button on each note to report it as inappropriate.

> AC2: After selecting the report option, a form or prompt should appear to provide details or reasons for the report.

> AC3: Users should receive confirmation of their report submission.

> AC4: Reported notes should be flagged for review by moderators or administrators to determine appropriate action.
</details>

<details><summary>Vote in Polls</summary>

### Vote in Polls

**Description:** As a user, I can participate in polls created by the admin to share my opinion on various topics or questions.

**Acceptance Criteria:**

> AC1: Polls should be visible and accessible to logged-in users on the platform.

> AC2: Each poll should include options for users to select their preferred choice or answer.

> AC3: After submitting my vote, the poll should update to reflect the overall voting results.

> AC4: Users should only be allowed to vote once in each poll to maintain voting integrity and accuracy.

> AC5: The poll results should be visible to all users after voting, providing transparency and engagement.
</details>

<details><summary>Routing</summary>

### Routing

**Description:** Users can move between pages seamlessly without page refresh for a smooth browsing experience, allowing efficient navigation throughout the application.

**Acceptance Criteria:**

> AC1: Transitioning between pages should not result in any noticeable delays or page refreshes.

> AC2: The URL in the browser should update dynamically based on the current page, allowing for bookmarking and sharing.

> AC3: Routing should support browser history navigation, enabling users to go back and forward between visited pages.
</details>

<details><summary>View User Statistics</summary>

### View User Statistics

**Description:** Users can see statistics about a specific user, such as bio, number of notes, followers, and following, to gauge their activity and popularity on the platform.

**Acceptance Criteria:**

> AC1: The user's profile page should display their bio, profile picture, number of posted notes, followers, and following count.

> AC2: The statistics should be updated in real-time to reflect any changes in the user's activity.
</details>

## Mapping User Stories to Project Goals

- **Create Notes:** Supports the goal of providing users with a platform to capture and organize their thoughts effectively.
- **View Note Details:** Contributes to the goal of enabling users to access detailed information about their notes for better understanding and organization.
- **Edit Notes:** Aligns with the goal of allowing users to maintain accurate and up-to-date notes by making necessary edits.
- **Delete Notes:** Supports the goal of helping users manage their notes by removing unnecessary or outdated information.
- **Like Notes:** Enhances user engagement and promotes important or frequently referenced notes, contributing to a vibrant community.
- **View Comments on Notes:** Facilitates discussions and enhances user interactions by providing insights and perspectives on specific notes.
- **Add Comments to Notes:** Promotes collaborative discussions and feedback among users, fostering a sense of community.
- **Authentication:** Sign Up, Sign In, Session Management, Logged In Status functionalities collectively contribute to providing users with secure access to the application and personalized experiences.
- **Manage Comments on Notes:** Empowers users to maintain control over their contributions and ensures the accuracy and relevance of comments.
- **Follow/Unfollow Users:** Enhances user experience by allowing customization of the feed and fostering connections within the community.
- **View User Profiles:** Enables users to explore and engage with other users' content, fostering a sense of community and collaboration.
- **Tag Notes:** Supports effective organization and retrieval of notes based on topics or themes, enhancing user productivity and usability.
- **View All Notes by a User:** Facilitates content discovery and exploration by providing visibility into a user's activity and contributions.
- **Search Notes:** Enhances usability and productivity by enabling users to quickly find specific information within their note collection.
- **Notebook Organization:** Provides users with advanced organization features to categorize and manage their notes effectively.
- **Update Username and Password:** Supports user account management, allowing users to personalize their accounts and maintain security.
- **Edit Profile:** Enables users to customize their profiles, enhancing their presence and personalization within the community.
- **Accessing Navigation Bar:** Contributes to a seamless and intuitive user experience by providing consistent navigation across the application.
- **Report Inappropriate Notes:** Supports the goal of maintaining a safe and respectful environment within the platform by allowing users to report notes containing inappropriate content.
- **Vote in Polls:** Enhances user engagement and interaction by enabling users to participate in polls created by the admin, contributing to a dynamic and interactive community.
- **Routing:** Ensures smooth navigation between pages without page refreshes, enhancing user experience and efficiency.
- **View User Statistics:** Enables users to gauge the activity and popularity of specific users on the platform, fostering transparency and engagement.

## Design (UX)

### Colour Palette

In BrainBox, we've carefully selected a color palette to enhance readability, promote creativity, and provide a visually appealing experience. Here's a breakdown of our color choices:

![Color Palette](docs/readme_images/color-palette.png)
This color scheme was created by [Coolors](https://coolors.co/).

- #2F2F2F: This subdued charcoal shade serves as a smoother contrast to the lighter elements, offering a refined alternative to stark black.

- #FAF9F6: Our page background color, a soft off-white hue, creates a welcoming contrast against the content, ensuring clarity and readability.

- #F48F66: Utilized for hover effects and page navigation highlights, this playful apricot color adds a touch of vibrancy and encourages exploration.

- #067BC2: A vivid azure blue, adds a splash of color for additional detailing, infusing energy and dynamism into the interface.

- #C4E7fD: This serene sky blue tone adorns the navigation bar and provides subtle detailing throughout the application, contributing to a cohesive and polished aesthetic.

### Typography

*Google Fonts was used to import the fonts.*

The font used for this webpage was **Lato** a sans-serif font for clear readability that aligns with the overall page style.

![Lato Font Example](docs/readme_images/lato-font.png)

## Wireframes

Wireframes were produced using Balsamiq. These wireframes were created prior to the project, serving as a conceptual representation of the forum's layout and features. Please note that they may not precisely reflect the final project, as some elements and features are subject to change or implementation. 

<details>

<summary>Wireframe</summary>

![BrainBox Wireframe](docs/wireframe/brainbox-wireframe.png)
</details>

