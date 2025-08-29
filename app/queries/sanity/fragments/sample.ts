import groq from 'groq'

export const SAMPLE_PAGE = groq`
  _id,
  title,
  description,
  image {
    asset->{
      _id,
      url
    },
    alt
  }
`
