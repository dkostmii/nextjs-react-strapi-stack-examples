import qs from 'qs'

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path: string = ''): string {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337'
  }${path}`
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(
  path: string,
  urlParamsObject: object = {},
  options: object = {}
) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  }

  const hello = 'hello'

  // Build request URL
  const queryString = qs.stringify(urlParamsObject)

  const strapiUrlPath = `/api${path}${queryString ? `${queryString}` : ''}`
  const requestUrl = `${getStrapiURL(strapiUrlPath)}`

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions)

  // Handle response
  if (!response.ok) {
    const error = response.json()
    console.error(response.statusText, error)
    throw new Error(`An error occurred, while making API call: ${error}`)
  }

  const data = response.json()
  return data
}
