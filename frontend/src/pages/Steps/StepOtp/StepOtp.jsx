import React, {useState} from 'react';
import styles from './StepOtp.module.css';
import Card from '../../../components/shared/Card/Card';
import { TextInput } from '../../../components/shared/TextInput/TextInput';
import Button from '../../../components/shared/Button/Button';
import { verifyOtp } from '../../../http';
import { useSelector } from 'react-redux';
import { setAuth } from '../../../store/authSlice';
import { useDispatch } from 'react-redux';
import { Error } from '../../../components/shared/Error/Error';

const StepOtp = () => {
  const [otp, setOtp] = useState('');
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const { phone, hash } = useSelector((state) => state.auth.otp);
  async function submit(){
    if(!otp || !phone || !hash) {
        setValidated(true);
        return;
    }
    try{
        const { data } = await verifyOtp({ otp, phone, hash });
        console.log(data);
        dispatch(setAuth(data));
    } catch(err) {
        console.log(err);
    }
  }
  return (
    <>
        <div className={styles.cardWrapper}>
            <Card title="Enter the code we just sent you" icon="lock">
                <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
                <div> 
                    <div className={styles.actionButtonWrap}>
                        <Button onClick={submit} text="Next" />
                    </div>
                    <p className={styles.bottomParagraph}>
                        By entering your number, you're agreeing to our Terms 
                        of Service and Privacy Policy. Thanks!
                    </p>
                    
                </div>
                {
                        validated
                        &&
                        <div>
                            <Error message="OTP not entered !" />
                        </div>
                    }
            </Card>
        </div>
    </>
  )
};

export default StepOtp;