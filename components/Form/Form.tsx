'use client';

import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import classnames from 'classnames';

import { FormProps, FormInputs, IFormBuildingData } from './Form.props';

import { sendDataToTelegram } from '@/utils/sendDataToTelegram';
import { sendDataToGoogleSheets } from '@/utils/sendDataToGoogleSheets';
import formBuildingData from '@/data/formBuildingData.json';
import { showToast } from '@/utils/showToast';
import { getdate } from '@/utils/getDateToForm';

import {
  FormInput,
  FormTextarea,
  FormCheckbox,
  SubmitButton,
  FormMaskInput,
} from '@/components';

import { FORM_DATA_KEY } from '@/constants';
import { IDataToSend } from '@/types';

const Form: FC<FormProps> = ({
  staticData,
  actionCloseHandler,
  setIsOpen,
  className = '',
}) => {
  const { input, textarea, checkbox, button, toastMessage } = staticData;
  const { sendText, sentText, loadingText, errorText } = button;
  const {
    options: { name, phone, message, agree },
  } = formBuildingData as IFormBuildingData;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonCurrentText, setButtonCurrentText] = useState<string>(sendText);

  const {
    register,
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  useFormPersist(FORM_DATA_KEY, { watch, setValue });

  const buttonClass = classnames(
    { 'text-notify-disabled': isLoading },
    {
      'text-notify-success': buttonCurrentText === sentText,
    },
    {
      'text-notify-error': buttonCurrentText === errorText,
    },
    'mx-auto md:mx-0 md:ml-auto xl:ml-0 xl:mr-auto',
  );

  const onSubmit: SubmitHandler<FormInputs> = async (formData: FormInputs) => {
    const sendData = async (formData: FormInputs) => {
      let dataToSend = {};
      for (let key in formData) {
        if (key !== 'userAgree') dataToSend[key] = formData[key];
      }

      const formattedDate = getdate();
      const additionalKey = 'date';
      const additionalValue = formattedDate;

      dataToSend[additionalKey] = additionalValue;

      try {
        await sendDataToTelegram(dataToSend as IDataToSend);
        await sendDataToGoogleSheets(dataToSend as IDataToSend);
        window.fbq('track', 'Lead');
        return true;
      } catch (error) {
        return false;
      }
    };

    try {
      setIsLoading(true);
      const isSuccess: boolean = await sendData(formData);
      const buttonCurrentText = isSuccess ? sentText : errorText;
      setButtonCurrentText(buttonCurrentText);

      setTimeout(() => {
        setButtonCurrentText(sendText);
      }, 3000);

      if (isSuccess) {
        reset();
      }

      if (typeof document !== 'undefined') {
        const submitButton = document?.getElementById('submitButton');
        submitButton && submitButton.blur();
      }

      showToast(isSuccess, toastMessage);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        if (setIsOpen) {
          setIsOpen(false);
        }
        if (actionCloseHandler) {
          actionCloseHandler();
        }
      }, 1000);
    }
  };

  return (
    <form
      id="consultationForm"
      className={className}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        staticData={input.name}
        register={register}
        errors={errors}
        options={name}
      />
      <FormMaskInput
        staticData={input.phone}
        register={register}
        errors={errors}
        options={phone}
      />
      <FormTextarea
        staticData={textarea}
        register={register}
        errors={errors}
        options={message}
      />
      <FormCheckbox
        staticData={checkbox}
        errors={errors}
        control={control}
        isChecked={!!watch().userAgree}
        options={agree}
      />

      <SubmitButton
        className={`${buttonClass} ${isLoading ? '!bg-gray-light' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? loadingText : buttonCurrentText}
      </SubmitButton>
    </form>
  );
};

export default Form;
