import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiMailSend } from "react-icons/bi";
import styles from "./Form.module.css";
import { useAddNewCommentMutation } from "../../redux/commentApi";

export const Form = () => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [addNewComment, { isLoading }] = useAddNewCommentMutation();
  const onHandleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "name") setAuthor(value);
    if (name === "text") setContent(value);
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const canSave =
      [author, content].every((item) => {
        return Boolean(item);
      }) && !isLoading;

    if (canSave) {
      try {
        await addNewComment({ author, content }).unwrap();
        setAuthor("");
        setContent("");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      }
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={onHandleSubmit}>
        <label className={styles.label}>
          <span className={styles.labelName}>Full name</span>
          <input
            type="text"
            name="name"
            className={styles.input}
            value={author}
            onChange={onHandleChange}
          />
        </label>

        <label className={styles.label}>
          <span className={styles.labelName}>Your comment</span>
          <textarea
            className={styles.input}
            name="text"
            rows="5"
            value={content}
            onChange={onHandleChange}
          ></textarea>
        </label>

        <button className={styles.formBtn}>
          <BiMailSend className={styles.icon} />
          Send
        </button>
      </form>
    </div>
  );
};
