import { getAnalytics, logEvent } from 'firebase/analytics'
import React from 'react'
import { Helmet } from 'react-helmet'
import { checkWord, getEmoji, getWord } from '../../helper/CheckWord'
import Guide from './components/Guide'
import Keyboard from './components/Keyboard'
import TopBar from './components/TopBar'
import Word from './components/Word'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

export default class GuessWord extends React.Component {
    state = {
        typed: [],
        selected: 0,
        actualWord: [],
        done: false,
        score: 'Word xx\tx\\x\n',
        keyboard: {},
        message: '',
        total: 0,
        open: false,
        pass: false,
    }

    componentDidMount() {
        this.getNextWord()
    }

    getNextWord = async () => {
        let total = localStorage.getItem('total') || 0
        total = parseInt(total)
        if (total >= 2500) {
            localStorage.removeItem('total')
            this.getNextWord()
            return
        }
        let word = await getWord({ total })
        word = 'aware'

        let typed = localStorage.getItem('typed')
        let selected = localStorage.getItem('selected')
        let keyboard = localStorage.getItem('keyboard')
        let score = localStorage.getItem('score')
        if (typed) {
            typed = JSON.parse(typed)
            keyboard = JSON.parse(keyboard)
            selected = parseInt(selected)
        } else {
            typed = []
            keyboard = {}
            selected = 0
            score = `Word  ${total + 1}   x/6\n`
        }

        this.setState({
            typed: typed,
            selected: selected,
            actualWord: Array.from(word),
            done: false,
            score: score,
            keyboard: keyboard,
            message: '',
            total: total,
            open: total === 0 ? true : false,
            pass: false,
        })
        let analytics = getAnalytics()


        logEvent(analytics, 'add_to_cart', {
            currency: 'USD',
            value: total,
            items: [total]
        })

    }

    validate = async () => {
        let {
            selected,
            typed,
            actualWord,
            done,
            score,
            keyboard,
            total,
            pass,
        } = this.state
        let word = ''
        typed[selected].forEach((letter) => {
            let key = letter.key.toLowerCase()
            word = word + key
        })

        let result = await checkWord({ word })

        if (!result) {
            this.setState(
                {
                    message: 'Invalid Word',
                },
                this.onWrong
            )
            return
        }

        let newTyped = []
        let contains = actualWord.map((w) => w)
        let newScore = ''
        Array.from(word).forEach((letter, index, wordArray) => {
            if (letter === actualWord[index]) {
                newTyped.push({
                    key: letter.toUpperCase(),
                    status: 2,
                })
                newScore = newScore + getEmoji(2)
                let position = contains.indexOf(letter)
                contains.splice(position, 1)
                keyboard[letter] = 1
            } else {
                let pushed = false

                if (
                    actualWord.includes(letter) &&
                    wordArray
                        .slice(index + 1, wordArray.length)
                        .includes(letter)
                ) {
                    newTyped.push({
                        key: letter.toUpperCase(),
                        status: 4,
                    })
                    newScore = newScore + getEmoji(4)
                    if (!keyboard.hasOwnProperty(letter)) keyboard[letter] = 3

                    pushed = true
                } else {
                    for (let i = 0; i < contains.length; i++) {
                        let actualLetter = contains[i]

                        if (letter === actualLetter) {
                            newTyped.push({
                                key: letter.toUpperCase(),
                                status: 3,
                            })
                            newScore = newScore + getEmoji(3)

                            if (
                                !keyboard.hasOwnProperty(letter) ||
                                keyboard[letter] === 3
                            )
                                keyboard[letter] = 2

                            pushed = true
                            break
                        }
                    }
                }

                if (!pushed) {
                    newTyped.push({
                        key: letter.toUpperCase(),
                        status: 4,
                    })
                    newScore = newScore + getEmoji(4)
                    if (!keyboard.hasOwnProperty(letter)) keyboard[letter] = 3
                }
            }
        })
        score = `${score}\n${newScore}`
        typed[selected] = newTyped

        if (typed.length >= 6 || word === actualWord.join('')) {
            total = total + 1
            localStorage.setItem('total', total)
            done = true
            score = `${score}\nPlay more at: https://guesstheword.vercel.app`

            if (word === actualWord.join('')) {
                pass = true
                score = score.replace('x', selected + 1)
                let results = localStorage.getItem('results')

                if (results) results = JSON.parse(results)
                else results = []

                results.push({
                    typed: typed,
                    score: score,
                    word: actualWord.join(''),
                    total: total,
                    tries: selected + 1,
                })
                localStorage.setItem('results', JSON.stringify(results))

                let streak = localStorage.getItem('streak') || 0
                streak = parseInt(streak)
                streak = streak + 1
                localStorage.setItem('streak', streak)
            } else {
                localStorage.setItem('streak', 0)

                let results = localStorage.getItem('results')
                score = score.replace('x', 'F')

                if (results) results = JSON.parse(results)
                else results = []

                results.push({
                    typed: typed,
                    score: score,
                    word: actualWord.join(''),
                    total: total,
                    tries: -1,
                })
                localStorage.setItem('results', JSON.stringify(results))
            }

            localStorage.removeItem('typed')
            localStorage.removeItem('selected')
            localStorage.removeItem('keyboard')
            localStorage.removeItem('score')
        } else {
            localStorage.setItem('typed', JSON.stringify(typed))
            localStorage.setItem('selected', selected + 1)
            localStorage.setItem('keyboard', JSON.stringify(keyboard))
            localStorage.setItem('score', score)
        }

        selected = selected + 1
        this.setState({
            typed: typed,
            selected: selected,
            done: done,
            score: score,
            keyboard: keyboard,
            pass: pass,
        })
    }

    onMessage = () => {
        var x = document.getElementById('snackbar')
        x.className = 'show'
        setTimeout(function () {
            x.className = x.className.replace('show', '')
        }, 2000)
    }

    onWrong = () => {
        this.onMessage()
        let { selected } = this.state
        var x = document.getElementById(`${selected}`)
        x.className = 'wrong'
        setTimeout(function () {
            x.className = x.className.replace('wrong', '')
        }, 500)
    }

    render() {
        let {
            typed,
            selected,
            done,
            actualWord,
            keyboard,
            message,
            total,
            open,
            pass,
        } = this.state
        return (
            <div
                style={{ height: '91vh' }}
                className='container d-flex flex-column align-items-center justify-content-between pt-1'>
                <Helmet>
                    <meta charSet='utf-8' />
                    <title>Guess Word</title>

                    <meta
                        name='description'
                        content='Your daily words guessing'
                    />
                </Helmet>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <TopBar
                        onHelp={() => {
                            this.setState({
                                open: true,
                            })
                        }}
                    />
                    <Guide
                        open={open}
                        handleClose={() => {
                            this.setState({
                                open: false,
                            })
                        }}
                    />
                    {done && (
                        <div>
                            <div
                                className='word'
                                style={{
                                    backgroundColor: pass ? 'green' : 'red',
                                }}>
                                <p
                                    style={{ color: 'white' }}
                                    className='text-small'>
                                    {actualWord.join('').toUpperCase()}
                                </p>
                            </div>
                            <p
                                style={{
                                    color: pass ? 'green' : 'red',
                                    textAlign: 'center',
                                }}
                                className='text-small'>
                                {pass
                                    ? 'Congraturaltions you guessed it'
                                    : 'You failed'}
                            </p>
                            <div className='d-flex flex-rows'>
                                <div
                                    className='button text-small'
                                    onClick={() => {
                                        var textarea =
                                            document.createElement('textarea')
                                        textarea.textContent = this.state.score
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
                                                this.state.score
                                            )
                                        } finally {
                                            document.body.removeChild(textarea)
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
                                <div
                                    className='button text-small'
                                    onClick={this.getNextWord}>
                                    Next Word
                                </div>
                            </div>
                        </div>
                    )}
                    <p className='text-small'>{total + 1}</p>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    {[0, 1, 2, 3, 4, 5].map((digit) => {
                        let word = typed[digit] || ''

                        return (
                            <div id={`${digit}`} key={digit}>
                                <Word word={word} />
                            </div>
                        )
                    })}
                    <a
                        href='https://twitter.com/asimemee'
                        rel='noreferrer'
                        target={'_blank'}>
                        <FontAwesomeIcon
                            style={{ cursor: 'pointer' }}
                            icon={faTwitterSquare}
                            size='2x'
                            color='#1DA1F2'
                            onClick={() => {}}
                        />
                    </a>
                </div>

                {
                    <Keyboard
                        keyboard={keyboard}
                        onPress={(key) => {
                            if (done) return
                            if (key === 'ENTER' || key === 'BACK') {
                                if (
                                    !typed[selected] ||
                                    typed[selected].length === 0 ||
                                    done
                                ) {
                                    return
                                }
                                if (
                                    key === 'ENTER' &&
                                    typed[selected].length >= 5
                                ) {
                                    this.validate()
                                } else if (key === 'BACK') {
                                    typed[selected].pop()
                                    this.setState({
                                        typed: typed,
                                    })
                                }

                                return
                            }
                            if (!typed[selected]) {
                                typed[selected] = [
                                    {
                                        key: key,
                                        status: 1,
                                    },
                                ]
                            } else if (typed[selected].length < 5) {
                                typed[selected].push({
                                    key: key,
                                    status: 1,
                                })
                            }

                            this.setState({
                                typed: typed,
                            })
                        }}
                    />
                }
                <div id='snackbar'>{message}</div>
            </div>
        )
    }
}
