import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './Button.module.css';
import { useUpdateCommentMutation } from '../../redux/commentApi';

export const Button = ({ children, counter, role = 'thumbsUp', id }) => {
  const variants = {
    [styles.thumbsUp]: role === 'thumbsUp',
    [styles.thumbsDown]: role === 'thumbsDown',
  };
  const [updateComment, { isLoading }] = useUpdateCommentMutation();

  const [isClicked, setIsClicked] = useState(false);

  const onBtnHandleClick = async () => {
    const updatedData = { id, [role]: counter + (!isClicked ? 1 : -1) };
    await updateComment(updatedData);
    setIsClicked((prev) => !prev);
    console.log(updatedData);
  };

  return (
    <button
      className={classNames(styles.button, variants)}
      type="button"
      counter={counter}
      onClick={onBtnHandleClick}
      id={id}
      disabled={isLoading}
    >
      {children}

      <span className={styles.counter}>
        <span></span>
        {counter}
      </span>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  counter: PropTypes.number.isRequired,
  role: PropTypes.string,
  id: PropTypes.string.isRequired,
};
