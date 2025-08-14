// src/sanityClient.ts
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: '9fc3blbd', // Replace with your actual project ID
  dataset: 'production',        // Or whatever dataset you're using
  useCdn: true,                 // `false` if you want fresh data
  apiVersion: '2023-01-01',     // Use a fixed date to avoid breaking changes
})

export default sanityClient
