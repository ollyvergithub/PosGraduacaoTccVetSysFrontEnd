import React from "react";
import "./home.scss"
import {PaginasContainer} from "../paginasContainer";
import ImgHome from "../../assets/img/img-home.png"



export const Home = () => {

    return (
        <PaginasContainer>
            <div className='container-barra-superior-apresentacao'>
                <h2 className='pt-2'>Clínica e Petshop</h2>
                <p className='m-0 pb-2'>Uma solução completa para sua Clínica Veterinária ou Petshop!</p>
            </div>
            <div className='container my-3'>
                <div className='row'>
                    <div className='col-md-4 mb-2'>
                        <img src={ImgHome} className="img-fluid" alt="imagem-apresentação VetSys"/>
                    </div>
                    <div className='col-md-8'>
                        <h3 className='text-black'>BEM – VINDO AO VET SYS </h3>
                        <h5><strong>Escolha uma das opções acima no menu para começar.</strong></h5>
                        <p className='mb-0 mt-3'><strong>POLÍTICA DE PRIVACIDADE</strong></p>
                        <p className='mb-2'>A presente Política de Privacidade regula a coleta, o uso e o armazenamento de informações pessoais coletadas através do uso da aplicação VetSys desenvolvida por Ollyver Ottoboni. Ao utilizar esta aplicação, você concorda com os termos desta política.</p>
                        <p className='mb-0'><strong>Coleta de informações pessoais</strong></p>

                        <p className='mb-1'>Através da utilização da aplicação, podem ser coletadas as seguintes informações pessoais:</p>

                        <ul>
                            <li>Nome completo</li>
                            <li>Endereço de e-mail</li>
                            <li>Informações de contato (telefone, endereço)</li>
                            <li>Informações de pagamento (quando aplicável)</li>
                            <li>Outras informações que o usuário escolher fornecer</li>
                        </ul>


                        <p className='mb-1'>Essas informações são coletadas apenas com o seu consentimento explícito e serão usadas apenas para os fins para os quais foram coletadas. Elas podem ser utilizadas para:</p>

                        <ul>
                            <li>Prestar serviços e informações sobre a aplicação</li>
                            <li>Processar pagamentos (quando aplicável)</li>
                            <li>Fornecer suporte técnico</li>
                            <li>Enviar informações promocionais ou newsletters (quando autorizado pelo usuário)</li>
                        </ul>

                        <p className='mb-1'><strong>Uso de cookies</strong></p>
                        <p className='mb-2'>A aplicação pode usar cookies para melhorar a experiência do usuário e coletar informações sobre o uso da aplicação. Essas informações podem incluir o endereço IP do usuário, o tipo de dispositivo utilizado, o navegador da web utilizado, entre outras informações.</p>

                        <p className='mb-1'><strong>Armazenamento e segurança das informações</strong></p>

                        <p className='mb-2'>Todas as informações coletadas pela aplicação serão armazenadas em servidores seguros e protegidas por medidas de segurança apropriadas. As informações coletadas não serão compartilhadas com terceiros, exceto quando necessário para prestar serviços relacionados à aplicação.</p>

                        <p className='mb-1'><strong>Direitos do usuário</strong></p>

                        <p>O usuário tem o direito de solicitar informações sobre quais dados pessoais a aplicação armazena e processa, bem como solicitar a exclusão dessas informações, se assim desejar. Também é possível atualizar ou corrigir as informações pessoais fornecidas.</p>

                        <p className='mb-1'><strong>Alterações na política de privacidade</strong></p>

                        <p>A VetSys se reserva o direito de modificar esta política de privacidade a qualquer momento, sem aviso prévio. As alterações serão publicadas nesta página e serão efetivas imediatamente após a publicação.</p>

                        <p className='mb-1'><strong>Entre em contato</strong></p>

                        <p>Se você tiver alguma dúvida ou preocupação sobre a Política de Privacidade, entre em contato conosco pelo e-mail <a href='mailto:ollyverottoboni@gmail.com'>ollyverottoboni@gmail.com</a></p>
                    </div>
                </div>
            </div>
        </PaginasContainer>
    )

}