import React, {Fragment} from "react";
import {Button, Modal} from "react-bootstrap";

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