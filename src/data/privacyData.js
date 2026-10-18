// Content for the Privacy Policy page, taken from the Figma design.
// Quick Replace should confirm the wording (and the effective date) before launch.

export const privacyIntro = {
  heading: 'Quick Replace Pty Ltd is committed to ensuring that your privacy is protected.',
  paragraphs: [
    'This privacy policy sets out how Quick Replace Pty Ltd uses and protects any information that you give Quick Replace Pty Ltd when you use this website. We intend to fully comply with the National Privacy Principles issued by the Federal Privacy Commissioner.',
    'Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used by this privacy statement.',
    'Quick Replace may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from September 2013.',
    'We intend to retain any personal information gathered from customers to be internally used by quickreplace.com.au only.',
  ],
}

// Each clause is a card on the page and a link in the "Index of clauses" list.
// `blocks` are rendered in order: { type: 'p', text } or { type: 'list', items }.
export const privacyClauses = [
  {
    id: 'what-we-collect',
    title: 'What we collect?',
    blocks: [
      {
        type: 'p',
        text: 'The customer or prospect information we collect relates to contact information only; we do not collect or keep sensitive information. We may collect the following information:',
      },
      {
        type: 'list',
        items: [
          'name and job title',
          'contact information including email address',
          'your credit card and/or payment details',
          'demographic information such as postcode, preferences and interests',
          'other information relevant to customer surveys and/or offers',
        ],
      },
    ],
  },
  {
    id: 'what-we-do',
    title: 'What we do with the information we gather',
    blocks: [
      {
        type: 'p',
        text: 'We require this information to understand your needs and provide you with a better service and in particular for the following reasons:',
      },
      { type: 'p', text: 'Internal record keeping' },
      {
        type: 'list',
        items: [
          'We may use the information to improve our products and services.',
          'We may periodically send promotional email about new products, special offers or other information which we think you may find interesting using the email address which you have provided.',
          'From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail.',
          'We may use the information to customize the website according to your interests.',
          'We will never sell your information.',
        ],
      },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    blocks: [
      {
        type: 'p',
        text: 'We are committed to ensuring that your information is secure. To prevent unauthorized access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.',
      },
    ],
  },
  {
    id: 'links',
    title: 'Links to other websites',
    blocks: [
      {
        type: 'p',
        text: 'Our website may contain links to enable you to visit other websites of interest easily. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide while visiting such sites, and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.',
      },
    ],
  },
  {
    id: 'controlling-your-information',
    title: 'Controlling your personal information',
    blocks: [
      {
        type: 'p',
        text: 'You may choose to restrict the collection or use of your personal information in the following way:',
      },
      {
        type: 'p',
        text: 'If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by writing to or emailing us at info@quickreplace.com.au',
      },
      {
        type: 'p',
        text: 'We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law. We may use your personal information to send you promotional information about third parties which we think you may find interesting if you tell us that you wish this to happen.',
      },
    ],
  },
]
