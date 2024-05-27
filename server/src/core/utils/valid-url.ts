export default function isValidUrl (url: string): { data: URL | null, error: any } {
  try {
    const newUrl = new URL(url)
    return { data: newUrl, error: null }
  } catch (e) {
    return { data: null, error: e }
  }
}
