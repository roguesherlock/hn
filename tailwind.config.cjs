/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme.js")
module.exports = {
  content: ["./src/**/*.{vue,js,ts,css,html}", "./index.html"],
  darkMode: "class",
  theme: {
    extend: {
      typography: (theme) => ({
        invert: {
          css: {
            "--tw-prose-body": "var(--tw-prose-invert-body)",
            "--tw-prose-headings": "var(--tw-prose-invert-headings)",
            "--tw-prose-links": "var(--tw-prose-invert-links)",
            "--tw-prose-links-hover": "var(--tw-prose-invert-links-hover)",
            "--tw-prose-underline": "var(--tw-prose-invert-underline)",
            "--tw-prose-underline-hover":
              "var(--tw-prose-invert-underline-hover)",
            "--tw-prose-bold": "var(--tw-prose-invert-bold)",
            "--tw-prose-counters": "var(--tw-prose-invert-counters)",
            "--tw-prose-bullets": "var(--tw-prose-invert-bullets)",
            "--tw-prose-hr": "var(--tw-prose-invert-hr)",
            "--tw-prose-quote-borders": "var(--tw-prose-invert-quote-borders)",
            "--tw-prose-captions": "var(--tw-prose-invert-captions)",
            "--tw-prose-code": "var(--tw-prose-invert-code)",
            "--tw-prose-code-bg": "var(--tw-prose-invert-code-bg)",
            "--tw-prose-pre-code": "var(--tw-prose-invert-pre-code)",
            "--tw-prose-pre-bg": "var(--tw-prose-invert-pre-bg)",
            "--tw-prose-pre-border": "var(--tw-prose-invert-pre-border)",
            "--tw-prose-th-borders": "var(--tw-prose-invert-th-borders)",
            "--tw-prose-td-borders": "var(--tw-prose-invert-td-borders)",
          },
        },
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.mauve.12"),
            "--tw-prose-headings": theme("colors.mauve.12"),
            "--tw-prose-links": theme("colors.purple.11"),
            "--tw-prose-links-hover": theme("colors.purple.11"),
            "--tw-prose-underline": theme("colors.purple.7"),
            "--tw-prose-underline-hover": theme("colors.purple.8"),
            "--tw-prose-bold": theme("colors.mauve.11"),
            "--tw-prose-counters": theme("colors.mauve.11"),
            "--tw-prose-bullets": theme("colors.purple.9"),
            "--tw-prose-hr": theme("colors.purple.6"),
            "--tw-prose-quote-borders": theme("colors.purple.7"),
            "--tw-prose-captions": theme("colors.mauve.9"),
            "--tw-prose-code": theme("colors.mauve.11"),
            "--tw-prose-code-bg": theme("colors.purple.2"),
            "--tw-prose-pre-code": theme("colors.purple.11"),
            "--tw-prose-pre-bg": theme("colors.purple.2"),
            "--tw-prose-pre-border": "transparent",
            "--tw-prose-th-borders": theme("colors.purple.6"),
            "--tw-prose-td-borders": theme("colors.purple.6"),

            "--tw-prose-invert-body": theme("colors.mauveDark.12"),
            "--tw-prose-invert-headings": theme("colors.mauveDark.12"),
            "--tw-prose-invert-links": theme("colors.purpleDark.11"),
            "--tw-prose-invert-links-hover": theme("colors.purpleDark.11"),
            "--tw-prose-invert-underline": theme("colors.purpleDark.7"),
            "--tw-prose-invert-underline-hover": theme("colors.purpleDark.8"),
            "--tw-prose-invert-bold": theme("colors.mauveDark.11"),
            "--tw-prose-invert-counters": theme("colors.mauveDark.11"),
            "--tw-prose-invert-bullets": theme("colors.purpleDark.9"),
            "--tw-prose-invert-hr": theme("colors.purpleDark.6"),
            "--tw-prose-invert-quote-borders": theme("colors.purpleDark.7"),
            "--tw-prose-invert-captions": theme("colors.mauveDark.9"),
            "--tw-prose-invert-code": theme("colors.mauveDark.11"),
            "--tw-prose-invert-code-bg": theme("colors.purpleDark.2"),
            "--tw-prose-invert-pre-code": theme("colors.purpleDark.11"),
            "--tw-prose-invert-pre-bg": theme("colors.purpleDark.1"),
            "--tw-prose-invert-pre-border": theme("colors.purpleDark.6"),
            "--tw-prose-invert-th-borders": theme("colors.purpleDark.6"),
            "--tw-prose-invert-td-borders": theme("colors.purpleDark.6"),

            // Base
            wordBreak: "break-words",
            maxWidth: theme("maxWidth.xl"),
            color: "var(--tw-prose-body)",
            lineHeight: theme("lineHeight.7"),
            "> *": {
              marginTop: theme("spacing.10"),
              marginBottom: theme("spacing.10"),
            },
            p: {
              marginTop: theme("spacing.7"),
              marginBottom: theme("spacing.7"),
            },

            // Headings
            "h2, h3": {
              color: "var(--tw-prose-headings)",
              fontWeight: theme("fontWeight.semibold"),
            },
            h2: {
              fontSize: theme("fontSize.xl")[0],
              lineHeight: theme("lineHeight.7"),
              marginTop: theme("spacing.20"),
              marginBottom: theme("spacing.4"),
            },
            h3: {
              fontSize: theme("fontSize.base")[0],
              lineHeight: theme("lineHeight.7"),
              marginTop: theme("spacing.16"),
              marginBottom: theme("spacing.4"),
            },
            ":is(h2, h3) + *": {
              marginTop: 0,
            },

            // Images
            img: {
              borderRadius: theme("borderRadius.3xl"),
            },

            // Inline elements
            a: {
              wordBreak: "break-all",
              color: "var(--tw-prose-links)",
              fontWeight: theme("fontWeight.semibold"),
              textDecoration: "underline",
              textDecorationColor: "var(--tw-prose-underline)",
              transitionProperty: "color, text-decoration-color",
              transitionDuration: theme("transitionDuration.150"),
              transitionTimingFunction: theme(
                "transitionTimingFunction.in-out"
              ),
            },
            "a:hover": {
              color: "var(--tw-prose-links-hover)",
              textDecorationColor: "var(--tw-prose-underline-hover)",
            },
            strong: {
              color: "var(--tw-prose-bold)",
              fontWeight: theme("fontWeight.semibold"),
            },
            code: {
              display: "inline-block",
              color: "var(--tw-prose-code)",
              fontFamily: theme("fontFamily.mono"),
              fontSize: theme("fontSize.sm")[0],
              fontWeight: theme("fontWeight.semibold"),
              backgroundColor: "var(--tw-prose-code-bg)",
              borderRadius: theme("borderRadius.lg"),
              paddingLeft: theme("spacing.1"),
              paddingRight: theme("spacing.1"),
            },
            "a code": {
              color: "inherit",
            },
            ":is(h2, h3) code": {
              fontWeight: theme("fontWeight.bold"),
            },

            // Quotes
            blockquote: {
              paddingLeft: theme("spacing.6"),
              borderLeftWidth: theme("borderWidth.2"),
              borderLeftColor: "var(--tw-prose-quote-borders)",
              fontStyle: "italic",
            },

            // Figures
            figcaption: {
              color: "var(--tw-prose-captions)",
              fontSize: theme("fontSize.sm")[0],
              lineHeight: theme("lineHeight.6"),
              marginTop: theme("spacing.3"),
            },
            "figcaption > p": {
              margin: 0,
            },

            // Lists
            ul: {
              listStyleType: "disc",
            },
            ol: {
              listStyleType: "decimal",
            },
            "ul, ol": {
              paddingLeft: theme("spacing.6"),
            },
            li: {
              marginTop: theme("spacing.6"),
              marginBottom: theme("spacing.6"),
              paddingLeft: theme("spacing[3.5]"),
            },
            "li::marker": {
              fontSize: theme("fontSize.sm")[0],
              fontWeight: theme("fontWeight.semibold"),
            },
            "ol > li::marker": {
              color: "var(--tw-prose-counters)",
            },
            "ul > li::marker": {
              color: "var(--tw-prose-bullets)",
            },
            "li :is(ol, ul)": {
              marginTop: theme("spacing.4"),
              marginBottom: theme("spacing.4"),
            },
            "li :is(li, p)": {
              marginTop: theme("spacing.3"),
              marginBottom: theme("spacing.3"),
            },

            // Code blocks
            pre: {
              color: "var(--tw-prose-pre-code)",
              fontSize: theme("fontSize.sm")[0],
              fontWeight: theme("fontWeight.medium"),
              backgroundColor: "var(--tw-prose-pre-bg)",
              borderRadius: theme("borderRadius.3xl"),
              padding: theme("spacing.8"),
              overflowX: "auto",
              border: "1px solid",
              borderColor: "var(--tw-prose-pre-border)",
            },
            "pre code": {
              display: "inline",
              color: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
              backgroundColor: "transparent",
              borderRadius: 0,
              padding: 0,
            },

            // Horizontal rules
            hr: {
              marginTop: theme("spacing.20"),
              marginBottom: theme("spacing.20"),
              borderTopWidth: "1px",
              borderColor: "var(--tw-prose-hr)",
              "@screen lg": {
                marginLeft: `calc(${theme("spacing.12")} * -1)`,
                marginRight: `calc(${theme("spacing.12")} * -1)`,
              },
            },

            // Tables
            table: {
              width: "100%",
              tableLayout: "auto",
              textAlign: "left",
              fontSize: theme("fontSize.sm")[0],
            },
            thead: {
              borderBottomWidth: "1px",
              borderBottomColor: "var(--tw-prose-th-borders)",
            },
            "thead th": {
              color: "var(--tw-prose-headings)",
              fontWeight: theme("fontWeight.semibold"),
              verticalAlign: "bottom",
              paddingBottom: theme("spacing.2"),
            },
            "thead th:not(:first-child)": {
              paddingLeft: theme("spacing.2"),
            },
            "thead th:not(:last-child)": {
              paddingRight: theme("spacing.2"),
            },
            "tbody tr": {
              borderBottomWidth: "1px",
              borderBottomColor: "var(--tw-prose-td-borders)",
            },
            "tbody tr:last-child": {
              borderBottomWidth: 0,
            },
            "tbody td": {
              verticalAlign: "baseline",
            },
            tfoot: {
              borderTopWidth: "1px",
              borderTopColor: "var(--tw-prose-th-borders)",
            },
            "tfoot td": {
              verticalAlign: "top",
            },
            ":is(tbody, tfoot) td": {
              paddingTop: theme("spacing.2"),
              paddingBottom: theme("spacing.2"),
            },
            ":is(tbody, tfoot) td:not(:first-child)": {
              paddingLeft: theme("spacing.2"),
            },
            ":is(tbody, tfoot) td:not(:last-child)": {
              paddingRight: theme("spacing.2"),
            },
          },
        },
      }),
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        purple: {
          1: "hsl(280, 65.0%, 99.4%)",
          2: "hsl(276, 100%, 99.0%)",
          3: "hsl(276, 83.1%, 97.0%)",
          4: "hsl(275, 76.4%, 94.7%)",
          5: "hsl(275, 70.8%, 91.8%)",
          6: "hsl(274, 65.4%, 87.8%)",
          7: "hsl(273, 61.0%, 81.7%)",
          8: "hsl(272, 60.0%, 73.5%)",
          9: "hsl(272, 51.0%, 54.0%)",
          10: "hsl(272, 46.8%, 50.3%)",
          11: "hsl(272, 50.0%, 45.8%)",
          12: "hsl(272, 66.0%, 16.0%)",
        },
        purpleDark: {
          1: "hsl(284, 20.0%, 9.6%)",
          2: "hsl(283, 30.0%, 11.8%)",
          3: "hsl(281, 37.5%, 16.5%)",
          4: "hsl(280, 41.2%, 20.0%)",
          5: "hsl(279, 43.8%, 23.3%)",
          6: "hsl(277, 46.4%, 27.5%)",
          7: "hsl(275, 49.3%, 34.6%)",
          8: "hsl(272, 52.1%, 45.9%)",
          9: "hsl(272, 51.0%, 54.0%)",
          10: "hsl(273, 57.3%, 59.1%)",
          11: "hsl(275, 80.0%, 71.0%)",
          12: "hsl(279, 75.0%, 95.7%)",
        },
        mauve: {
          1: "hsl(300, 20.0%, 99.0%)",
          2: "hsl(300, 7.7%, 97.5%)",
          3: "hsl(294, 5.5%, 95.3%)",
          4: "hsl(289, 4.7%, 93.3%)",
          5: "hsl(283, 4.4%, 91.3%)",
          6: "hsl(278, 4.1%, 89.1%)",
          7: "hsl(271, 3.9%, 86.3%)",
          8: "hsl(255, 3.7%, 78.8%)",
          9: "hsl(252, 4.0%, 57.3%)",
          10: "hsl(253, 3.5%, 53.5%)",
          11: "hsl(252, 4.0%, 44.8%)",
          12: "hsl(260, 25.0%, 11.0%)",
        },
        mauveDark: {
          1: "hsl(246, 6.0%, 9.0%)",
          2: "hsl(240, 5.1%, 11.6%)",
          3: "hsl(241, 5.0%, 14.3%)",
          4: "hsl(242, 4.9%, 16.5%)",
          5: "hsl(243, 4.9%, 18.8%)",
          6: "hsl(244, 4.9%, 21.5%)",
          7: "hsl(245, 4.9%, 25.4%)",
          8: "hsl(247, 4.8%, 32.5%)",
          9: "hsl(252, 4.0%, 45.2%)",
          10: "hsl(247, 3.4%, 50.7%)",
          11: "hsl(253, 4.0%, 63.7%)",
          12: "hsl(256, 6.0%, 93.2%)",
        },
        gray: {
          1: "hsl(0, 0%, 99.0%)",
          2: "hsl(0, 0%, 97.3%)",
          3: "hsl(0, 0%, 95.1%)",
          4: "hsl(0, 0%, 93.0%)",
          5: "hsl(0, 0%, 90.9%)",
          6: "hsl(0, 0%, 88.7%)",
          7: "hsl(0, 0%, 85.8%)",
          8: "hsl(0, 0%, 78.0%)",
          9: "hsl(0, 0%, 56.1%)",
          10: "hsl(0, 0%, 52.3%)",
          11: "hsl(0, 0%, 43.5%)",
          12: "hsl(0, 0%, 9.0%)",
        },
        grayDark: {
          1: "hsl(0, 0%, 8.5%)",
          2: "hsl(0, 0%, 11.0%)",
          3: "hsl(0, 0%, 13.6%)",
          4: "hsl(0, 0%, 15.8%)",
          5: "hsl(0, 0%, 17.9%)",
          6: "hsl(0, 0%, 20.5%)",
          7: "hsl(0, 0%, 24.3%)",
          8: "hsl(0, 0%, 31.2%)",
          9: "hsl(0, 0%, 43.9%)",
          10: "hsl(0, 0%, 49.4%)",
          11: "hsl(0, 0%, 62.8%)",
          12: "hsl(0, 0%, 93.0%)",
        },
        tomato: {
          1: "hsl(10, 100%, 99.4%)",
          2: "hsl(8, 100%, 98.4%)",
          3: "hsl(8, 100%, 96.6%)",
          4: "hsl(8, 100%, 94.3%)",
          5: "hsl(8, 92.8%, 91.0%)",
          6: "hsl(9, 84.7%, 86.3%)",
          7: "hsl(10, 77.3%, 79.5%)",
          8: "hsl(10, 71.6%, 71.0%)",
          9: "hsl(10, 78.0%, 54.0%)",
          10: "hsl(10, 71.5%, 50.0%)",
          11: "hsl(10, 82.0%, 43.5%)",
          12: "hsl(10, 50.0%, 13.5%)",
        },
        tomatoDark: {
          1: "hsl(10, 23.0%, 9.4%)",
          2: "hsl(9, 44.8%, 11.4%)",
          3: "hsl(8, 52.0%, 15.3%)",
          4: "hsl(7, 56.3%, 18.0%)",
          5: "hsl(7, 60.1%, 20.6%)",
          6: "hsl(8, 64.8%, 24.0%)",
          7: "hsl(8, 71.2%, 29.1%)",
          8: "hsl(10, 80.2%, 35.7%)",
          9: "hsl(10, 78.0%, 54.0%)",
          10: "hsl(10, 81.7%, 59.0%)",
          11: "hsl(10, 85.0%, 62.8%)",
          12: "hsl(10, 89.0%, 96.0%)",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/forms"),
  ],
}
