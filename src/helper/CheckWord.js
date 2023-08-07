import raw from '../assets/dictionary/en.txt'
import data from '../assets/dictionary/data.txt'

export const checkWord = ({ word }) => {
    return new Promise((resolve, reject) => {
        fetch(raw)
            .then((r) => r.text())
            .then((content) => {
                var regex = new RegExp('\n' + word + '\n')
                if (content.toString('utf-8').match(regex)) {
                    return resolve(true)
                }
                return resolve(false)
            })
            .catch(reject)
    })
}
export const getEmoji = (status) => {
    if (status === 2) return '🟩'
    else if (status === 3) return '🟨'
    else if (status === 4) return '⬜'
}

export const getWord = ({ total }) => {
    return new Promise((resolve, reject) => {
        fetch(data)
            .then((r) => r.text())
            .then((content) => {
                content = content.split('\n')
                return resolve(content[total])
            })
            .catch(reject)
    })
}
