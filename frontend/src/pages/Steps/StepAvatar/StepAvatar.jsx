import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import styles from './StepAvatar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setAvatar } from '../../../store/activateSlice';
import { activate } from '../../../http';
import { setAuth } from '../../../store/authSlice';
import Loader from '../../../components/shared/Loader/Loader';
import { Error } from '../../../components/shared/Error/Error';

const StepAvatar = ({ onNext }) => {
    const dispatch = useDispatch();
    const { name, avatar } = useSelector((state) => state.activate);
    const [image, setImage] = useState('/images/image.png');
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    function captureImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setImage(reader.result);
            dispatch(setAvatar(reader.result));
        };
    }
    async function submit() {
        if(!name || !avatar) {
            setValidated(true);
            return;
        }
        setLoading(true);
        try {
            const { data } = await activate({ name, avatar });
            if (data.auth) {
                dispatch(setAuth(data));
            }
            console.log(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    if(loading) return <Loader message="Activation in progress..." />;
    return (
        <>
            <Card title={`Okay, ${name}`} icon="monkey">
                {/* <p className={styles.subHeading}>How’s this photo?</p> */}
                <div className={styles.avatarWrapper}>
                    <img
                        className={styles.avatarImage}
                        src={image}
                        alt="avatar"
                    />
                </div>
                <div>
                    <input
                        onChange={captureImage}
                        id="avatarInput"
                        type="file"
                        className={styles.avatarInput}
                    />
                    <label className={styles.avatarLabel} htmlFor="avatarInput">
                        Choose an image
                    </label>
                </div>
                <div>
                    <Button onClick={submit} text="Next" />
                </div>
                {
                    validated 
                    && 
                    <div>
                        <Error message='Upload an image !' />
                    </div>
                }
            </Card>
        </>
    );
};

export default StepAvatar;