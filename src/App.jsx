import { FormGroup } from "./FormGroup"
import ReactSelect from "react-select"
import "./styles.css"
import {useController, useForm} from "react-hook-form"

const COUNTRY_OPTIONS = [
  { label: "United States", value: "US" },
  { label: "India", value: "IN" },
  { label: "Mexico", value: "MX" },
  { label: "Nepal", value: "NP" },
]

function App() {
  const {
    register, 
    handleSubmit, 
    formState: {errors}, 
    control,
    watch
  } = useForm()

  const {field: countryField} = useController({
    name: "country", 
    control,
    rules: {required: {value: true, message: "Required"}}
  })

  // helps to get most up to date values
  watch("email")
  console.log(email.value)

  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <FormGroup errorMessage={errors?.email?.message}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input 
          className="input" 
          type="email" 
          id="email" {...register("email", {
            required: {value: true, message: "Gmail Account email is required"}, 
            validate: value => {
              if (!value.endsWith("@gmail.com")) {
                return "Must end with @gmail.com. Gmail Account only Allowed"
              }
            }
          }
          )} 
        />
      </FormGroup>
      <FormGroup errorMessage={errors?.password?.message}>
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="password"
          {...register("password",{
            required: {value: true, message: "Password is required"},
            minLength: {value: 10, message: "Must be at least 10 characters"},
            validate:{
              hasLowerCase: value => {
                if (!value.match(/[a-z]/)) {
                  return "Must include at least 1 lowercase letter"
                }
              },
              hasUpperCase: value => {
                if (!value.match(/[A-Z]/)) {
                  return "Must include at least 1 uppercase letter"
                }
              },
              hasNumericValue: value => {
                if (!value.match(/[0-9]/)) {
                  return "Must include at least 1 number"
                }
              }
            }
          })}
        />
      </FormGroup>
      <FormGroup errorMessage={errors?.country?.message}>
        <label className="label" htmlFor="country">
          Country
        </label>
        <ReactSelect
          isClearable
          classNamePrefix="react-select"
          id="country"
          options={COUNTRY_OPTIONS}
          {...countryField}
        />
      </FormGroup>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  )
}

export default App
