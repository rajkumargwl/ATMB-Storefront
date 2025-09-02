export const FOOTER_QUERY = `*[_type == "footer"][0]{
    title,
    logo{asset->{url}},
    description,
    companyColumn{title,links[]{label,link}},
    servicesColumn{title,links[]{label,link}},
    locationsColumn{title,links[]{label,link,highlight}},
    appButtons[]{icon{asset->{url}}, link},
    socialLinks[]{icon{asset->{url}}, link},
    bottomLinks[]{label,link}
  }`;