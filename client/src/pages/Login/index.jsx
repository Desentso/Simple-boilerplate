import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import Button from "../../components/Buttons/Button"
import TextInput from "../../components/Inputs/TextInput"
import useUserStore from "../../state/user"
import Footer from "../Marketing/Footer"
import Header from "../Marketing/Header"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate()

  const user = useUserStore(s => s.user)
  useEffect(() => {
    if (user) {
      navigate("/app/overview")
    }
  }, [user])
  const login = useUserStore(s => s.login)
  const { register, formState: {errors}, handleSubmit } = useForm();
  const [error, setError] = useState("")

  const listenForEnter = e => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit)()
    }
  }

  const onSubmit = async ({email, password}) => {
    const res = await login({
      email,
      password,
    })

    if (!res.error) {
      navigate("/app/overview")
    } else {
      setError("Invalid email or password")
    }
  }

  return <>
    <div className="pt-6">
      <Header />
    </div>
    <div className="w-[1280px] max-w-[98%] mx-auto mt-10 flex flex-col items-center min-h-[60vh] pb-20">
      <h1 className="text-4xl font-semibold mt-8">Login</h1>
      <TextInput
        onKeyUp={listenForEnter}
        error={errors.email?.message}
        {...register('email', {required: "Email is required"})}
        type="email"
        label="Email"
        size={42} />
      <TextInput
        onKeyUp={listenForEnter}
        error={errors.password?.message}
        {...register('password', {required: "Password is required"})}
        type="password"
        label="Password"
        size={42} />
      {error && (
        <p className="mt-4 bg-red-400 py-1 px-2 rounded-sm">{error}</p>
      )}
      <Button filled onClick={handleSubmit(onSubmit)}>Log in</Button>
      <br />
      <Link className="text-primary underline" to="/app/forgot-password">Forgot password?</Link>
    </div>
    <Footer />
  </>;
}

export default Login