// @ts-ignore
import { isJwtExpired } from 'jwt-check-expiration'
import { NitroFetchRequest } from 'nitropack'
import { FetchOptions } from 'ofetch'

import { useAuthStore } from '~/store/auth'

export const useApi = (apiUrl?: string) => {
  const authStore = useAuthStore()
  const baseURL = apiUrl || (import.meta.env.VITE_API_BASE_URL as string)
  const loading = ref(false)
  const tokens = computed(() => authStore.getTokens())
  const { getFingerprint } = useFingerprint()

  async function $service(options?: FetchOptions) {
    const headers = {
      ...options?.headers,
      'Accept-Language': useCookie('locale').value || 'uz',
      'finger-print': getFingerprint(),
    }

    if (tokens.value?.refresh) {
      if (!tokens.value?.access || isJwtExpired(authStore.tokens?.access)) {
        const dFetch = $fetch.create({
          method: 'POST',
          baseURL,
          headers,
          body: {
            refresh: tokens.value.refresh,
          },
        })
        try {
          const _res = await dFetch('users/Refresh/') // TODO: change path
          authStore.setTokens({
            access: (_res as Pick<any, 'accessToken'>).access,
            refresh: tokens.value.refresh,
          })
        } catch (err) {
          authStore.logout()
          throw new Error(err)
        }
      }
    }
    if (tokens.value?.access) {
      Object.assign(headers, {
        Authorization: `Bearer ${tokens.value?.access}`,
      })
    }
    return $fetch.create({
      ...options,
      baseURL,
      headers,
    })
  }

  function handleAuthError(error) {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      authStore.logout()
    }
    return error.response
  }

  async function makeRequest<T>(
    method: string,
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    const service = await $service({ ...options, method })
    return service(endpoint)
  }

  function $get<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      loading.value = true
      makeRequest<T>('GET', endpoint, options)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          handleAuthError(error)
          reject(error.response)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  function $post<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      loading.value = true
      makeRequest<T>('POST', endpoint, options)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          handleAuthError(error)
          reject(error.response)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  function $put<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      loading.value = true
      makeRequest<T>('PUT', endpoint, options)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error.response)
          handleAuthError(error)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  function $patch<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      loading.value = true
      makeRequest<T>('PATCH', endpoint, options)
        .then((response: T | any) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error.response)
          handleAuthError(error)
        })
        .finally(() => {
          loading.value = false
        })
    })
  }

  function $delete<T = never>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      loading.value = true
      makeRequest<T>('DELETE', endpoint, options)
        .then((response: T | any) => {
          handleAuthError(response)
          resolve(response)
        })
        .catch((error) => reject(error.response))
        .finally(() => {
          loading.value = false
        })
    })
  }

  return {
    loading,
    baseURL,
    $get,
    $post,
    $put,
    $patch,
    $delete,
  }
}
