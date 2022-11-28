import axios from 'axios';
import React, {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Write = () => {

    const state = useLocation().state;
    const navigate = useNavigate();
    const [value, setValue] = useState(state?.desc || "");
    const [title, setTitle] = useState(state?.title || "");
    const [img, setImg] = useState(null);

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("img", img);
            const res = await axios.post('/upload', formData);
            return res.data;

        } catch (err) {
            console.log(err);
        }
    };


    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    };

    const imgChangeHandler = (event) => {
        setImg(event.target.files[0]);
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        const imgUrl = await upload();

        try {
            state
              ? await axios.put(`/posts/${state.id}`, {
                  title,
                  desc: value,
                  img: img ? imgUrl : "",
                })
              : await axios.post(`/posts/`, {
                  title,
                  desc: value,
                  img: img ? imgUrl : "",
                  date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                });
                navigate("/")
          } catch (err) {
            console.log(err);
          }

    };


    return (
        <div className="add">
            <div className="content">
                <input type="text" value={title} placeholder="title" onChange={titleChangeHandler} />
                <div className="editorContainer">
                    <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>
                    <input style={{display:"none"}}type="file" name="" id="file" onChange={imgChangeHandler} />
                    <label htmlFor="file">Upload Image</label> 
                    <div className="buttons">
                        <button>Save as a draft</button>
                        <button onClick={submitHandler}>Publish</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Write;