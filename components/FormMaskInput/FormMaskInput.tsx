'use client';

import { FC } from 'react';

import { FormInputProps } from './FormInput.props';
import classnames from 'classnames';
import MaskedInput from 'react-input-mask';

const FormMaskInput: FC<FormInputProps> = ({
  staticData,
  register,
  errors,
  options,
}) => {
  const { label, placeholder, error } = staticData;
  const { name, pattern } = options;

  const hasError = errors[name];

  const inputClass = classnames(
    'h-[51px] md:h-[59px] text-base outline-none outline-1 outline-offset-1 outline-gray-dark px-4 rounded-extended placeholder-gray-dark hover:outline-gray-dim focus:outline-gray-dim transition-all duration-300',
    {
      'outline-notify-error hover:outline-notify-error focus:outline-notify-error':
        hasError,
    },
  );

  return (
    <label className="relative mb-8 flex flex-col text-black-dark">
      <span className="mb-2 text-sm leading-normal -tracking-[0.48px] md:text-xl">
        {label}
      </span>

      <MaskedInput
        // mask options
        mask={'+38(099)999-99-99'}
        alwaysShowMask={false}
        type={'text'}
        className={inputClass}
        placeholder={placeholder}
        // react hook form register
        {...register(name, {
          ...options,
          pattern: new RegExp(pattern),
        })}
      />
      {hasError ? (
        <span className="absolute top-full mt-1 text-xs leading-[1.21] -tracking-[0.48px] text-notify-error md:text-sm ">
          {error}
        </span>
      ) : null}
    </label>
  );
};

export default FormMaskInput;
