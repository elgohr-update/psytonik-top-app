import React, {useState} from 'react';import {ReviewFormProps} from "./ReviewForm.props";import {Button, Input, Textarea} from "../index";import Rating from "../Rating/Rating";import styles from './ReviewForm.module.css';import cn from "classnames";import CloseIcon from './closeIcon.svg';import {useForm,Controller} from "react-hook-form";import {ReviewFormInterface, ReviewFormSentResponseInterface} from "./ReviewForm.interface";import axios from "axios";import {API} from "../../helpers/api";const ReviewForm = ({productId, isOpened, className,...props}:ReviewFormProps):JSX.Element => {    const {register,control,handleSubmit,formState:{errors},reset,clearErrors} = useForm<ReviewFormInterface>();    const [sentForm,setSentForm] = useState<boolean>(false);    const [isError,setIsError] = useState<string>('');    const onSubmit = async (formData: ReviewFormInterface) => {        try{            const {data} = await axios.post<ReviewFormSentResponseInterface>(API.review.createDemo,{...formData,productId});            if(data.message){                setSentForm(true);                reset();            } else {                setIsError('something wrong');                reset();            }        }catch{            setIsError('something went wrong');            reset();        }    };    return (        <form onSubmit={handleSubmit(onSubmit)}>            <div className={cn(styles.form, className)} {...props}>                <Input                    error={errors.name}                    {...register('name',{ required: {value:true,message:'minimum 2 characters'}, minLength: 2 })}                    placeholder="Name"                    className={styles.name}                    tabIndex={isOpened ? 0:-1}                    aria-invalid={!!errors.name}                />                <Input                    error={errors.title}                    {...register('title',{ required: {value:true,message:'minimum 10 characters'} , minLength: 10})}                    placeholder="Title"                    className={styles.title}                    tabIndex={isOpened ? 0:-1}                    aria-invalid={!!errors.title}                />                <div className={styles.rate}>                    <span>Rate: </span>                    <Controller                        rules={{required: {value:true, message:'Must give rating'}}}                        render={({field})=>(                        <Rating                             isEditable                             rating={field.value}                             ref={field.ref}                             setRating={field.onChange}                            error={errors.rating}                            tabIndex={isOpened ? 0:-1}                        />)                    } name={'rating'} control={control}/>                </div>                <Textarea                    error={errors.description}                    {...register('description',{ required: {value:true, message: 'write review'}, maxLength: 800,minLength: 75 })}                    className={styles.description}                    tabIndex={isOpened ? 0:-1}                    placeholder="write review"                    aria-label={'write review'}                    aria-invalid={!!errors.description}                />                <div className={styles.submit}>                    <Button                        appearance="primary"                        tabIndex={isOpened ? 0:-1}                        onClick={()=>clearErrors()}                    >Send</Button>                    <span className={styles.staticText}>*before publication review be moderated</span>                </div>            </div>            {sentForm && (<div className={cn(styles.success, styles.panel)} role={'alert'}>                <div className={styles.successTitle}>You review sent</div>                <div className={styles.successDescription}>Thanks, Your review be published after moderation</div>                <button                    onClick={()=>{setSentForm(false); reset();}}                    className={styles.close}                    aria-label="close"                >                    <CloseIcon  />                </button>            </div>)}            {!sentForm && isError && (<div className={cn(styles.error,styles.panel)} role={'alert'}>                {isError}                <button                    className={styles.close}                    onClick={()=>{setIsError(''); reset();}}                    aria-label="close"                >                    <CloseIcon />                </button>            </div>)}        </form>    );};export default ReviewForm;