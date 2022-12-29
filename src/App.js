import React, { useState } from "react";
import "./App.css";

function CustomButton(props) {
  const { color, onClick, children } = props;
  if (color) {
    return (
      <button
        style={{ backgroundColor: color, color: "white" }}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  return <button onClick={onClick}>{children}</button>;
}

function User(props) {
  return (
    <div className="square-style">
      {props.user.name} {props.user.text}
      <CustomButton
        onClick={() => {
          props.handleDelete(props.user.id);
        }}
      >
        삭제하기
      </CustomButton>
      <CustomButton
        onClick={() => {
          props.onChange(props.user.id);
        }}
      >
        {props.user.isDone ? "취소" : "완료"}
      </CustomButton>
    </div>
  );
}

const App = () => {
  const [users, setUsers] = useState([
    { id: 0, name: "공부하기", text: "리엑트1", isDone: false },
    { id: 1, name: "공asfasdf", text: "리엑트", isDone: true },
  ]);

  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const addUserHandler = () => {
    const newUser = {
      id: users.length + 1,
      text: text,
      name: name,
      done: false,
    };
    setUsers([...users, newUser]);
  };

  const deleteUserHandler = (id) => {
    const newUserList = users.filter((user) => user.id !== id);
    setUsers(newUserList);
  };

  const onChange = (id) => {
    const newUserList = users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          isDone: !user.isDone,
        };
      } else {
        return { ...user };
      }
    });
    setUsers(newUserList);
  };

  return (
    <div className="back-title">
      <div className="title">
        <div>Two to List</div>
        <div>Reacccccccccccct</div>
      </div>

      <div className="app-style">
        <h3>제목</h3>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <h3>내용</h3>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <CustomButton
          className="add-button"
          color="teal"
          onClick={addUserHandler}
        >
          추가하기
        </CustomButton>
        <br></br>
      </div>

      <div>
        <h3>Working</h3>
        <div className="file">
          {" "}
          {users.map((user) => {
            if (!user.isDone) {
              return (
                <User
                  handleDelete={deleteUserHandler}
                  user={user}
                  key={user.id}
                  onChange={onChange}
                ></User>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>

      <div>
        <h3>Done</h3>
        <div className="file">
          {" "}
          {users.map((user) => {
            if (user.isDone) {
              return (
                <User
                  handleDelete={deleteUserHandler}
                  user={user}
                  key={user.id}
                  onChange={onChange}
                ></User>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
