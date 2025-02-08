import { Ref, ref } from "vue"
import User from "@/models/User"
import { IUser } from "@/types/other"

export function useFetchUsers() {
  const users: Ref<IUser[]> = ref([])
  const error = ref(null)
  const loading = ref(false)

  const fetchUsers = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await User.fetch()
      users.value = response
    } catch (err: any) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { users, error, loading, fetchUsers }
}