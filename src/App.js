import React from "react"
import "./style.css";
import { useState } from "react";

export default function App() {
  //dummy data
  const data = [
    {
      id: Math.random() * 1000,
      folder: "public",
      isOpen: false,
      isAddFile: false,
      files: [
        {
          id: Math.random() * 1000,
          name: "index.js"
        }
      ]
    },
    {
      id: Math.random() * 1000,
      folder: "src",
      isOpen: false,
      isAddFile: false,
      files: [
        {
          id: Math.random() * 1000,
          name: "App.js"
        },
        {
          id: Math.random() * 1000,
          name: "index.js"
        },
        {
          id: Math.random() * 1000,
          name: "style.css"
        }
      ]
    },
    {
      id: Math.random() * 1000,
      folder: "myPresnol",
      isOpen: false,
      isAddFile: false,
      files: [
        {
          id: Math.random() * 1000,
          name: "myFiles.js"
        }
      ]
    }
  ];

  //making dummy data controll by react as well as inout box
  const [list, setList] = useState(data);
  const [value, setValue] = useState("");

  //for opening the folder
  const handleFolderOpen = (event, element) => {
    //stop event bubbling
    event.stopPropagation();
    // console.log(element);
    element.isOpen = !element.isOpen;
    element.isAddFile = false;
    setList([...list]);
  };

  //for open folder and a input box
  const handleAddFile = (event, element) => {
    //stop event bubling
    event.stopPropagation();
    element.isOpen = true;
    element.isAddFile = !element.isAddFile; //toggle b/w true-false
    setList([...list]);
  };

  //making contorl component input box
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  //for adding file to the selected folder
  const handleFileGetAdded = (event, element) => {
    // console.log(element);
    //on typing name of file then enter key to get file added
    if (event.key === "Enter") {
      //not addding file without extension
      if (value.includes(".")) {
        const newFile = {
          id: Math.random() * 1000,
          name: value
        };
        element.files = [...element.files, newFile];
        element.isAddFile = false;
        setList([...list]);
        setValue("");
      } else {
        alert("Please give extension of file by '.'  e,g :- myFile.pdf");
      }
    }
  };

  //for deleteing file
  const handleDeleteFile = (element, file) => {
    // console.log(file);
    const newFilesList = element.files.filter((x) => x.id !== file.id);
    // console.log(newFilesList);
    element.files = newFilesList;
    // console.log(element);
    element.files.length < 1
      ? (element.isOpen = false)
      : (element.isOpen = true);
    setList([...list]);
  };

  return (
    <div className="container">
      <h3>File Explorer That only Add File, Delete File to existing Folder</h3>
      {list.map((element) => {
        return (
          <div className="sub_container" key={element.id}>
            <span
              className="folder"
              onClick={(event) => handleFolderOpen(event, element)}
            >
              <span>{"📁"}</span>
              <span>{element.folder}</span>
              <span
                onClick={(event) => handleAddFile(event, element)}
                className="add"
                title="ADD FILE"
              >
                +
              </span>
            </span>
            {element.isOpen ? (
              <div className="files">
                <div>
                  {element.files.map((file, ind) => {
                    return (
                      <div className="sub_file" key={ind}>
                        <span>{"💠"}</span>
                        <span>{file.name}</span>
                        <span
                          className="cross"
                          onClick={() => {
                            handleDeleteFile(element, file);
                          }}
                        >
                          {"✕"}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {element.isAddFile ? (
                  <div className="add_input">
                    <span>{"💠"}</span>
                    <input
                      value={value}
                      onChange={handleInput}
                      onKeyUp={(event) => handleFileGetAdded(event, element)}
                    />{" "}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}