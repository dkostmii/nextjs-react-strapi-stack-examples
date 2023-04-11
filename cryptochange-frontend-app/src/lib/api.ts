import axios, { AxiosRequestConfig } from 'axios'

import { errorTitleStyle } from './consoleThemes'

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path: string = ''): string {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337'
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
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
    },
    ...options
  }

  // Trigger API call
  const response = await axios({
    baseURL: getStrapiURL('/api'),
    url: path,
    params: urlParamsObject,
    ...mergedOptions
  }).catch((error) => {
    if (error.response) {
      console.error(errorTitleStyle('Response data:'), error.response.data)
      console.error(errorTitleStyle('Response status:'), error.response.status)
      console.error(
        errorTitleStyle('Response headers:'),
        error.response.headers
      )
    } else if (error.request) {
      console.error(errorTitleStyle('Request data:'), error.request)
    } else {
      console.error(errorTitleStyle('API call error:'), error.message)
    }

    console.error(errorTitleStyle('Configuration:'), error.config)

    throw new Error('Failed to load data from server.')
  })

  return response.data
}
