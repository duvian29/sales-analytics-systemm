function CardInfo({titulo, valor}){

    return(

        <div className="card shadow p-3">

            <h5>
                {titulo}
            </h5>

            <h3>
                {valor}
            </h3>

        </div>
    )
}

export default CardInfo;