export const FOOTER_QUERY = `*[_type == "footer"] | order(_updatedAt desc)[0] {
  title,
  logo {
    asset->{
      url
    }
  },
  description,
  companyColumn {
    title,
    links[] {
      label,
      link
    }
  },
  servicesColumn {
    title,
    links[] {
      label,
      link
    }
  },
  locationsColumn {
    title,
    links[] {
      label,
      link,
      highlight
    }
  },
  appButtons[] {
    icon {
      asset->{
        url
      }
    },
    link
  },
  socialLinks[] {
    icon {
      asset->{
        url
      }
    },
    link
  },
    contactColumn{
    title,
    address,
    links[]{icon{asset->{url}}, label, link}
  },
  bottomLinks[] {
    label,
    link
  }
}`;