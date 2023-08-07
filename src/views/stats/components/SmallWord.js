import React from 'react'

export default class Small extends React.Component {
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
                                    ? 'empty-small'
                                    : status === 1
                                    ? 'filled-small'
                                    : status === 2
                                    ? 'exact-small'
                                    : status === 3
                                    ? 'contains-small'
                                    : 'dull-small'
                            }`}>
                            <p
                                style={{
                                    color: status < 2 ? 'black' : 'white',
                                }}
                                className='text-small'>
                                {key}
                            </p>
                        </div>
                    )
                })}
            </div>
        )
    }
}
