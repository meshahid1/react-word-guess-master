import React from 'react'

export default class Word extends React.Component {
    constructor(props) {
        super(props)

        let { word } = this.props

        this.state = {
            word: word,
        }
    }

    componentDidUpdate() {
        let { word } = this.props
        let oldWord = this.state.word
        if (oldWord === word) return
        this.setState({
            word: word,
        })
    }

    render() {
        let { word } = this.state
        return (
            <div className='d-flex flex-rows'>
                {[0, 1, 2, 3, 4].map((i, index) => {
                    let key = '',
                        status = 0
                    if (word[i]) {
                        key = word[i].key
                        status = word[i].status
                    }

                    return (
                        <div
                            key={`${index}`}
                            className={`${
                                status === 0
                                    ? 'empty'
                                    : status === 1
                                    ? 'filled'
                                    : status === 2
                                    ? 'exact'
                                    : status === 3
                                    ? 'contains'
                                    : 'dull'
                            }`}>
                            <p
                                style={{
                                    color: status < 2 ? 'black' : 'white',
                                }}
                                className='text'>
                                {key}
                            </p>
                        </div>
                    )
                })}
            </div>
        )
    }
}
