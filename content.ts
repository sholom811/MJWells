// Single source of truth for site copy. Edit here, never in JSX.
// See CLAUDE.md for the rule and rationale.

export const author = {
  name: "Michael J. Wells",
  email: "", // TODO: add Michael's public contact email if he wants one published; footer omits the line while empty
};

export const book = {
  title: "The Nehemiah Blueprint",
  subtitle: "Redeeming Brokenness Through Visionary Leadership",
  cover: "/nehemiah-blueprint-cover.jpg",
  coverAlt:
    "Book cover of The Nehemiah Blueprint by Michael J. Wells: the Tower of David and Jerusalem's walls at golden hour, overlaid with a faint architectural blueprint grid.",
  // TODO: fill in once Michael confirms the retail price. Leave null — the CTA renders without a price line when this is null.
  price: null as number | null,
  checkoutUrl: process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL ?? "",
  // TODO: replace with Michael's real back-cover copy.
  blurb:
    "Every rebuilding effort starts with an honest look at the rubble. In The Nehemiah Blueprint, Michael J. Wells draws on the ancient story of Nehemiah to offer a practical, visionary framework for leaders to utilize God's blueprint to redeem brokenness — in their own lives and in the leaders they are raising up. It's a field guide for pastors, planters, and anyone entrusted with rebuilding something that matters.",
};

export const bio = {
  portrait: "/michael-wells.jpg",
  portraitAlt:
    "Michael J. Wells and his wife seated together, smiling, in an informal portrait against a plain light background.",
  paragraphs: [
    "Originally from Montana, Michael has called Georgia home since 1997. There he met and married his wife, and together they're raising two daughters. When he isn't writing or leading, he's most at home in the mountains, waist-deep in a river, fly-fishing.",
    "Michael holds a Bachelor of Arts in Biblical Studies and Ministry from Trinity Bible College and Seminary, and is currently completing a Doctor of Ministry at Antioch School of Leadership and Church Planting.",
    "He serves as the pastor of a local church and the leader of an apostolic network. His unwavering passion is developing, training, and launching leaders into the calling God has placed on their lives — a commitment that has taken him to leaders across the United States, Europe, and the Middle East.",
  ],
};

// Nav link labels. Route paths are structural — they live in app/nav.tsx.
export const nav = {
  home: "Home",
  booking: "Book the Author",
};

// Book-the-Author page copy. Drawn from church_booking.pdf / business_booking.pdf.
// Fee, W-9, and payee details are handled off-site once a host reaches out — see CLAUDE.md.
export const booking = {
  intro: {
    eyebrow: "Speaking & Events",
    body: "Michael speaks at churches, conferences, businesses, and leadership networks across the United States, Europe, and the Middle East — biblical exposition, leadership formation, and the themes of The Nehemiah Blueprint. Tell him about your event using the form below.",
  },
  contact: {
    email: "mjwells@nccvaldosta.org",
    phone: "229-247-7777",
  },
  // Summarized from the PDFs' Logistics & Requirements sections.
  logistics: [
    "Host covers travel and lodging; the speaking fee is arranged in advance based on time commitment, number of sessions, and purpose.",
    "Michael provides a bio, headshot, and book cover image for event promotion, and brings books and resources for a display table.",
  ],
  leadTime:
    "Minimum 60–90 days advance booking preferred. Availability is confirmed against the current ministry and network calendar.",

  church: {
    eyebrow: "For Churches & Ministries",
    title: "Church & Ministry Events",
    portrait: "/michael-church.jpg",
    portraitAlt: "Michael J. Wells speaking at a church event.",
    bio: "Michael Wells brings over 30 years of vocational ministry experience, including two decades of pastoral ministry, leadership, and church planting. For the past 12 years he has also led an apostolic network dedicated to equipping, training, and launching Kingdom leaders. He is the author of The Nehemiah Blueprint, which focuses on visionary leadership being used to redeem brokenness in our society. Michael is close to finishing a doctorate in Ministry & Theology. His teaching is theological, practical, and Christ-centered, drawing on biblical exposition, five-fold ministry, and leadership development for pastors, marketplace leaders, and emerging leaders.",
    emphases: [
      "Kingdom culture and biblical leadership formation",
      "Five-fold ministry and apostolic function in the local church",
      "Pastoral longevity, succession, and developing healthy leadership teams",
      "Book content: themes on leadership, calling, and Kingdom impact",
      "Custom exposition and topical messages tailored to the host context",
    ],
    settings: [
      {
        name: "Church Service",
        format: "Single or multi-service weekend (e.g., Sunday AM/PM), with a book table",
        audience: "Congregation-wide teaching; pastoral encouragement",
        length: "30–45 minute message",
        addOns:
          "General leadership session; executive leadership session with staff and elders",
        timeline: "Single weekend visit",
      },
      {
        name: "Conference / Network Event",
        format: "General session keynote(s), workshop or breakout, or a multi-day track",
        audience: "Leaders, pastors, or apostolic network delegates; equipping-focused",
        length: "45–60 minute keynote or 60–90 minute workshop",
        addOns: "Panel or Q&A, book signing, network partnership conversation",
        timeline: "Full conference duration (1–3 days) depending on role",
      },
    ],
  },

  business: {
    eyebrow: "For Businesses & Organizations",
    title: "Business & Organizational Events",
    portrait: "/michael-business.jpg",
    portraitAlt: "Michael J. Wells speaking at a business event.",
    bio: "Michael Wells brings over 30 years of leadership experience, including two decades building and leading organizations through his work in pastoral ministry and church planting. For the past 12 years he has also led a national network dedicated to equipping, training, and launching emerging leaders. He is the author of a book on leadership formation, The Nehemiah Blueprint, and is currently finishing a doctorate in Leadership Studies. His teaching is practical, values-driven, and results-oriented, drawing on decades of experience in organizational development, team building, and leadership formation for executives, entrepreneurs, and emerging leaders.",
    emphases: [
      "Organizational culture and leadership formation",
      "Team structure and leadership function within growing organizations",
      "Leadership longevity, succession planning, and building healthy teams",
      "Book content: themes on leadership, purpose, and lasting impact",
      "Custom keynote or workshop content tailored to the audience and event goals",
    ],
    settings: [
      {
        name: "Business Setting",
        format: "Single or multi-session engagement, with a book table",
        audience:
          "Staff teams; executive leadership; project managers; C-suite executives",
        length: "30–45 minutes per session",
        addOns:
          "Multiple sessions; Zoom sessions; one-on-one coaching; follow-up sessions",
        timeline: "Single-day event",
      },
      {
        name: "Conference / Network Event",
        format: "General session keynote(s), workshop or breakout, or a multi-day track",
        audience:
          "Local businesses; regional leaders; company-wide or hybrid environments",
        length: "45–60 minute keynote or 60–90 minute workshop",
        addOns: "Panel or Q&A, book signing, network partnership conversation",
        timeline: "Full conference duration (1–3 days) depending on role",
      },
    ],
  },

  // One Formbricks survey serves both contexts (church + business). Self-hosted at
  // forms.nccvaldosta.com; the ?embed=true param strips its page chrome. Public URL —
  // NEXT_PUBLIC_* just lets it be swapped without a code edit. Empty ⇒ placeholder.
  form: {
    eyebrow: "Request a Booking",
    heading: "Tell Michael about your event",
    body: "One form for every context — church service, conference, business session, or network event. Share your dates, audience, and what you have in mind, and Michael's team will follow up.",
    url:
      process.env.NEXT_PUBLIC_FORMBRICKS_URL ??
      "https://forms.nccvaldosta.com/s/cmtvnhnms003n01mkkfaowp4h?embed=true",
  },
};

// Privacy policy. Footer-only link (app/ui.tsx); page at app/privacy/page.tsx.
// Contact email reuses booking.contact.email.
export const privacy = {
  linkLabel: "Privacy",
  title: "Privacy Policy",
  updated: "October 8, 2026",
  intro:
    'This policy explains what information Michael J. Wells ("we," "us") collects through www.michaeljwells.com and how we use it.',
  sections: [
    {
      heading: "Information We Collect",
      items: [
        {
          lead: "Booking requests.",
          text: 'When you submit the "Book the Author" form, we collect what you enter, such as your name, email, organization, event details, and message. The form uses Formbricks software that we host ourselves.',
        },
        {
          lead: "Book purchases.",
          text: "Purchases are processed by Stripe. Stripe collects your payment details. We receive your name, email, shipping address, and order details so we can ship your book. We do not receive or store your full card number.",
        },
        {
          lead: "Basic technical information.",
          text: "Our hosting provider automatically processes information such as your IP address, browser type, and pages visited in order to deliver and secure the site.",
        },
      ],
    },
    {
      heading: "How We Use It",
      items: [
        { text: "To respond to speaking and booking requests" },
        { text: "To fulfill and ship orders and answer questions about them" },
        { text: "To keep business and tax records" },
        { text: "To keep the site running and secure" },
      ],
      after:
        "We do not sell or rent your personal information, and we do not use it for targeted advertising.",
    },
    {
      heading: "Service Providers",
      items: [
        { lead: "Cloudflare", text: "- hosting and security" },
        { lead: "Stripe", text: "- payment processing" },
        { lead: "Our cloud server provider", text: "- hosts our form software" },
        {
          lead: "Shipping carriers",
          text: "- receive your name and address to deliver your order",
        },
      ],
      after:
        "Each provider handles information under its own privacy policy. We may also disclose information if required by law.",
    },
    {
      heading: "Cookies",
      paragraphs: [
        "We do not use advertising or tracking cookies. Cloudflare may set strictly necessary security cookies, and Stripe may use cookies needed to process payments and prevent fraud.",
      ],
    },
    {
      heading: "Do Not Track",
      paragraphs: [
        'We do not track visitors across third-party websites, and we do not knowingly allow third parties to collect personal information about your activity over time and across different websites through our site. Because of this, we do not respond differently to browser "Do Not Track" signals.',
      ],
    },
    {
      heading: "Children",
      paragraphs: [
        "This site is intended for adults and is not directed to children under 13. We do not knowingly collect personal information from children under 13.",
      ],
    },
    {
      heading: "Keeping and Protecting Information",
      paragraphs: [
        "We keep booking requests as long as needed to respond, and order records as long as needed for business and tax purposes. We use reasonable safeguards, but no website is completely secure.",
      ],
    },
    {
      heading: "Your Choices",
      paragraphs: [
        "You can email us to ask what information we have about you, or to correct or delete it, except records we are legally required to keep.",
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        "If we update this policy, we will post the new version here and change the date above.",
      ],
    },
  ] as {
    heading: string;
    paragraphs?: string[];
    items?: { lead?: string; text: string }[];
    after?: string;
  }[],
  contactHeading: "Contact",
};
