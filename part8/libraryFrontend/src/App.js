import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import DisplayError from "./components/DisplayError";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errMsg, setErrMsg] = useState(null);

  const notify = (msg) => {
    setErrMsg(msg);
    setTimeout(() => setErrMsg(null), 5000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <DisplayError errMsg = {errMsg} />

      <Authors show={page === "authors"} notify = {notify} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} notify = {notify} />
    </div>
  )
};

export default App;
