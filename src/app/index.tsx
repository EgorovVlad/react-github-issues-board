import {
  GithubDropBoard,
  GithubDropBoardSearch,
  GithubDropBoardBreadcrumb,
  GithubDropBoardProvider,
} from "module/github/ui/GithubDropBoard";
import { ToastContainer } from "react-toastify";

export type AppProps = {};

export const App: React.VFC<AppProps> = () => {
  return (
    <div className="container-xxl p-4">
      <GithubDropBoardProvider>
        <GithubDropBoardSearch className="mb-4" />
        <GithubDropBoardBreadcrumb className="pb-1" />
        <GithubDropBoard />
      </GithubDropBoardProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
