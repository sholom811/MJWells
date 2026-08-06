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
  checkoutUrl: process.env.NEXT_PUBLIC_SQUARE_CHECKOUT_URL ?? "",
  // TODO: replace with Michael's real back-cover copy.
  blurb:
    "Every rebuilding effort starts with an honest look at the rubble. In The Nehemiah Blueprint, Michael J. Wells draws on the ancient story of Nehemiah to offer a practical, visionary framework for leaders ready to turn brokenness into blueprint — in their own lives and in the leaders they are raising up. It's a field guide for pastors, planters, and anyone entrusted with rebuilding something that matters.",
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
