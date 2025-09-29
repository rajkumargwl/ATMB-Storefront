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
    link,
    tooltipTitle // ADD THIS
  },
  socialLinks[] {
    icon {
      asset->{
        url
      }
    },
    link,
    tooltipTitle // ADD THIS
  },
  contactColumn{
    title,
    address,
    links[]{
      icon{
        asset->{
          url
        }
      }, 
      label, 
      link,
      tooltipTitle // ADD THIS
    }
  },
  bottomLinks[] {
    label,
    link
  }
}`;