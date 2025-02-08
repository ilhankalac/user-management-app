import { ref, computed, Ref } from 'vue'
import User from '@/models/User'

export function useFetchUsers() {
  const ready = ref(false)
  const users: Ref<User[]> = ref([])
  const error = ref<Error | null>(null)
  const loading = ref(false)

  const isEmpty = computed(() => users.value.length === 0)
  const totalUsers = computed(() => users.value.length)

  const fetchUsers = async () => {
    if (loading.value) return

    loading.value = true
    ready.value = false
    error.value = null

    try {
      users.value = await User.fetch()
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Failed to fetch users')
      users.value = []
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    error,
    loading,
    isEmpty,
    totalUsers,
    fetchUsers,
    ready
  }
}

export function useFetchUser() {
  const user = ref<User | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(false)
  const ready = ref(false)

  const fetchUser = async (id: string) => {
    if (loading.value) return

    loading.value = true
    error.value = null

    try {
      user.value = await User.fetchById(id)
      ready.value = true
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Failed to fetch user')
      user.value = null
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    error,
    loading,
    fetchUser,
    ready
  }
} 