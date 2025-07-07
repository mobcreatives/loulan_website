import { FaWhatsapp } from 'react-icons/fa'

const WhatsAppSimple = () => {
  return (
    <div>
      <a
        href="https://wa.me/9851240960"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp className='whatsapp-icon' />
      </a>
    </div>
  )
}

export default WhatsAppSimple 