import React from 'react'
import { Helmet } from 'react-helmet'
import Graphs from './components/Graphs'
import ResultBar from './components/ResultBar'
import Small from './components/SmallWord'

export default class Results extends React.Component {
    state = {
        message: '',
    }

    onMessage = () => {
        var x = document.getElementById('snackbar')
        x.className = 'show'
        setTimeout(function () {
            x.className = x.className.replace('show', '')
        }, 2000)
    }

    render() {
        let results = localStorage.getItem('results')
        if (results) {
            results = JSON.parse(results)
        } else {
            results = []
        }
        let from = 0,
            to = 0,
            maxStreak = 0,
            streak = 0,
            start = 0
        let currentStreak = 0
        results.forEach((result, index) => {
            let { tries, total } = result
            if (tries === -1) {
                if (maxStreak < streak) {
                    maxStreak = streak
                    from = start
                    to = total || index + 1
                }
                start = 0
                streak = 0
                currentStreak = 0
            } else {
                if (start === 0) start = index + 1
                streak = streak + 1
                currentStreak = currentStreak + 1

                if (maxStreak < streak) {
                    maxStreak = streak
                    from = start
                    to = total || index + 1
                }
            }
        })

        results.reverse()
        let { message } = this.state
        return (
            <div className='container d-flex flex-column align-items-center pt-1'>
                <Helmet>
                    <meta charSet='utf-8' />
                    <title>Stats</title>

                    <meta
                        name='description'
                        content='Your daily words guessing'
                    />
                </Helmet>
                <ResultBar />

                {results.length > 0 && (
                    <div className='pt-3'>
                        <Graphs />
                    </div>
                )}

                {results.length > 0 && (
                    <div className='pt-1'>
                        {maxStreak > 0 && (
                            <p
                                className='subtitle p-0 m-0'
                                style={{
                                    color: 'green',
                                    fontWeight: 'bold',
                                }}>{`Your max streak is ${maxStreak} from ${from} to ${to}`}</p>
                        )}
                        <p
                            className='subtitle'
                            style={{
                                color: 'green',
                                fontWeight: 'bold',
                            }}>{`Your current streak is ${currentStreak}`}</p>
                    </div>
                )}

                {results.length > 0 && (
                    <div className='row justify-content-center align-items-center pt-2'>
                        {results.map((result, index) => {
                            let { typed, score, word, total } = result
                            return (
                                <div
                                    key={`${index}`}
                                    className='d-flex flex-column col-xl-4 col-lg-4 col-md-6 col-12 col-sm-12 align-items-center mt-2 mb-2'>
                                    <p className='text-small'>
                                        {`#${
                                            total ? total : ''
                                        }   ${word.toUpperCase()}`}
                                    </p>
                                    {[0, 1, 2, 3, 4, 5].map((digit) => {
                                        let word = typed[digit] || ''

                                        return (
                                            <div id={`${digit}`} key={digit}>
                                                <Small word={word} />
                                            </div>
                                        )
                                    })}
                                    <div
                                        className='button text-small'
                                        onClick={() => {
                                            var textarea =
                                                document.createElement(
                                                    'textarea'
                                                )
                                            textarea.textContent = score
                                            textarea.style.position = 'fixed'
                                            document.body.appendChild(textarea)
                                            textarea.select()
                                            try {
                                                document.execCommand('copy') // Security exception may be thrown by some browsers.
                                            } catch (ex) {
                                                console.warn(
                                                    'Copy to clipboard failed.',
                                                    ex
                                                )
                                                return prompt(
                                                    'Copy to clipboard: Ctrl+C, Enter',
                                                    score
                                                )
                                            } finally {
                                                document.body.removeChild(
                                                    textarea
                                                )
                                            }

                                            this.setState(
                                                {
                                                    message: 'Result Copied',
                                                },
                                                this.onMessage
                                            )
                                        }}>
                                        Copy Score
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
                {results.length === 0 && (
                    <p
                        className='subtitle mt-5'
                        style={{ color: 'red', fontWeight: 'bold' }}>
                        The stats will appear once you start playing
                    </p>
                )}
                <div id='snackbar'>{message}</div>
            </div>
        )
    }
}
