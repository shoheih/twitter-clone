import React, { useState, useEffect, useContext, useRef } from 'react';
import { firestore, storage } from '../../firebase/firebase.utils';
import { useUser } from '../../hooks/user';
import TweetContext from '../../contexts/TweetContext';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import useStyles from './post-new.styles';
import { isEmptyInput } from '../../utils/func';

const PostNew = () => {
  const classes = useStyles();
  const user = useUser();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [value, setValue] = useState('');
  const [imgData, setImageData] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { fetchSingleTweet } = useContext(TweetContext);

  useEffect(() => {
    setIsSubmitDisabled(isEmptyInput(value));
  }, [value]);

  const submitImage = async () => {
    if (!user.userInfo) return;
    const storageRef = storage.ref('users');
    const uploadImgName = `${user.userInfo.id}/${String(Date.now())}.jpeg`;
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
            author: { ...user.userInfo },
            imgUrl: url,
            createdAt: new Date()
          });
        })
        .then(() => {});
    } else {
      const batch = firestore.batch();
      const id = postRef.doc().id;
      batch.set(postRef.doc(id), {
        body: value,
        author: { ...user.userInfo },
        createdAt: new Date()
      });
      batch.commit().then(() => {
        fetchSingleTweet(id);
      });
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
