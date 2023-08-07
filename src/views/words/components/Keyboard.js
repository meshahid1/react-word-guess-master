import React from 'react'

export default class Keyboard extends React.Component {
    state = {
        keyboard: [
            {
                keys: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            },
            {
                keys: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
            },
            {
                keys: ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'],
            },
        ],
        maped: {},
    }

    componentDidUpdate() {
        let maped = this.state.maped
        let keyboard = this.props.keyboard
        if (JSON.stringify(maped) !== JSON.stringify(keyboard)) {
            this.setState({
                maped: keyboard,
            })
        }
    }

    render() {
        let { keyboard, maped } = this.state

        return (
            <div>
                {keyboard.map((board, index) => {
                    return (
                        <div
                            key={`${index}`}
                            className='d-flex flex-rows justify-content-center'>
                            {board.keys.map((key) => {
                                let { onPress } = this.props
                                let status = 0
                                if (maped.hasOwnProperty(key.toLowerCase())) {
                                    status = maped[key.toLowerCase()]
                                }
                                return (
                                    <button
                                        style={{
                                            color:
                                                status === 0
                                                    ? 'black'
                                                    : 'white',
                                            fontWeight: 'bold',
                                            backgroundColor: `${
                                                status === 0
                                                    ? ''
                                                    : status === 1
                                                    ? '#0cce6b'
                                                    : status === 2
                                                    ? '#f9c22e'
                                                    : '#8d99ae'
                                            }`,
                                        }}
                                        key={key}
                                        className={`${
                                            status === 0
                                                ? 'empty-keyboard'
                                                : status === 1
                                                ? 'exact-keyboard'
                                                : status === 2
                                                ? 'contains-keyboard'
                                                : 'dull-keyboard'
                                        } btn btn-light btn-sm border-dark`}
                                        onClick={() => {
                                            onPress(key)
                                        }}>
                                        {key}
                                    </button>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}
