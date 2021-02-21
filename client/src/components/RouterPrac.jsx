import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RouterPrac.css";
import axios from "axios";

function Home() {
  return (
    <div className="text-center">
      <Link to="/createSurvey" className="link">
        <button className="btn btn-warning m-2 btn-lg surveybtn">
          Create Survey
        </button>
      </Link>
      <br />
      <Link to="/takeSurvey" className="link">
        <button className="btn btn-warning m-2 btn-lg surveybtn">
          Take Survey
        </button>
      </Link>
    </div>
  );
}
function PublishQ(props) {
  const list = props.list;
  const title = props.title;

  const lis = list.map((value, index) => (
    <div key={index}>
      {!value.multival && value.singleval && (
        <div>
          <br />
          <h5 className="publishQuestion text-dark ">Q: {value.question}</h5>
          <div className="pl-3">
            <label className="publishInput">
              <input
                type="radio"
                name={index}
                className="inputCheck"
                value={value.optionarray[0]}
              />
              <span className="pl-1  Ovalue">{value.optionarray[0]}</span>
            </label>
            <br />
            <label className="publishInput">
              <input
                type="radio"
                name={index}
                className="inputCheck"
                value={value.optionarray[1]}
              />
              <span className="pl-1  Ovalue">{value.optionarray[1]}</span>
            </label>
          </div>
        </div>
      )}
      {value.multival && !value.singleval && (
        <div>
          <br />
          <h5 className="publishQuestion text-dark ">Q: {value.question}</h5>
          <div className="pl-3">
            <label className="publishInput">
              <input type="checkbox" name="moption" className="inputCheck" />
              <span className="pl-1  Ovalue">{value.optionarray[0]}</span>
            </label>
            <br />
            <label className="publishInput">
              <input type="checkbox" name="moption" className="inputCheck" />
              <span className="pl-1  Ovalue">{value.optionarray[1]}</span>
            </label>
            <br />
            <label className="publishInput">
              <input type="checkbox" name="moption" className="inputCheck" />
              <span className="pl-1  Ovalue">{value.optionarray[2]}</span>
            </label>
            <br />
            <label className="publishInput">
              <input type="checkbox" name="moption" className="inputCheck" />
              <span className="pl-1  Ovalue">{value.optionarray[3]}</span>
            </label>
          </div>
        </div>
      )}
    </div>
  ));
  function ConfirmButton() {
    for (let index = 0; index < list.length; index++) {
      const registered = {
        multival: list[index].multival,
        optionarray: list[index].optionarray,
        question: list[index].question,
        singleval: list[index].singleval,
        title: list[index].title,
      };
      axios
        .post("/app/sendVal", registered)
        .then((response) => console.log(response.data));
    }
  }
  return (
    <div>
      <h3 className="createSurveyHeading bg-secondary p-2">PUBLISH</h3>
      <div className="row">
        <div className="col-12  text-left">
          <br />
          <div className="p-2 bg-dark text-light rounded w-50 text-left">
            {title}
          </div>
          {lis}
          <br />
          <Link to="/">
            <button
              className="btn btn-dark m-1 confirmBtn"
              onClick={ConfirmButton}
            >
              Confirm
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
function CreateSurvey() {
  let [multival, setMultival] = useState(false);
  let [singleval, setSingleval] = useState(false);
  let [selectval, setSelect] = useState(true);
  let [publish, setPublish] = useState(false);
  let [option] = useState("");
  let [optionarray, setOptionArray] = useState([(option = "")]);
  let [question, setQuestion] = useState("");
  let [mainlist, setMainlist] = useState(Array);
  let [title, settitle] = useState("");
  let [titlev] = useState(true);
  const [values, setValues] = useState([
    {
      multival: false,
      optionarray: ["array"],
      question: "question",
      singleval: false,
      title: "title",
    },
  ]);
  let datamap;
  let settitletakenvar = false;

  function Select(event) {
    const selectOption = event.target.value;
    setSelect((selectval = false));
    if (selectOption === "multiSelect") {
      setSingleval((singleval = false));
      setMultival((multival = true));
    } else {
      setMultival((multival = false));
      setSingleval((singleval = true));
    }
  }
  function GoBack() {
    setSelect((selectval = true));
    setOptionArray((optionarray = [""]));
    setQuestion("");
  }
  function handleQuestion(event) {
    const { value } = event.target;
    setQuestion(value);
  }
  function handleOptionInput(event, index) {
    const { value } = event.target;
    const list = [...optionarray];
    list[index] = value;
    setOptionArray(list);
  }
  function handleAdd() {
    setOptionArray([...optionarray, (option = "")]);
  }
  function handleRemove(index) {
    const list = [...optionarray];
    list.splice(index, 1);
    setOptionArray(list);
  }
  function titlechange(e) {
    axios
      .get("/app/values")
      .then((res) => setValues(res))
      .catch((error) => console.log(error));
    settitle(e);
  }
  if (values.data !== undefined) {
    datamap = values.data.map((value) => value.title);
    let uniquedatamap = Array.from(new Set(datamap));
    const hello = uniquedatamap.map((value, index) => value);
    for (let j = 0; j < hello.length; j++) {
      if (hello[j] === title) {
        settitletakenvar = true;
        break;
      } else {
        settitletakenvar = false;
      }
    }
  }

  const selectSection = selectval && (
    <div>
      {titlev && (
        <input
          className="bg-dark titleinput text-light p-2 mb-2"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(event) => titlechange(event.target.value)}
        />
      )}
      <span
        className={
          settitletakenvar
            ? "bg-light text-danger p-1  titletaken rounded"
            : "bg-light text-success p-1  rounded"
        }
      >
        {settitletakenvar ? (
          <i className="fa fa-times" aria-hidden="true">
            {" "}
            Title is taken
          </i>
        ) : (
          <i className="fa fa-check" aria-hidden="true"></i>
        )}
      </span>
      <br />
      {!settitletakenvar && title !== "" && (
        <select
          className="bg-dark text-warning p-2 "
          name="questionType"
          id="questionType"
          defaultValue="selected"
          onChange={(e) => Select(e)}
        >
          <option value="selected" disabled hidden>
            Select Question Type
          </option>
          <option value="singleSelect">Single Select</option>
          <option value="multiSelect">Multi-Select</option>
        </select>
      )}
    </div>
  );
  const multiselectOptions = optionarray.map((val, index) => {
    return (
      <div key={index}>
        <input
          type="text"
          name="optionField"
          className="optionsInput"
          placeholder="Enter Answer"
          value={val}
          autoComplete="off"
          onChange={(event) => handleOptionInput(event, index)}
        />
        <button
          className={
            optionarray.length < 4
              ? "addOptionButton addNotDisabled"
              : "addOptionButton"
          }
          onClick={handleAdd}
          disabled={!(optionarray.length < 4)}
        >
          +
        </button>
        <button
          className={
            optionarray.length !== 1
              ? "removeOptionButton removeNotDisabled"
              : "removeOptionButton"
          }
          onClick={() => handleRemove(index)}
          disabled={!(optionarray.length !== 1)}
        >
          -
        </button>
      </div>
    );
  });
  const createMultiselectQuestion = (
    <div>
      <div>
        <p className="typeSelected">Type selected: Multi-Select</p>
        <button onClick={GoBack} className="SelAnotherType btn btn-dark">
          Select another type?
        </button>
      </div>
      <br />
      <br />
      <div>
        <p>
          <input
            type="text"
            name="multiQuestion"
            className="questionInput"
            placeholder="Enter Question here"
            value={question}
            autoComplete="off"
            onChange={(event) => handleQuestion(event)}
          />
        </p>
        {multiselectOptions}
      </div>
      {optionarray[0] !== "" &&
        optionarray[1] !== "" &&
        optionarray[2] !== "" &&
        optionarray[3] !== "" &&
        question !== "" &&
        optionarray.length === 4 && (
          <div>
            <br />
            <button className="btn btn-dark m-1 addBtn" onClick={Add}>
              Add
            </button>
            <button className="btn btn-dark m-1 publishBtn" onClick={Publish}>
              Publish
            </button>
          </div>
        )}
    </div>
  );
  const singleselectOptions = optionarray.map((val, index) => {
    return (
      <div key={index}>
        <input
          type="text"
          name="singleOptionField"
          className="optionsInput"
          placeholder="Enter Answer"
          value={val}
          autoComplete="off"
          onChange={(event) => handleOptionInput(event, index)}
        />
        <button
          className={
            optionarray.length === 1
              ? "addOptionButton addNotDisabled"
              : "addOptionButton"
          }
          onClick={handleAdd}
          disabled={!(optionarray.length === 1)}
        >
          +
        </button>
        <button
          className={
            optionarray.length !== 1
              ? "removeOptionButton removeNotDisabled"
              : "removeOptionButton"
          }
          onClick={(event) => handleRemove(event, index)}
          disabled={!(optionarray.length !== 1)}
        >
          -
        </button>
      </div>
    );
  });
  const createSingleSelectQuestion = (
    <div>
      <div>
        <p className="typeSelected">Type selected: Single Select</p>
        <button onClick={GoBack} className="SelAnotherType btn btn-dark">
          Select another type?
        </button>
      </div>
      <br />
      <br />
      <div>
        <p>
          <input
            type="text"
            name="singleQuestion"
            className="questionInput"
            placeholder="Enter Question here"
            value={question}
            autoComplete="off"
            onChange={(event) => handleQuestion(event)}
          />
        </p>
        {singleselectOptions}
      </div>
      {optionarray[0] !== "" &&
        optionarray[1] !== "" &&
        question !== "" &&
        optionarray.length === 2 && (
          <div>
            <br />
            <button className="btn btn-dark m-1 addBtn" onClick={Add}>
              Add
            </button>
            <button className="btn btn-dark m-1 publishBtn" onClick={Publish}>
              Publish
            </button>
          </div>
        )}
    </div>
  );
  function Add() {
    setPublish(false);
    setQuestion("");
    if (multival === true && singleval === false) {
      const qlist = mainlist.concat([
        {
          optionarray,
          question,
          multival,
          singleval,
          title,
        },
      ]);
      setMainlist(qlist);
    } else if (multival === false && singleval === true) {
      const qlist = mainlist.concat([
        {
          optionarray,
          question,
          multival,
          singleval,
          title,
        },
      ]);
      setMainlist(qlist);
    }
    setSelect((selectval = true));
    setOptionArray((optionarray = []));
    setOptionArray((optionarray = [""]));
  }
  function Publish() {
    setPublish(true);
    setQuestion("");
    if (multival === true && singleval === false) {
      const qlist = mainlist.concat([
        {
          optionarray,
          question,
          multival,
          singleval,
          title,
        },
      ]);
      setMainlist(qlist);
    } else if (multival === false && singleval === true) {
      const qlist = mainlist.concat([
        {
          optionarray,
          question,
          multival,
          singleval,
          title,
        },
      ]);
      setMainlist(qlist);
    }
    setSelect((selectval = true));
    setOptionArray((optionarray = []));
    setOptionArray((optionarray = [""]));
  }
  return (
    <div>
      {!publish ? (
        <div>
          <h3 className="createSurveyHeading bg-secondary p-2">
            CREATE SURVEY
          </h3>
          <div className="row mb-2">
            <div className="col-12  text-left">
              <br />
              <br />
              {selectSection}
              {multival && !selectval && createMultiselectQuestion}
              {singleval && !selectval && createSingleSelectQuestion}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <PublishQ list={mainlist} title={title} />
        </div>
      )}
    </div>
  );
}
function TakeSurvey() {
  const [values, setValues] = useState([
    {
      multival: false,
      optionarray: ["array"],
      question: "question",
      singleval: false,
      title: "title",
    },
  ]);
  const [unhide, setUnhide] = useState(true);
  const [id, setid] = useState();
  let [form, setform] = useState([{ q: "", ans: "", options: [] }]);
  const [submitted, setSubmitted] = useState(false);
  // const myref = useRef(null);
  // const myref2 = useRef(null);
  useEffect(() => {
    axios
      .get("/app/values")
      .then((res) => setValues(res))
      .catch((error) => console.log(error));
  }, []);

  function unhideButtonClick(v) {
    setUnhide(false);
    setid(v);
    // myref.current.scrollIntoView()
  }
  function hideButtonClick(v) {
    setUnhide(true);
    setid(v);
    setform([{ q: "", ans: "", options: [] }]);
    setSubmitted(false);

    // myref.current.scrollIntoView()
  }

  let datamap = [];
  let nestedMap;

  if (values.data) {
    datamap = values.data.map((value) => value.title);
    const uniquedatamap = Array.from(new Set(datamap));
    function FormChange(e, question, multival, singleval) {
      if (!multival && singleval) {
        let count = 0;
        let newvalue;
        for (let k = 0; k < form.length; k++) {
          if (form[k].q === question) {
            count = 1;
          }
        }
        if (count !== 1) {
          const log = form.concat({
            q: question,
            ans: e.target.value,
            options: [],
          });
          setform(log);
        } else if (count === 1) {
          newvalue = form.map((val, index) =>
            val.q === question
              ? { q: question, ans: e.target.value, options: [] }
              : val
          );
          setform(newvalue);
        }
      } else if (multival && !singleval) {
        let outercount = 0,
          innercount = 0,
          innerindex;
        let newoption, removeoption;
        for (let i = 0; i < form.length; i++) {
          if (form[i].q === question) {
            outercount = 1;
            for (let j = 0; j < form[i].options.length; j++) {
              if (form[i].options[j] === e.target.value) {
                innercount = 1;
                console.log(e.target.value + " is unchecked");
                removeoption = j;
              }
            }
            if (innercount === 0) {
              console.log(e.target.value + " is checked");
              innerindex = i;
            } else if (innercount === 1) {
              innerindex = i;
            }
          }
        }
        if (outercount === 0) {
          console.log(e.target.value + " is checked");
          const newItem = form.concat({
            q: question,
            ans: "",
            options: [e.target.value],
          });
          setform(newItem);
        } else if (outercount === 1 && innercount === 0) {
          newoption = form.map((v, index) =>
            index === innerindex
              ? {
                  q: question,
                  ans: "",
                  options: [...form[index].options, e.target.value],
                }
              : v
          );
          setform(newoption);
        } else if (outercount === 1 && innercount === 1) {
          form[innerindex].options.splice(removeoption, 1);
          setform(form);
        }
      }
    }
    function AllOfIt(e, titlename, data) {
      e.preventDefault();
      let length = 0,
        formlength = 0;
      for (let i = 0; i < data.length; i++) {
        if (data[i].title === titlename) {
          length += 1;
        }
      }
      for (let j = 1; j < form.length; j++) {
        if (form[j].ans === "" && form[j].options.length === 0) {
          formlength = 1;
        }
      }
      if (length + 1 === form.length && formlength === 0) {
        form.splice(0, 1);
        setform(form);
        let username = prompt("Enter your name");
        if (username === "") {
          username = "Guest";
        }
        const submitForm = {
          title: titlename,
          username: username,
          response: form,
        };
        console.log(submitForm);
        axios
          .post("/app/submitVal", submitForm)
          .then((response) => console.log(response.data));
        setSubmitted(true);
      } else {
        alert("Attempt all questions");
      }
    }

    nestedMap = uniquedatamap.map((mainvalue, i) => {
      return (
        <div key={i}>
          <span>
            {unhide ? (
              <button
                onClick={() => unhideButtonClick(mainvalue)}
                className="btn btn-dark mt-1 mb-1  p-3 w-100 text-light btn-lg hideunhidebtn"
              >
                {mainvalue}
              </button>
            ) : (
              <button
                onClick={() => hideButtonClick(mainvalue)}
                className={
                  mainvalue === id
                    ? "btn btn-dark mt-1 mb-1  p-3 w-100 text-warning btn-lg hideunhidebtn"
                    : "btn btn-dark mt-1 mb-1  p-3 w-100 text-light btn-lg hideunhidebtn"
                }
              >
                {mainvalue}
              </button>
            )}
          </span>
          {!unhide && id === mainvalue && (
            <div className="mb-2">
              {values.data.map((val, j) => {
                return (
                  <div key={j}>
                    {val.title === mainvalue && (
                      <div>
                        {!val.multival && val.singleval && (
                          <div>
                            <br />
                            <form
                              onChange={(e) =>
                                FormChange(
                                  e,
                                  val.question,
                                  val.multival,
                                  val.singleval
                                )
                              }
                            >
                              <h5
                                className={
                                  submitted
                                    ? "publishQuestion text-secondary "
                                    : "publishQuestion text-dark "
                                }
                              >
                                Q: {val.question}
                              </h5>
                              <div className="pl-3">
                                <label className="publishInput">
                                  <input
                                    type="radio"
                                    name={j}
                                    className="inputCheck"
                                    value={val.optionarray[0]}
                                    disabled={submitted}
                                  />
                                  <span className="pl-1  Ovalue">
                                    {val.optionarray[0]}
                                  </span>
                                </label>
                                <br />
                                <label className="publishInput">
                                  <input
                                    type="radio"
                                    name={j}
                                    className="inputCheck"
                                    value={val.optionarray[1]}
                                    disabled={submitted}
                                  />
                                  <span className="pl-1  Ovalue">
                                    {val.optionarray[1]}
                                  </span>
                                </label>
                              </div>
                            </form>
                          </div>
                        )}
                        {val.multival && !val.singleval && (
                          <div>
                            <br />
                            <form
                              onChange={(e) =>
                                FormChange(
                                  e,
                                  val.question,
                                  val.multival,
                                  val.singleval
                                )
                              }
                            >
                              <h5
                                className={
                                  submitted
                                    ? "publishQuestion text-secondary "
                                    : "publishQuestion text-dark "
                                }
                              >
                                Q: {val.question}
                              </h5>
                              <div className="pl-3">
                                <label className="publishInput">
                                  <input
                                    type="checkbox"
                                    name="moption"
                                    className="inputCheck"
                                    value={val.optionarray[0]}
                                    disabled={submitted}
                                  />
                                  <span className="pl-1  Ovalue">
                                    {val.optionarray[0]}
                                  </span>
                                </label>
                                <br />
                                <label className="publishInput">
                                  <input
                                    type="checkbox"
                                    name="moption"
                                    className="inputCheck"
                                    value={val.optionarray[1]}
                                    disabled={submitted}
                                  />
                                  <span className="pl-1  Ovalue">
                                    {val.optionarray[1]}
                                  </span>
                                </label>
                                <br />
                                <label className="publishInput">
                                  <input
                                    type="checkbox"
                                    name="moption"
                                    className="inputCheck"
                                    value={val.optionarray[2]}
                                    disabled={submitted}
                                  />
                                  <span className="pl-1  Ovalue">
                                    {val.optionarray[2]}
                                  </span>
                                </label>
                                <br />
                                <label className="publishInput">
                                  <input
                                    type="checkbox"
                                    name="moption"
                                    className="inputCheck"
                                    value={val.optionarray[3]}
                                    disabled={submitted}
                                  />
                                  <span className="pl-1  Ovalue">
                                    {val.optionarray[3]}
                                  </span>
                                </label>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              <button
                onClick={(e) => AllOfIt(e, mainvalue, values.data)}
                className="btn btn-danger mt-2  mb-2 submitbtn"
                disabled={submitted}
              >
                {submitted ? "Submitted" : "Submit"}
              </button>
            </div>
          )}
        </div>
      );
    });
  }
  return (
    <div>
      <h3 className="createSurveyHeading bg-secondary p-2 text-center">
        TAKE SURVEY
      </h3>
      <div className="row mb-4">
        {values.data ? (
          values.data.length > 0 ? (
            <div className="col-12 text-left">{nestedMap}</div>
          ) : (
            <div className="col-12 text-center mt-4">
              <span className="p-3 bg-dark text-light  rounded">
                No Surveys created
              </span>
            </div>
          )
        ) : (
          <span className="p-3">Loading... Try refreshing the page</span>
        )}
      </div>
    </div>
  );
}
function RouterPrac() {
  return (
    <Router>
      <div className="container">
        <div className="row text-center mr-3 ml-3 mt-2 p-0 ">
          <div className="col-12 p-4 bg-dark">
            <Link className="link" to="/">
              <button className="btn btn-outline-light mr-1 homebtn">
                Home
              </button>
            </Link>
          </div>
          <div className="col-12 p-0 text-left">
            <Switch>
              <Route exact path="/createSurvey" component={CreateSurvey} />
              <Route exact path="/takeSurvey" component={TakeSurvey} />
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}
export default RouterPrac;