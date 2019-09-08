import React, { useState, useEffect, useContext, useRef } from 'react';
import { firestore, storage } from '../../firebase/firebase.utils';
import AppContext from '../../contexts/AppContext';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from './post-new.styles';
import { PostNewTypes } from './post-new.types';
import { isEmptyInput } from '../../utils/func';

const PostNew = ({ toggle }: PostNewTypes) => {
  const classes = useStyles();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [value, setValue] = useState('');
  const [imgData, setImageData] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const user = useContext(AppContext);

  useEffect(() => {
    setIsSubmitDisabled(isEmptyInput(value));
  }, [value]);

  const submitImage = async () => {
    if (!user) return;
    const storageRef = storage.ref('images');
    const uploadImgName = `${user.displayName}/${String(Date.now())}.jpeg`;
    const imgRef = storageRef.child(uploadImgName);
    await imgRef.putString(imgData, 'data_url');
    return storageRef.child(uploadImgName).getDownloadURL();
  };

  const submitPost = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    setIsSubmitDisabled(true);
    event.preventDefault();
    const postRef = firestore.collection('posts');
    if (imgData) {
      submitImage()
        .then(url => {
          return postRef.doc().set({
            body: value,
            author: { ...user },
            imgUrl: url,
            createdAt: new Date()
          });
        })
        .then(() => {
          toggle();
          window.location.reload();
        });
    } else {
      await postRef.doc().set({
        body: value,
        author: { ...user },
        createdAt: new Date()
      });
      toggle();
      window.location.reload();
    }
  };

  const setImageToCanvas = (imgpath: string) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let maxW = 450;
      let maxH = 350;

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
    }
  };

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setValue(target.value);
  };

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      setImageToCanvas(URL.createObjectURL(target.files[0]));
    }
  };

  return (
    <form className={classes.form} onSubmit={submitPost}>
      <TextField
        placeholder="今の気分は？"
        multiline
        margin="normal"
        fullWidth
        value={value}
        onChange={handleChangeValue}
        name="body"
      />
      <input
        accept="image/*"
        type="file"
        name="image"
        onChange={handleChangeFile}
      />
      <canvas ref={canvasRef} width="0" height="0" />
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
