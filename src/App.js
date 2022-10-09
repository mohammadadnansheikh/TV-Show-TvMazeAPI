import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import NotFound from "./images/NotFind.png";

function App() {
  const [by, setBy] = useState("Choose Category");
  const [id, setId] = useState(null);
  const [text, setText] = useState("");
  const [tvMaze, setTvMaze] = useState([]);
  const [loading, setLoading] = useState(false);
  const [star, setStar] = useState("0.0");
  const [dataNotFound, setDataNotFound] = useState("Data Not Found")
  const [personSummary, setPersonSummary] = useState(
    "This is the show played by  ....."
  );

  const changeHandler = (e) => {
    if (id === null) {
      alert("Choose Category to Search");
    } else {
      setLoading(true);
      setText(e.target.value);
    }
  };

  useEffect(() => {
    if (id === "actor") {
      //people
      axios
        .get(`https://api.tvmaze.com/search/people?q=${text}`)
        .then((response) => {
          console.log(response);
          setTvMaze(response.data);
          setLoading(false);
        });
    } else {
      // show
      axios
        .get(`https://api.tvmaze.com/search/shows?q=${text}`)
        .then((response) => {
          console.log(response);
          
          setTvMaze(response.data);
          setLoading(false);
        });
    }

    
    
   
      document.title = 'TvMaze';
   
    document.body.style.background = "#686a6d";
  }, [text, loading]);

  return (
    <div className="backgroundDiv">
      <nav class="navbar navbar-expand-lg p-3 mb-2 bg-info text-white">
        <div class="container-fluid">
          <h1 class="navbar-brand" href="#">
            TVmaze
          </h1>
          <h4 class="navbar-brand">Search your favourite shows Here</h4>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="d-flex navbar-brand" role="search">
              <input
                placeholder={by}
                class="form-control me-3"
                type="search"
                id={id}
                aria-label="Search"
                value={text}
                onChange={changeHandler}
              />

              <label class="navbar-brand" htmlFor="show">
                Actor
              </label>
              <input
                class="navbar-brand"
                type="radio"
                name="dis"
                id="actor"
                onClick={() => {
                  setBy("Enter Actor Name");
                  setId("actor");
                  setText("");
                  setTvMaze([]);
                }}
              />

              <label class="navbar-brand" htmlFor="show">
                Show
              </label>
              <input
                class="navbar-brand"
                type="radio"
                name="dis"
                id="show"
                onClick={() => {
                  setBy("Enter Show Name");
                  setId("show");
                  setText("");
                  setTvMaze([]);
                }}
              />
            </form>
          </div>
        </div>
      </nav>

      <h2 className="loading">
        {loading === true ? "Loading............." : ""}
      </h2>

      <div className="container my-2 myContainer">
        <div className="row">
          {text !== ""
            ? tvMaze.length !== 0 ? tvMaze.map((value, index) => {
                // let obj = JSON.parse(JSON.stringify(value));
                return (
                  <div key={index} className="col-4">
                    <div className="card cardFit" style={{ width: "18rem" }}>
                      <img
                        src={
                          id === "show"
                            ? value.show.image === null
                              ? NotFound
                              : value.show.image.original
                            : value.person.image === null
                            ? NotFound
                            : value.person.image.original
                        }
                        className="card-img-top imgFit"
                        alt="loading please wait"
                      />
                      <div className="card-body myBody">
                        <h3 className="card-title name overflowN">
                          {id === "show"
                            ? value.show.name && value.show.name
                            : value.person.name && value.person.name}
                        </h3>
                        <p className="card-text overflow">
                          {id === "show"
                            ? value.show.summary === null
                              ? personSummary
                              : value.show.summary.replace(/(<([^>]+)>)/gi, "")
                            : personSummary}
                        </p>
                        <span className="myStar">&#9733;</span>
                        <span className="card-text myStar">
                          {id === "show"
                            ? value.show.rating.average === null
                              ? star
                              : value.show.rating.average
                            : star}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }) : loading === false ? (<h1 className="dataNotFound">{dataNotFound}</h1>):""
            : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
