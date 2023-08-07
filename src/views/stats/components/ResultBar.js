import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const ResultBar = () => {
    return (
        <div className='d-flex'>
            <Link to={'/'}>
                <FontAwesomeIcon
                    style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        left: 5,
                        top: 5,
                    }}
                    icon={faArrowAltCircleLeft}
                    size='2x'
                    color='green'
                />
            </Link>
            {['S', 'T', 'A', 'T', 'S'].map((letter, index) => {
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
    )
}

export default ResultBar
