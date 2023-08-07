import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faPoll } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'

export default class TopBar extends React.Component {
    render() {
        let { onHelp } = this.props
        return (
            <div className='d-flex flex-row justify-content-between align-items-between'>
                <FontAwesomeIcon
                    style={{ cursor: 'pointer' }}
                    icon={faLightbulb}
                    size='2x'
                    onClick={onHelp}
                />

                <div className='d-flex mx-3'>
                    {['G', 'U', 'E', 'S', 'S'].map((letter, index) => {
                        return (
                            <div
                                key={`${index}`}
                                className={`${
                                    index === 2
                                        ? 'dull-small'
                                        : index % 2 !== 0
                                        ? 'contains-small'
                                        : 'exact-small'
                                }`}>
                                <p
                                    style={{
                                        color: 'white',
                                    }}
                                    className='text-small'>
                                    {letter}
                                </p>
                            </div>
                        )
                    })}
                </div>
                <Link to={'/stats'}>
                    <FontAwesomeIcon
                        style={{ cursor: 'pointer' }}
                        icon={faPoll}
                        size='2x'
                    />
                </Link>
            </div>
        )
    }
}
