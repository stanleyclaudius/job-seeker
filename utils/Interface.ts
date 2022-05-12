import { ChangeEvent, FormEvent } from 'react'
import RootReducer from './../redux/reducers'

export type InputChange = ChangeEvent<HTMLInputElement>

export type FormSubmit = FormEvent<HTMLFormElement>

export type RootStore = ReturnType<typeof RootReducer>

export interface ISocialMediaRegister extends IUserLogin {
  name: string
  avatar: string
  type: string
}

export interface IUser extends ISocialMediaRegister {
  _id: string
  role: string
  province: number
  city: number
  district: number
  postalCode: number
  _doc?: object
}

export interface IUserLogin {
  email: string
  password: string
}

export interface IActivationData {
  name: string
  email: string
  password: string
}

export interface IDecodedToken {
  id: string
}

export interface IDecodedRegisterToken {
  name: string
  email: string
  password: string
  role: string
  avatar?: string
  province?: number
  city?: number
  district?: number
  postalCode?: number
  address?: string
  description?: string
  createdDate?: string
  totalEmployee?: number
  industryType?: string
  phoneNumber?: string
}