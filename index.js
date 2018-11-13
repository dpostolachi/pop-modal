/* @flow */

import React, { PureComponent } from 'react'

const defaultProps = {
    onClose: null,
    onOpen: null,
    openMs: 1000,
    closeMs: 500,
    showBtn: true,
    btnClassName: 'fa fa-close',
    outsideClickClose: false,
    children: [],
    defaultOpen: false
}

type Props = {
    onClose?: Function,
    onOpen?: Function,
    openMs?: number,
    closeMs?: number,
    showBtn?: boolean,
    btnClassName?: string,
    outsideClickClose?: boolean,
    defaultOpen?: boolean,
    children?: any,
}

type State = {
    stage: string,
    ready: boolean,
}

// It's an decorator
export default ( Comp: any ) => {

    return class Modal extends PureComponent<Props, State> {

        state: State = {
            stage: 'closed',
            ready: false
        }

        openMs: number = 0
        closeMs: number = 0
        onClose: null | Function = null
        onOpen: null | Function = null

        openPopup ( initialStage?: string = '' ) {

                if ( initialStage && typeof initialStage === 'string' )
                    return this.setState( {
                        stage: initialStage,
                    } )

                const { stage } = this.state

                if ( stage !== 'closed' )
                    return null

                return this.setState( {

                    stage: 'opening',

                } , () => {

                    setTimeout( () => {

                        return this.setState( {
                            stage: 'open',
                        }, () => {
                            if ( this.onOpen )
                                this.onOpen()
                        } )

                    } , this.openMs )

                } )

        }

        closePopup () {

            const { stage } = this.state

            return this.setState( {
                stage: 'closing'
            } , () => {

                return setTimeout( () => {

                    this.setState( {
                        stage: 'closed',
                    }, () => {
                        if ( this.onClose )
                            this.onClose()
                    } )

                }, this.closeMs )

            } )

        }

        componentDidMount() {

            return this.setState( {
                ready: true,
            } )

        }

        clickOutside = ( e: Object ) => {

            if ( e.target.classList.contains( 'popModal' ) )
                return this.closePopup()

        }

        _modal = ( props: Props ) => {

            const { ready } = this.state

            const newProps = { ...defaultProps, ...props }

            const stage = ( !ready && newProps.defaultOpen ) ? 'open' : this.state.stage

            if ( stage === 'closed' )
                return null

            this.onClose = newProps.onClose || null
            this.onOpen = newProps.onOpen || null


            return (
                <div className={ `popModal ${stage}` } onClick={ ( newProps.outsideClickClose && stage === 'open' ) ? this.clickOutside : null }>
                    {
                        ( newProps.showBtn && stage === 'open' ) ? (

                            <button onClick={ this.closePopup.bind( this ) } className='popModalClose' type='button'>
                                <span className={ newProps.btnClassName } />
                            </button>

                        ) : null
                    }
                    <div className='popModalContainer'>
                        { newProps.children }
                    </div>
                </div>
            )
        }

        render () {

            return <Comp
                { ...this.props }
                Modal={ this._modal.bind( this ) }
                modalStage={ this.state.stage }
                openPopup={ this.openPopup.bind( this ) }
                closePopup={ this.closePopup.bind( this ) }
            />

        }

    }

}
