// Sends a contact / quote enquiry.
//
// TODO: connect this to a real service before launch, for example
// EmailJS, Formspree, a serverless function or the client's CRM.
// Until then it only pretends to send, so the form can be tested.
export async function submitEnquiry(formData) {
  // eslint-disable-next-line no-console
  console.info('[enquiry] not sent - no backend connected yet', Object.fromEntries(formData.entries()))
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { ok: true }
}
