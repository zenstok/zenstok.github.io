module.exports = {
  siteMetadata: {
    title: `Restaurant Apaculco`,
    description: `Restaurant Acapulco. In curand vom fi din nou impreuna! Pizza; Preparate cu specific romanesc﻿; Cocktail; Atmosfera relaxata; Zambete﻿; Amintiri de neuitat.`,
    author: `@zenstok`,
    siteUrl: `https://restaurantacapulco.ro`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/corina_logo_acapulco.jpeg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
