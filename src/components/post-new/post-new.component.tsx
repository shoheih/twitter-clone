import React, { useState, useEffect, useRef } from 'react';
import {
  Avatar,
  TextField,
  Box,
  Button,
  IconButton,
  LinearProgress
} from '@material-ui/core';
import { Backspace } from '@material-ui/icons';
import useStyles from './post-new.styles';
import { useUser } from '../../hooks/user';
import { useTweet, CreateTweetProps } from '../../hooks/tweet';
import { useNotification } from '../../hooks/notification';
import { PostNewType } from './post-new.types';
import { isEmptyInput } from '../../utils/func';

const PostNew = ({ hide }: PostNewType) => {
  const classes = useStyles();
  const user = useUser();
  const { createTweet } = useTweet();
  const { showNotification } = useNotification();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [value, setValue] = useState('');
  const [rowImgData, setRowImgData] = useState('');
  const [imgData, setImageData] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const clearSelectedFile = () => {
    const input = inputRef.current;
    if (input) {
      input.value = '';
      setRowImgData('');
    }
  };

  const resetForm = () => {
    setValue('');
    setRowImgData('');
    setImageData('');
    clearSelectedFile();
  };

  const submitPost = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    if (!user.userInfo) return;
    setIsSubmitDisabled(true);
    setIsSending(true);
    event.preventDefault();

    const postData: CreateTweetProps = {
      body: value,
      author: { ...user.userInfo },
      createdAt: new Date()
    };
    if (imgData) {
      const imgName = `${user.userInfo.id}/${String(Date.now())}.jpeg`;
      postData['image'] = { name: imgName, data: imgData };
    }

    createTweet(postData).then(() => {
      setIsSending(false);
      resetForm();
      if (hide) hide();
      showNotification('投稿しました!');
    });
  };

  const setImageToCanvas = (imgpath: string) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const maxW = 450;
      const maxH = 350;

      if (imgpath) {
        let img = new Image();
        img.onload = () => {
          let iw = img.width;
          let ih = img.height;
          let scale = Math.min(maxW / iw, maxH / ih);
          let iwScaled = iw * scale;
          let ihScaled = ih * scale;
          canvas.width = iwScaled;
          canvas.height = ihScaled;
          if (ctx) {
            ctx.drawImage(img, 0, 0, iwScaled, ihScaled);
          }
          const resizeData = canvas.toDataURL('image/jpeg', 0.5);
          setImageData(resizeData);
        };
        img.src = imgpath;
      } else {
        if (ctx) {
          ctx.clearRect(0, 0, maxW, maxH);
          canvas.width = 0;
          canvas.height = 0;
          setImageData('');
        }
      }
    }
  };

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setValue(target.value);
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      setRowImgData(URL.createObjectURL(target.files[0]));
    } else {
      setRowImgData('');
    }
  };

  useEffect(() => {
    setIsSubmitDisabled(isEmptyInput(value) && isEmptyInput(imgData));
  }, [value, imgData]);

  useEffect(() => {
    setImageToCanvas(rowImgData);
  }, [rowImgData]);

  return (
    <form className={classes.form} onSubmit={submitPost}>
      {isSending && <LinearProgress className={classes.progressBar} />}
      <Box className={classes.textBox}>
        <Avatar
          className={classes.avatar}
          src={user && user.userInfo && user.userInfo.photoURL}
        />
        <TextField
          placeholder="自由につぶやいてみましょう！"
          multiline
          fullWidth
          value={value}
          onChange={handleChangeValue}
          name="body"
          disabled={isSending}
        />
      </Box>
      <input
        ref={inputRef}
        accept="image/*"
        type="file"
        name="image"
        onChange={handleChangeFile}
      />
      {!isSending && (
        <Box className={classes.dispImg}>
          <canvas
            ref={canvasRef}
            className={classes.canvas}
            width="0"
            height="0"
          />
          {imgData && (
            <IconButton onClick={clearSelectedFile}>
              <Backspace />
            </IconButton>
          )}
        </Box>
      )}
      <Button
        className={classes.button}
        variant="contained"
        disabled={isSubmitDisabled}
        color="primary"
        type="submit"
      >
        つぶやく
      </Button>
    </form>
  );
};

export default PostNew;
