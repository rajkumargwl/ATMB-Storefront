export const FOOTER_QUERY = `*[_type == "footer" && (language == $language || !defined(language))] | order(_updatedAt desc)[0] {
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
      link
    }
  },

  MailboxRenters {
    title,
    links[] {
      label,
      link
    }
  },

  MailCenterOperator {
    title,
    links[] {
      label,
      link
    }
  },

  contactColumn {
    title,
    address,
    links[] {
      icon {
        asset->{
          url
        }
      },
      tooltipTitle,
      label,
      link
    }
  },

  appButtons[] {
    icon {
      asset->{
        url
      }
    },
    link,
    tooltipTitle
  },

  socialLinks[] {
    icon {
      asset->{
        url
      }
    },
    link,
    tooltipTitle
  },

  bottomLinks[] {
    label,
    link
  }
}`;
