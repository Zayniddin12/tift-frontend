export const useFingerprint = () => {
  const fingerprint = useCookie('fingerprint')
  function generateRandomHexString(length: number) {
    if (process.client) {
      const byteCount = Math.ceil(length / 2) // 2 hex characters per byte
      const randomBytes = new Uint8Array(byteCount)
      crypto.getRandomValues(randomBytes)
      let hexString = ''
      for (let i = 0; i < byteCount; i++) {
        hexString += randomBytes[i].toString(16).padStart(2, '0')
      }
      fingerprint.value = hexString.substr(0, length)
      return fingerprint
    }
  }
  // Example usage: generate a 16-character long random hex string
  function getFingerprint() {
    return !fingerprint.value ? generateRandomHexString(16) : fingerprint.value
  }
  return { getFingerprint }
}
