import React, { Component } from 'react'

export class UbuntuApp extends Component {

    openApp = () => {
        this.props.openApp(this.props.id);
    }

    render() {
        return (
           
            <div
                className="desktop-app p-1 m-px z-10 bg-white bg-opacity-0 hover:bg-opacity-20 focus:bg-ub-orange focus:bg-opacity-50 focus:border-yellow-700 focus:border-opacity-100 border border-transparent outline-none rounded flex flex-col justify-start items-center text-center text-sm font-normal text-white"
                id={"app-" + this.props.id}
                onDoubleClick={this.openApp}
                tabIndex={0}
            >

                <img width="40px" height="40px" className="mb-1 w-10" src={this.props.icon} alt={"Ubuntu " + this.props.name} />
                {this.props.name}

            </div>
        )
    }
}

export default UbuntuApp
