import TextField from '@/components/atoms/TextField'
import SignInPageForm from './form'
import React from 'react'
import FilledButton from '@/components/atoms/FilledButton'

function SignInPage() {
  return (
    <SignInPageForm className='h-screen w-screen flex flex-col py-[20px] px-[60px] items-center'>
      <h2 className='text-title font-bold'>Sign In</h2>
      <div className='flex flex-col h-full w-full items-center justify-center gap-3'>
        <TextField
          className='w-[55%]'
          attributes={{
            tabIndex: 0,
            placeholder: 'Email',
            name: 'email',
            type: 'email',
            required: true
          }}
        />
        <TextField
          className='w-[55%]'
          attributes={{
            tabIndex: 0,
            placeholder: 'Password',
            name: 'password',
            type: 'password',
            required: true
          }}
        />
        <FilledButton
          className='w-[30%]'
          attributes={{ tabIndex: 0, type: 'submit' }}
        >
          Submit
        </FilledButton>
      </div>
    </SignInPageForm>
  )
}

export default SignInPage
