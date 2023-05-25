const DeletedNotif = ({ message }) => {
    if (message === null) {
        return null
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}

const AddedNotif = ({ message }) => {
    if (message === null) {
        return null
    }
    return (
        <div className="success">
            {message}
        </div>
    )
}

export {DeletedNotif, AddedNotif}