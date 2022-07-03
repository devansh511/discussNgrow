import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import { TextInput } from '../../../components/shared/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../store/activateSlice';
import styles from './StepName.module.css';
import { Error } from '../../../components/shared/Error/Error';

const StepName = ({ onNext }) => {
    const { name } = useSelector((state) => state.activate);
    const dispatch = useDispatch();
    const [fullname, setFullname] = useState(name);
    const [validated, setValidated] = useState(false);

    function nextStep() {
        if (!fullname) {
            setValidated(true);
            return;
        }
        dispatch(setName(fullname));
        onNext();
    }
    return (
        <>
            <Card title="What’s your full name?" icon="goggle">
                <TextInput
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                <p className={styles.paragraph}>
                    People use real names at codershouse :) !
                </p>
                <div>
                    <Button onClick={nextStep} text="Next" />
                </div>
                {
                    validated && 
                    <div>
                        <Error message='Name cannot be empty !' />
                    </div>
                }
            </Card>
        </>
    );
};

export default StepName;
