import React from "react";
import './rodape.scss'

export const Rodape = () => {
  return(
      <div className='container-rodape'>
          <div className='container textos-rodape'>
              <p className='mt-3'>© 2023 Vet Sys Tecnologia</p>
              <p>Rua Esta é a rua, 555 - Agua Rasa - São Paulo, SP</p>
              <p>CNPJ 92.641.306/0001-45</p>
          </div>
      </div>
  )
}