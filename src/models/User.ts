import { apiService } from '@/services/ApiService'
import { IAddress, ICompany, IUser } from '@/types/other'

export default class User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
  company: ICompany
  address: IAddress

  constructor(user: IUser) {
    this.id = user.id
    this.name = user.name
    this.username = user.username
    this.email = user.email
    this.phone = user.phone
    this.website = user.website
    this.company = user.company
    this.address = user.address
  }

  static async fetch(params?: any) {
    const response = await apiService.get<IUser[]>('users', { params })
    return response.data.map(user => new User(user))
  }

  static async fetchById(id: string) {
    const response = await apiService.get<IUser>(`users/${id}`)
    return new User(response.data)
  }
}