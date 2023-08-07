import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default class NotFound extends React.Component {
    render() {
        console.log('Here')
        return (
            <div
                className='w-100 d-flex flex-column justify-content-center align-items-center p-2'
                style={{ height: '100vh' }}>
                <Helmet>
                    <meta charSet='utf-8' />
                    <title>Page not found</title>

                    <meta
                        name='description'
                        content='Your daily words guessing'
                    />
                </Helmet>
                <Link to={'/'}>
                    <FontAwesomeIcon
                        style={{
                            cursor: 'pointer',
                            margin: 5,
                        }}
                        icon={faHome}
                        size='2x'
                        color='green'
                    />
                </Link>
                <div className='d-flex'>
                    {['4', '0', '4'].map((letter, index) => {
                        return (
                            <div
                                key={`${index}`}
                                className={`${
                                    index % 2 === 0 ? 'contains' : 'dull'
                                }`}>
                                <p
                                    style={{
                                        color: 'white',
                                    }}
                                    className='text'>
                                    {letter}
                                </p>
                            </div>
                        )
                    })}
                </div>
                <div className='d-flex'>
                    {['N', 'O', 'T', '  ', 'F', 'O', 'U', 'N', 'D'].map(
                        (letter, index) => {
                            return (
                                <div
                                    key={`${index}`}
                                    className={`${
                                        letter === '  '
                                            ? ''
                                            : index % 2 === 0
                                            ? 'exact'
                                            : 'contains'
                                    }`}>
                                    <p
                                        style={{
                                            color: 'white',
                                        }}
                                        className='text'>
                                        {letter}
                                    </p>
                                </div>
                            )
                        }
                    )}
                </div>
            </div>
        )
    }
}
