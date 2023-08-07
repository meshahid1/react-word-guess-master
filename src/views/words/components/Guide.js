import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default class Guide extends React.Component {
    constructor(props) {
        super(props)

        let { open } = this.props

        this.state = {
            open: open,
        }
    }

    componentDidUpdate() {
        let oldOpen = this.state.open
        let { open } = this.props

        if (oldOpen !== open) {
            this.setState({
                open: open,
            })
        }
    }

    render() {
        const first = [
            { key: 'S', status: 1 },
            { key: 'E', status: 3 },
            { key: 'V', status: 3 },
            { key: 'E', status: 2 },
            { key: 'N', status: 2 },
        ]
        const second = [
            { key: 'S', status: 1 },
            { key: 'N', status: 1 },
            { key: 'E', status: 1 },
            { key: 'A', status: 1 },
            { key: 'K', status: 1 },
        ]
        let { open } = this.state
        let { handleClose } = this.props
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'>
                    <DialogTitle id='alert-dialog-title'>
                        {'HOW TO PLAY'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            You have to guess 5 letter word in 6 tries.
                        </DialogContentText>

                        <DialogContentText id='alert-dialog-description'>
                            • First type a 5 letter word that comes to your mind
                            and press Enter.
                        </DialogContentText>
                        <DialogContentText id='alert-dialog-description'>
                            • Colors of letters will tell you how close was your
                            guess. Gray means the letter is not in the word,
                            yellow means the letter is in the word but not at
                            this place and green means the letter exist in the
                            same place.
                        </DialogContentText>

                        <div className='d-flex flex-rows'>
                            {first.map((i, index) => {
                                let { key, status } = i

                                return (
                                    <div
                                        key={`${index}`}
                                        className={`${
                                            status === 1
                                                ? 'exact'
                                                : status === 2
                                                ? 'contains'
                                                : 'dull'
                                        }`}>
                                        <p
                                            style={{
                                                color: 'white',
                                            }}
                                            className='text'>
                                            {key}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                        <DialogContentText id='alert-dialog-description'>
                            • Keep trying until you get all greens under 6 tries
                        </DialogContentText>

                        <div className='d-flex flex-rows'>
                            {second.map((i, index) => {
                                let { key, status } = i

                                return (
                                    <div
                                        key={`${index}`}
                                        className={`${
                                            status === 1
                                                ? 'exact'
                                                : status === 2
                                                ? 'contains'
                                                : 'dull'
                                        }`}>
                                        <p
                                            style={{
                                                color: 'white',
                                            }}
                                            className='text'>
                                            {key}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>

                        <DialogContentText id='alert-dialog-description'>
                            • Copy score and post it on social media, Great
                            Success!!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
