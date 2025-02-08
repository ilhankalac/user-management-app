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