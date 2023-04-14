import React, {Fragment} from "react";
import {Button, Modal} from "react-bootstrap";
import "./modais.css"

export const ModalBootstrap = (propriedades) => {
    return (
        <Fragment>
            <Modal centered
                   show={
                       propriedades.show
                   }
                   onHide={
                       propriedades.onHide
                   }
                   size={
                       propriedades.size
                   }>
                <Modal.Header>
                    <Modal.Title>{
                        propriedades.titulo
                    }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div dangerouslySetInnerHTML={
                        {__html: propriedades.bodyText}
                    }/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={
                        propriedades.primeiroBotaoCss ? propriedades.primeiroBotaoCss : "primary"
                    }
                            onClick={
                                propriedades.primeiroBotaoOnclick
                            }>
                        {
                            propriedades.primeiroBotaoTexto
                        } </Button>
                    {
                        propriedades.segundoBotaoOnclick && propriedades.segundoBotaoTexto ? (
                            <Button variant={
                                propriedades.segundoBotaoCss ? propriedades.segundoBotaoCss : "primary"
                            }
                                    onClick={
                                        propriedades.segundoBotaoOnclick
                                    }>
                                {
                                    propriedades.segundoBotaoTexto
                                } </Button>
                        ) : null
                    } </Modal.Footer>
            </Modal>
        </Fragment>
    )
};

export const ModalFormBody = (props) => {
    return (
        <Fragment>
            <Modal centered
                   show={
                       props.show
                   }
                   onHide={
                       props.onHide
                   }
                   size={
                       props.size
                   }>
                <Modal.Header closeButton>
                    <Modal.Title>{
                        props.titulo
                    }</Modal.Title>
                </Modal.Header>
                <Modal.Body> {
                    props.bodyText
                } </Modal.Body>
            </Modal>
        </Fragment>
    )
};