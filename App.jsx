import { useEffect, useMemo, useState } from 'react'
import AdminDashboard from './components/AdminDashboard'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import HeroSection from './components/HeroSection'
import ListingsSection from './components/ListingsSection'
import SiteFooter from './components/SiteFooter'
import SiteHeader from './components/SiteHeader'
import { api } from './utils/api'
import './App.css'

const translations = {
  rw: {
    navListings: 'Amatangazo',
    navAbout: 'Abo turibo',
    contact: 'Twandikire',
    navAdmin: 'Ubuyobozi',
    heroEyebrow: 'AHO KUBAKA EJO HAZAZA',
    heroTitle: 'Shaka aho wifuza kuba.',
    heroDescription:
      'Amazu n’amasambu yo kugurisha cyangwa gukodesha i Ruhango, Muhanga na Nyanza. Icyicaro gikuru kiri i Ruhango.',
    searchPlaceholder: 'Andika ahantu, urugero: Ruhango',
    searchButton: 'Shakisha',
    featured: 'Amatangazo mashya',
    featuredDescription: 'Reba ahantu hashya ho gukodesha cyangwa kugura.',
    all: 'Byose',
    houses: 'Amazu',
    apartments: 'Apartimenti',
    land: 'Amasambu',
    anyDeal: 'Byose',
    forSale: 'Kugurisha',
    forRent: 'Gukodesha',
    noResults: 'Nta tangazo rihuye n’icyo ushaka ribonetse.',
    bedrooms: 'ibyumba',
    bathrooms: 'ubwiherero',
    sqm: 'm²',
    houseType: 'Inzu',
    apartmentType: 'Apartimenti',
    landType: 'Isambu',
    askAbout: 'Baza kuri iri tangazo',
    propertyDetails: 'Amakuru arambuye',
    previousPhoto: 'Ifoto ibanza',
    nextPhoto: 'Ifoto ikurikira',
    listingType: 'Uburyo',
    inquiryTitle: 'Saba amakuru kuri uyu mutungo',
    inquiryDescription: 'Shyiramo amazina na telefoni kugira ngo tugusubize.',
    optionalMessage: 'Ubutumwa (si ngombwa)',
    optionalMessagePlaceholder: 'Andika ikindi wifuza kumenya...',
    sendInquiry: 'Ohereza ubusabe',
    inquirySent: 'Ubusabe bwawe bwoherejwe neza.',
    close: 'Funga',
    perMonth: '/ ukwezi',
    aboutEyebrow: 'DUKORANA NAWE',
    aboutTitle: 'Gushaka aho uba biba byoroshye.',
    aboutText:
      'RUHANGO PROPERTY CONNECT igufasha kubona inzu cyangwa isambu i Ruhango, Muhanga na Nyanza. Icyicaro gikuru kiri i Ruhango, aho dukorera cyane. Reba amatangazo maze utubaze amakuru arambuye.',
    aboutPointOne: 'Amatangazo y’amazu n’amasambu',
    aboutPointTwo: 'Gukodesha cyangwa kugura',
    aboutPointThree: 'Tuvugishe kuri WhatsApp cyangwa utwoherereze ubutumwa',
    contactEyebrow: 'TURI HANO KUGUFASHA',
    contactTitle: 'Ufite ikibazo cyangwa ushaka ubufasha?',
    contactText:
      'Twoherereze ubutumwa, tuzagufasha kubona inzu cyangwa isambu ikubereye.',
    name: 'Amazina yawe',
    namePlaceholder: 'Andika amazina yawe',
    phone: 'Telefoni yawe',
    phonePlaceholder: '+250...',
    message: 'Ubutumwa',
    messagePlaceholder: 'Andika icyo ushaka kumenya...',
    send: 'Ohereza ubutumwa',
    whatsappHelp: 'Ubutumwa bwawe buzoherezwa mu butumwa buri muri Ubuyobozi.',
    messageSent: 'Ubutumwa bwawe bwoherejwe neza.',
    messageSendError: 'Ubutumwa ntibwabitswe. Ongera ugerageze.',
    apiError: 'Server ntiyabashije gusubiza. Reba ko backend na MySQL biri gukora.',
    footerText: 'Amazu n’amasambu, byegerejwe.',
    footerLocation: 'Icyicaro gikuru: Ruhango, Rwanda',
    required: 'Uzuza amazina, telefoni n’ubutumwa.',
  },
  en: {
    navListings: 'Listings',
    navAbout: 'About us',
    contact: 'Contact',
    navAdmin: 'Admin',
    heroEyebrow: 'FIND YOUR NEXT CHAPTER',
    heroTitle: 'Find a place to call home.',
    heroDescription:
      'Homes and land for rent or sale in Ruhango, Muhanga, and Nyanza. Our headquarters are in Ruhango.',
    searchPlaceholder: 'Search a location, e.g. Ruhango',
    searchButton: 'Search',
    featured: 'Latest listings',
    featuredDescription: 'Explore places available to rent or buy.',
    all: 'All',
    houses: 'Houses',
    apartments: 'Apartments',
    land: 'Land',
    anyDeal: 'Any',
    forSale: 'For sale',
    forRent: 'For rent',
    noResults: 'No listings match your search.',
    bedrooms: 'beds',
    bathrooms: 'baths',
    sqm: 'm²',
    houseType: 'House',
    apartmentType: 'Apartment',
    landType: 'Land',
    askAbout: 'Ask about this listing',
    propertyDetails: 'Property details',
    previousPhoto: 'Previous photo',
    nextPhoto: 'Next photo',
    listingType: 'Listing type',
    inquiryTitle: 'Enquire about this property',
    inquiryDescription: 'Enter your name and phone number so we can get back to you.',
    optionalMessage: 'Message (optional)',
    optionalMessagePlaceholder: 'Add any other questions...',
    sendInquiry: 'Send enquiry',
    inquirySent: 'Your enquiry was sent successfully.',
    close: 'Close',
    perMonth: '/ month',
    aboutEyebrow: 'HERE TO HELP',
    aboutTitle: 'Finding your place should feel easy.',
    aboutText:
      'RUHANGO PROPERTY CONNECT helps you find a home or plot in Ruhango, Muhanga, and Nyanza. Our headquarters are in Ruhango, where we work most. Browse listings and contact us for details.',
    aboutPointOne: 'Homes and land listings',
    aboutPointTwo: 'Rent or buy',
    aboutPointThree: 'Reach us on WhatsApp or send a message',
    contactEyebrow: 'WE’RE HERE FOR YOU',
    contactTitle: 'Have a question or need a hand?',
    contactText:
      'Send us a message and we’ll help you find a home or plot that suits you.',
    name: 'Your name',
    namePlaceholder: 'Enter your name',
    phone: 'Your phone',
    phonePlaceholder: '+250...',
    message: 'Message',
    messagePlaceholder: 'What would you like to know?',
    send: 'Send message',
    whatsappHelp: 'Your message will be delivered to the Admin dashboard inbox.',
    messageSent: 'Your message was sent successfully.',
    messageSendError: 'Your message could not be saved. Please try again.',
    apiError: 'The server could not be reached. Check that the backend and MySQL are running.',
    footerText: 'Property, brought closer.',
    footerLocation: 'Headquarters: Ruhango, Rwanda',
    required: 'Please fill in your name, phone, and message.',
  },
}

function App() {
  const [language, setLanguage] = useState('rw')
  const [propertiesState, setPropertiesState] = useState([])
  const [siteContent, setSiteContent] = useState(null)
  const [messages, setMessages] = useState([])
  const [apiError, setApiError] = useState('')
  const [adminToken, setAdminToken] = useState('')
  const [isAdmin, setIsAdmin] = useState(() => window.location.hash === '#admin')
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState('all')
  const [deal, setDeal] = useState('all')
  const t = { ...translations[language], ...(siteContent?.[language] || {}) }

  useEffect(() => {
    api.getProperties()
      .then(setPropertiesState)
      .catch((error) => {
        console.error('Could not load property listings from the API.', error)
        setApiError(error.message || t.apiError)
      })
  }, [t.apiError])

  useEffect(() => {
    api.getSiteContent()
      .then(setSiteContent)
      .catch((error) => {
        console.error('Could not load website content from the API.', error)
        setApiError(error.message || t.apiError)
      })
  }, [t.apiError])

  useEffect(() => {
    if (!adminToken) return
    api.getMessages(adminToken)
      .then(setMessages)
      .catch((error) => {
        console.error('Could not load admin messages from the API.', error)
        setApiError(error.message || t.apiError)
      })
  }, [adminToken, t.apiError])

  useEffect(() => {
    function handleHashChange() {
      setIsAdmin(window.location.hash === '#admin')
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  async function handlePropertySave(property, editing) {
    try {
      const savedProperty = editing
        ? await api.updateProperty(property, adminToken)
        : await api.createProperty(property, adminToken)
      setPropertiesState((current) =>
        editing
          ? current.map((item) => item.id === savedProperty.id ? savedProperty : item)
          : [savedProperty, ...current],
      )
      setApiError('')
      return true
    } catch (error) {
      console.error('Could not save property listing through the API.', error)
      setApiError(error.message || t.apiError)
      return false
    }
  }

  async function handlePropertyDelete(id) {
    try {
      await api.deleteProperty(id, adminToken)
      setPropertiesState((current) => current.filter((property) => property.id !== id))
      setApiError('')
      return true
    } catch (error) {
      console.error('Could not delete property through the API.', error)
      setApiError(error.message || t.apiError)
      return false
    }
  }

  async function handlePropertyImageDelete(id) {
    try {
      await api.deletePropertyImage(id, adminToken)
      setPropertiesState((current) =>
        current.map((property) =>
          property.id === id ? { ...property, image: '', images: [] } : property,
        ),
      )
      setApiError('')
      return true
    } catch (error) {
      console.error('Could not delete property image through the API.', error)
      setApiError(error.message || t.apiError)
      return false
    }
  }

  async function handleMessageSubmit(message) {
    try {
      const result = await api.createMessage(message)
      setMessages((current) => [{ ...message, id: result.id }, ...current])
      setApiError('')
      return true
    } catch (error) {
      console.error('Could not submit message through the API.', error)
      setApiError(error.message || t.apiError)
      return false
    }
  }

  async function handleMessageDelete(id) {
    try {
      await api.deleteMessage(id, adminToken)
      setMessages((current) => current.filter((message) => message.id !== id))
      setApiError('')
      return true
    } catch (error) {
      console.error('Could not delete message through the API.', error)
      setApiError(error.message || t.apiError)
      return false
    }
  }

  async function handleAdminLogin(username, password) {
    const result = await api.login(username, password)
    setAdminToken(result.token)
  }

  async function handleSiteContentSave(content) {
    try {
      const savedContent = await api.saveSiteContent(content, adminToken)
      setSiteContent(savedContent)
      setApiError('')
      return true
    } catch (error) {
      console.error('Could not save website content through the API.', error)
      setApiError(error.message || t.apiError)
      return false
    }
  }

  const filteredProperties = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    return propertiesState.filter((property) => {
      const matchesQuery =
        !normalizedQuery ||
        `${property.title} ${property.titleEn} ${property.location}`
          .toLocaleLowerCase()
          .includes(normalizedQuery)
      return (
        matchesQuery &&
        (kind === 'all' || property.kind === kind) &&
        (deal === 'all' || property.deal === deal)
      )
    })
  }, [propertiesState, query, kind, deal])

  if (isAdmin) {
    return (
      <AdminDashboard
        properties={propertiesState}
        onPropertySave={handlePropertySave}
        onPropertyDelete={handlePropertyDelete}
        onPropertyImageDelete={handlePropertyImageDelete}
        messages={messages}
        onMessageDelete={handleMessageDelete}
        language={language}
        onLanguageChange={setLanguage}
        adminToken={adminToken}
        onLogin={handleAdminLogin}
        siteContent={siteContent}
        onSiteContentSave={handleSiteContentSave}
        apiError={apiError}
      />
    )
  }

  return (
    <div className="site-shell" id="home">
      <SiteHeader
        language={language}
        onLanguageChange={setLanguage}
        t={t}
      />
      <main>
        {apiError && <p className="api-alert" role="alert">{apiError}</p>}
        <HeroSection query={query} onQueryChange={setQuery} t={t} />
        <ListingsSection
          properties={propertiesState}
          filteredProperties={filteredProperties}
          language={language}
          onPropertyInquirySubmit={handleMessageSubmit}
          kind={kind}
          deal={deal}
          onKindChange={setKind}
          onDealChange={setDeal}
          t={t}
        />
        <AboutSection t={t} />
        <ContactSection
          language={language}
          t={t}
          contactInfo={siteContent?.contactInfo}
          onMessageSubmit={handleMessageSubmit}
        />
      </main>
      <SiteFooter t={t} />
    </div>
  )
}

export default App
