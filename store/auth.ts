type Tokens = {
  access: string
  refresh: string
  is_registered?: boolean
}

interface IAuthStore {
  session: string | null
  tokens: Tokens
  user: any
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): IAuthStore => ({
    session: null,
    user: null,
    tokens: {
      access: '',
      refresh: '',
      is_registered: false,
    },
  }),
  actions: {
    getUser() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get('/users/profile/')
          .then((res) => {
            this.user = res
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    getSession(phone: string) {
      return new Promise((resolve, reject) => {
        return useApi()
          .$post<{ session: string }>('/users/login-entry/', {
            body: {
              phone: phone.replace(/[\s)(-]/g, ''),
            },
          })
          .then((res) => {
            this.session = res?.session
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    getRegisterSession(phone: string) {
      return new Promise((resolve, reject) => {
        return useApi()
          .$post<{ session: string }>('/users/register-entry/', {
            body: {
              phone: phone?.replace(/[\s)(-]/g, ''),
            },
          })
          .then((res) => {
            this.session = res?.session
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    register(phone: string, code: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post<Tokens>('/users/register-verify/', {
            body: {
              phone: phone?.replace(/[\s)(-]/g, ''),
              code,
              session: this.session,
            },
          })
          .then((res) => {
            this.setTokens(res)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    login(phone: string, code: string) {
      return new Promise((resolve, reject) => {
        useApi()
          .$post<Tokens>('/users/login-verify/', {
            body: {
              phone: phone?.replace(/[\s)(-]/g, ''),
              code,
              session: this.session,
            },
          })
          .then((res) => {
            this.setTokens(res)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    logout() {
      const access = useCookie('access_token')
      const refresh = useCookie('refresh_token')
      access.value = undefined
      refresh.value = undefined
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      this.tokens.access = ''
      this.tokens.refresh = ''
    },

    setTokens(payload: Tokens) {
      if (payload?.access) {
        const access = useCookie('access_token')
        access.value = payload.access
        this.tokens.access = payload.access
      }
      if (payload?.refresh) {
        const refresh = useCookie('refresh_token')
        refresh.value = payload.refresh
        this.tokens.refresh = payload.refresh
      }
      this.tokens.is_registered = payload.is_registered
    },

    getTokens() {
      const access = useCookie('access_token')
      const refresh = useCookie('refresh_token')
      this.tokens.access = access.value
      this.tokens.refresh = refresh.value
      return this.tokens
    },
  },
})
