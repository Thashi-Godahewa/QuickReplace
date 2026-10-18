// Content for the Terms & Conditions page, taken from the Figma design.
// Quick Replace should confirm the wording before launch.
// `blocks` are rendered in order: { type: 'p', text } or { type: 'list', items }.

export const termsClauses = [
  {
    id: 'general-terms',
    title: 'General terms and conditions',
    indexLabel: 'General terms & conditions',
    blocks: [
      { type: 'p', text: 'These terms and conditions and information below apply to the use of this web site.' },
      {
        type: 'p',
        text: 'If you do not accept these terms and conditions, you must refrain from using the web site. These terms and conditions must be read in conjunction with any other applicable terms and conditions governing the use of this web site.',
      },
      {
        type: 'p',
        text: 'We reserve the right to amend these terms and conditions from time to time. Amendments will be effective immediately upon notification on this web site. Your continued use of the web site following such notification will represent an agreement by you to be bound by the terms and conditions as amended.',
      },
    ],
  },
  {
    id: 'cookie-policy',
    title: 'Cookie Policy',
    indexLabel: 'Cookie policy',
    blocks: [
      {
        type: 'p',
        text: 'Our website uses third-party vendors, including Google, to collect visitor behavior data and to show Quick Replace advertisements on other internet sites. This data is collected anonymously for marketing and optimization purposes and is saved using an anonymous user ID to aggregate a usage profile. The information collected may include content you view, the date and time you view this content, products you purchase, or your location information associated with your IP address. We may use this collected information to serve you relevant advertisements based on prior visits to our website. We collect information about where you saw the advertisements we serve you and what advertisements you clicked on. Cookies may be used for this purpose.',
      },
      {
        type: 'p',
        text: 'A cookie is an alphanumeric identifier which we transfer to the hard drive of your computer through your web browser when you visit our website. It enables our own system to recognize your computer when visiting our website and improve the service offered to you. Cookies can compile aggregate information about areas of our website visited most frequently. This traffic information can be used to enhance the content of our website and make your use of it easier. If you wish to reject our cookies, you can configure your web browser to do so. The collected data will not be used to identify a visitor personally and is not aggregated with any personal data.',
      },
      {
        type: 'p',
        text: "For further information regarding the privacy practices of Google, please visit http://www.google.com/privacypolicy.html. You can opt out of Google's use of cookies by visiting Google's Ads Settings www.google.com/ads/preferences.",
      },
    ],
  },
]
