import PageHero from '../components/PageHero'
import EnquiryForm from '../components/contact/EnquiryForm'
import ContactSidebar from '../components/contact/ContactSidebar'
import QuickReplaceStandard from '../components/contact/QuickReplaceStandard'
import ServiceCoverage from '../components/contact/ServiceCoverage'
import usePageTitle from '../hooks/usePageTitle'

export default function ContactPage() {
  usePageTitle('Contact Us - Request a Quote')

  return (
    <>
      <PageHero
        accent="Contact"
        breadcrumb="Contact Us"
        description="Have a property repair or maintenance job you need help with? Send us the details and we'll take it from there. From small repairs to jobs requiring multiple trades, our team can coordinate the work from start to finish."
        image="/images/contact-hero-team.jpg"
        imageAlt="The Quick Replace team standing outside a commercial building"
        singleLine
        title="Quick Replace"
      />

      <section aria-label="Enquiry form" className="bg-white py-12 lg:py-11">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-6 lg:grid-cols-12 lg:gap-12 lg:px-12">
          <div className="overflow-hidden rounded-2xl border border-brand-line bg-white shadow-card lg:col-span-8">
            <div aria-hidden="true" className="h-1.5 bg-gradient-to-r from-[#0a4a6e] via-brand-navyLight to-brand-navy" />
            <EnquiryForm />
          </div>
          <div className="lg:sticky lg:top-28 lg:col-span-4">
            <ContactSidebar />
          </div>
        </div>
      </section>

      <section aria-label="Why choose Quick Replace" className="bg-brand-mist py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-6 lg:grid-cols-2 lg:px-12">
          <QuickReplaceStandard />
          <ServiceCoverage />
        </div>
      </section>
    </>
  )
}
