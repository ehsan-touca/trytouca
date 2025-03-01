// @ts-check
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Touca Docs",
  tagline: "Open Source Continuous Regression Testing for Engineering Teams",
  url: "https://touca.io",
  baseUrl: "/docs/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  onDuplicateRoutes: "warn",
  organizationName: "trytouca",
  projectName: "@touca/docs",
  trailingSlash: true,
  scripts: [
    {
      src: "/js/script.outbound-links.js",
      defer: true,
      "data-domain": "touca.io"
    }
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          breadcrumbs: true,
          routeBasePath: "/",
          showLastUpdateTime: true,
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/trytouca/trytouca/tree/main/docs"
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      })
    ]
  ],
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            from: "/basics/quickstart",
            to: "/basics"
          },
          {
            from: "/guides/cli",
            to: "/cli"
          },
          {
            from: "/guides/keyboard",
            to: "/server/keyboard-shortcuts"
          },
          {
            from: "/sdk/differences",
            to: "/sdk"
          },
          {
            from: "/basics/faq",
            to: "/guides/faq"
          },
          {
            from: "/concepts/vs-snapshot",
            to: "/sdk"
          }
        ]
      }
    ],
    ["@docusaurus/plugin-ideal-image", {}]
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: "MSEUIQLYS3",
        apiKey: "c52beaf0ac5121aa8460e53430098f12",
        indexName: "touca"
      },
      metadata: [
        {
          name: "description",
          content:
            "Touca is a continuous regression testing solution that helps software engineering teams gain confidence in their daily code changes."
        },
        {
          name: "og:title",
          content: "Developer-friendly Continuous Regression Testing"
        },
        {
          name: "og:description",
          content:
            "Touca is a continuous regression testing solution that helps software engineering teams gain confidence in their daily code changes."
        },
        { name: "og:url", content: "https://touca.io/docs" },
        { name: "og:type", content: "website" },
        {
          name: "og:image",
          content: "https://touca.io/images/touca_open_graph_image.png"
        },
        {
          name: "og:image:alt",
          content:
            "Open Source Continuous Regression Testing for Engineering Teams"
        },
        { name: "og:image:type", content: "image/png" },
        { name: "og:image:width", content: "906" },
        { name: "og:image:height", content: "453" },
        { name: "og:locale", content: "en_US" },
        { name: "og:site_name", content: "Touca Docs" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@trytouca" },
        { name: "twitter:creator", content: "@heypejman" },
        { name: "theme-color", content: "#1f2937" },
        { name: "robots", content: "index,follow" },
        { name: "keywords", content: "documentation, regression testing" }
      ],
      navbar: {
        title: "Touca Docs",
        logo: {
          alt: "Touca Logo",
          src: "img/logo.png",
          href: "https://touca.io"
        },
        items: [
          {
            href: "https://twitter.com/trytouca",
            position: "right",
            className: "header-twitter-link",
            "aria-label": "Touca on Twitter"
          },
          {
            href: "https://github.com/trytouca/trytouca",
            position: "right",
            className: "header-github-link",
            "aria-label": "Touca on GitHub"
          }
        ]
      },
      footer: {
        style: "light",
        links: [],
        copyright:
          "Made with ❤️ in California ☀️ with contributions from around the 🌏"
      },
      prism: {
        additionalLanguages: ["java"],
        theme: require("prism-react-renderer/themes/github"),
        darkTheme: require("prism-react-renderer/themes/dracula")
      }
    })
};

module.exports = config;
