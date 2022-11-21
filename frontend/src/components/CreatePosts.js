import React, { Component } from "react";
import axios from "axios";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import sanitizeHtml from "sanitize-html";

const baseURL = process.env.REACT_APP_BASEURL || "http://localhost:5000";

class CreatePosts extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      body: "",
      author: "",
      date: new Date(),
      isLoggedIn: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  // Set author name from logged in user's profile
  componentDidMount() {
    this.setState({
      author: sessionStorage.getItem("username"),
      isLoggedIn: true,
    });
  }

  handleEditorChange(event, editor) {
    const data = editor.getData();
    this.setState({ body: data });
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ date: new Date() });

    // sanitize data before setting state
    const sanitizedData = sanitizeHtml(this.state.body.trim());

    // If the post body is too less, do not submit
    if (sanitizedData.length < 400) {
      alert("Cannot submit such a short post!");
    } else {
      // Display a spinner until the post is submitted
      document.querySelector(".spinner-container").style.display = "flex";

      this.setState({ body: sanitizedData });

      const Blog = {
        title: this.state.title,
        author: this.state.author,
        body: this.state.body,
        date: this.state.date,
      };

      axios
        .post(`${baseURL}/server/posts/create/`, Blog)
        .then((res) => (window.location = "/posts"))
        .catch((err) => console.log(err));
    }
  }

  render() {
    return (
      <div>
        {/* A spinner to indicate loading until new post is submitted */}
        <div className="spinner-container" style={{ display: "none" }}>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>

        <div className="new-post">
          <h1>
            Create New Blog Post
            <span className="full-stop">.</span>
          </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="new-title">Title: </label>
              <input
                className="form-control new-title"
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                required
                placeholder="The Best Title"
              />
            </div>
            <div>
              <CKEditor
                editor={ClassicEditor}
                onChange={this.handleEditorChange}
                config={{
                  placeholder: "Start typing your blog post here...",
                  toolbar: [
                    "Heading",
                    "|",
                    "Bold",
                    "Italic",
                    "Link",
                    "NumberedList",
                    "BulletedList",
                    "|",
                    "BlockQuote",
                    "MediaEmbed",
                    "Undo",
                    "Redo",
                  ],
                }}
              />
            </div>
            <br />
            <div className="form-group">
              <input
                type="submit"
                value="Create Post"
                className="btn btn-outline-primary btn-lg"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreatePosts;
