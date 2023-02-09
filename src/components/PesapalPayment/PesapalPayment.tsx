import React from 'react'
import './PesapalPayment.scss'

function PesapalPayment({iframeUrl}:{iframeUrl: string}) {
  return (
    <div className='pesapal'>
        <iframe src={iframeUrl} width="100%" height="100%"></iframe>
    </div>
  )
}

export default PesapalPayment