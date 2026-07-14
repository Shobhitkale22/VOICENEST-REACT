function EmptyState({

    message

}) {

    return (

        <div className="empty-state">

            <h3>📂</h3>

            <p>{message}</p>

        </div>

    );

}

export default EmptyState;