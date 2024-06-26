import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import NoteCreateForm from "./pages/notes/NoteCreateForm";
import NotePage from "./pages/notes/NotePage";
import NotesPage from "./pages/notes/NotesPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import NoteEditForm from "./pages/notes/NoteEditForm.js";
import ProfilePage from "./pages/profiles/ProfilePage.js";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from "./components/NotFound";
import Polls from "./pages/polls/Polls";
import PollsCreateForm from "./pages/polls/PollsCreateForm";


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <NotesPage message="No results found. Adjust the search keyword." />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <NotesPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <NotesPage
                message="No results found. Adjust the search keyword or like a note."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/notes/create" render={() => <NoteCreateForm />} />
          <Route exact path="/notes/:id" render={() => <NotePage />} />
          <Route exact path="/notes/:id/edit" render={() => <NoteEditForm />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/polls" render={() => <Polls />} />
          <Route exact path="/polls/create" render={() => <PollsCreateForm />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </Container>
    </div>

  );
}

export default App;